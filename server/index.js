import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import multer from 'multer';
import bcrypt from 'bcrypt';
import { supabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-berdikari-2026';

// Fallback JSON stores setup
const portfoliosStorePath = path.resolve(__dirname, 'portfolios_store.json');
const contactStorePath = path.resolve(__dirname, 'contact_store.json');
const otpStorePath = path.resolve(__dirname, 'otp_store.json');
const usersStorePath = path.resolve(__dirname, 'users_store.json');
const uploadsDir = path.resolve(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Initial storage files checking
if (!fs.existsSync(usersStorePath)) {
  const initialAdminPass = process.env.ADMIN_PASSWORD || 'berdikariadmin';
  const hashedPassword = bcrypt.hashSync(initialAdminPass, 10);
  fs.writeFileSync(usersStorePath, JSON.stringify([{
    id: "admin-id-12345",
    username: 'admin',
    password_hash: hashedPassword,
    role: 'admin',
    created_at: new Date().toISOString()
  }], null, 2));
}

// Helper functions for local JSON stores
function getLocalPortfoliosData() {
  try { return JSON.parse(fs.readFileSync(portfoliosStorePath, 'utf8')); } catch (err) { return []; }
}
function saveLocalPortfoliosData(data) {
  fs.writeFileSync(portfoliosStorePath, JSON.stringify(data, null, 2));
}
function getLocalContactData() {
  try { return JSON.parse(fs.readFileSync(contactStorePath, 'utf8')); } catch (err) { return []; }
}
function saveLocalContactData(data) {
  fs.writeFileSync(contactStorePath, JSON.stringify(data, null, 2));
}
function getLocalOtps() {
  try { return JSON.parse(fs.readFileSync(otpStorePath, 'utf8')); } catch (err) { return []; }
}
function saveLocalOtps(data) {
  fs.writeFileSync(otpStorePath, JSON.stringify(data, null, 2));
}
function getLocalUsers() {
  try { return JSON.parse(fs.readFileSync(usersStorePath, 'utf8')); } catch (err) { return []; }
}
function saveLocalUsers(data) {
  fs.writeFileSync(usersStorePath, JSON.stringify(data, null, 2));
}

// Multer setup for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});

// Middleware
app.use(cors());
app.use('/api', (req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  next();
});
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use('/api/uploads', express.static(uploadsDir));

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Akses ditolak. Token tidak ditemukan.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token tidak valid atau kedaluwarsa.' });
    }
    req.user = user;
    next();
  });
}

// Role authorization helper: Admin Only
function requireAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Akses ditolak. Memerlukan peran Administrator.' });
  }
}

// Helper untuk perbandingan password aman (bcrypt dengan fallback plaintext)
async function verifyPassword(inputPassword, storedHash) {
  if (!storedHash) return false;
  if (storedHash.startsWith('$2a$') || storedHash.startsWith('$2b$') || storedHash.startsWith('$2y$')) {
    return await bcrypt.compare(inputPassword, storedHash);
  }
  return inputPassword === storedHash;
}

// =========================================================================
// 1. AUTHENTICATION & REGISTRATION ENDPOINTS
// =========================================================================

// A. Login Admin (Username & Password)
app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;
  const defaultPassword = process.env.ADMIN_PASSWORD || 'berdikariadmin';

  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan kata sandi wajib diisi.' });
  }

  try {
    // Cari user di database
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username)
      .single();

    if (error || !user) {
      // Fallback ke kredensial default jika user tidak ditemukan di DB
      if (username === 'admin' && password === defaultPassword) {
        const token = jwt.sign({ username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
        return res.json({ success: true, token });
      }
      return res.status(401).json({ error: 'Username atau kata sandi salah.' });
    }

    // Verifikasi kata sandi aman
    const isPasswordValid = await verifyPassword(password, user.password_hash);
    if (isPasswordValid) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role || 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ error: 'Username atau kata sandi salah.' });
    }
  } catch (err) {
    // Fallback lokal jika database mengalami masalah
    const users = getLocalUsers();
    const user = users.find(u => u.username === username);
    if (user && await verifyPassword(password, user.password_hash)) {
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role || 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    }
    
    if (username === 'admin' && password === defaultPassword) {
      const token = jwt.sign({ username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    }
    return res.status(500).json({ error: 'Terjadi kegagalan verifikasi server: ' + err.message });
  }
});

// B. Verifikasi Token JWT
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

// C. Send OTP (Simulasi pengiriman OTP)
app.post('/api/auth/send-otp', async (req, res) => {
  const { phone_number } = req.body;
  if (!phone_number) {
    return res.status(400).json({ error: 'Nomor HP wajib diisi.' });
  }

  // Generate 6 digit kode OTP acak
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5 menit kedaluwarsa

  const newOtp = {
    phone_number,
    code,
    expires_at: expiresAt,
    verified: false
  };

  try {
    // Hapus kode OTP lama untuk nomor ini
    await supabase
      .from('otp_codes')
      .delete()
      .eq('phone_number', phone_number);

    // Simpan OTP baru ke database
    const { error } = await supabase
      .from('otp_codes')
      .insert([newOtp]);

    if (error) throw error;

    console.log(`[OTP SENT] Phone: ${phone_number} | Code: ${code} (Expires: ${expiresAt})`);

    const isProd = process.env.NODE_ENV === 'production';
    res.json({
      success: true,
      message: 'Kode OTP berhasil dikirim.',
      ...(isProd ? {} : { code: code })
    });
  } catch (err) {
    console.warn('Supabase error saving OTP, using local fallback:', err.message);

    // Simpan secara lokal sebagai fallback
    let otps = getLocalOtps();
    otps = otps.filter(o => o.phone_number !== phone_number);
    otps.push(newOtp);
    saveLocalOtps(otps);

    console.log(`[OTP SENT - LOCAL FALLBACK] Phone: ${phone_number} | Code: ${code} (Expires: ${expiresAt})`);

    const isProd = process.env.NODE_ENV === 'production';
    res.json({
      success: true,
      message: 'Kode OTP berhasil dikirim secara lokal.',
      ...(isProd ? {} : { code: code })
    });
  }
});

// D. Verify OTP (Verifikasi kecocokan OTP)
app.post('/api/auth/verify-otp', async (req, res) => {
  const { phone_number, code } = req.body;
  if (!phone_number || !code) {
    return res.status(400).json({ error: 'Nomor HP dan kode OTP wajib diisi.' });
  }

  try {
    const { data: otpRecords, error } = await supabase
      .from('otp_codes')
      .select('*')
      .eq('phone_number', phone_number)
      .eq('code', code)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const otpRecord = otpRecords && otpRecords[0];

    if (!otpRecord) {
      return res.status(400).json({ error: 'Kode OTP salah.' });
    }

    if (new Date(otpRecord.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Kode OTP sudah kedaluwarsa.' });
    }

    // Tandai OTP telah sukses diverifikasi
    const { error: updateError } = await supabase
      .from('otp_codes')
      .update({ verified: true })
      .eq('id', otpRecord.id);

    if (updateError) throw updateError;

    res.json({
      success: true,
      message: 'Verifikasi OTP berhasil.'
    });
  } catch (err) {
    console.warn('Supabase error verifying OTP, using local fallback:', err.message);

    const otps = getLocalOtps();
    const otpRecord = otps.find(o => o.phone_number === phone_number && o.code === code);

    if (!otpRecord) {
      return res.status(400).json({ error: 'Kode OTP salah.' });
    }

    if (new Date(otpRecord.expires_at) < new Date()) {
      return res.status(400).json({ error: 'Kode OTP sudah kedaluwarsa.' });
    }

    otpRecord.verified = true;
    saveLocalOtps(otps);

    res.json({
      success: true,
      message: 'Verifikasi OTP berhasil (lokal).'
    });
  }
});

// E. Registrasi Anggota Baru (Nama, HP, OTP, Foto Profil)
app.post('/api/auth/register', upload.single('profile_picture'), async (req, res) => {
  const { phone_number, code, name } = req.body;
  const file = req.file;

  if (!phone_number || !code || !name) {
    return res.status(400).json({ error: 'Nomor HP, kode OTP, dan nama lengkap wajib diisi.' });
  }

  try {
    // 1. Verifikasi kecocokan OTP dan status verified
    let isOtpValid = false;
    try {
      const { data: otpRecords, error: otpError } = await supabase
        .from('otp_codes')
        .select('*')
        .eq('phone_number', phone_number)
        .eq('code', code)
        .eq('verified', true)
        .order('created_at', { ascending: false });

      if (otpError) throw otpError;

      const otpRecord = otpRecords && otpRecords[0];
      if (otpRecord && new Date(otpRecord.expires_at) >= new Date()) {
        isOtpValid = true;
      }
    } catch (dbErr) {
      console.warn('Database error verifying OTP for register, using local fallback:', dbErr.message);
      const otps = getLocalOtps();
      const otpRecord = otps.find(o => o.phone_number === phone_number && o.code === code && o.verified === true);
      if (otpRecord && new Date(otpRecord.expires_at) >= new Date()) {
        isOtpValid = true;
      }
    }

    if (!isOtpValid) {
      return res.status(400).json({ error: 'Kode OTP tidak valid atau belum diverifikasi. Lakukan verifikasi OTP terlebih dahulu.' });
    }

    // 2. Periksa apakah pengguna dengan nomor tersebut sudah terdaftar
    let userExists = false;
    try {
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phone_number)
        .maybeSingle();

      if (checkError) throw checkError;
      if (existingUser) userExists = true;
    } catch (dbErr) {
      const users = getLocalUsers();
      if (users.some(u => u.phone_number === phone_number)) {
        userExists = true;
      }
    }

    if (userExists) {
      return res.status(400).json({ error: 'Nomor HP ini sudah terdaftar. Silakan masuk (login).' });
    }

    // 3. Unggah foto profil
    let profilePictureUrl = '/images/default_avatar.png'; // Bawaan default jika tidak mengunggah
    if (file) {
      const fileName = `profile_${Date.now()}_${path.basename(file.originalname).replace(/\s+/g, '_')}`;
      const contentType = file.mimetype;

      try {
        // Upload to Supabase Storage 'uploads' bucket
        const { error: uploadError } = await supabase.storage
          .from('uploads')
          .upload(fileName, file.buffer, {
            contentType,
            upsert: true
          });

        if (uploadError) throw uploadError;

        // Dapatkan URL publik
        const { data: urlData } = supabase.storage
          .from('uploads')
          .getPublicUrl(fileName);

        profilePictureUrl = urlData.publicUrl;
      } catch (uploadErr) {
        console.warn('Supabase storage upload failed for profile pic, using local fallback:', uploadErr.message);
        
        const localFilePath = path.join(uploadsDir, fileName);
        fs.writeFileSync(localFilePath, file.buffer);
        profilePictureUrl = `/api/uploads/${fileName}`;
      }
    }

    // 4. Simpan Pengguna Baru
    const newUser = {
      phone_number,
      name,
      profile_picture: profilePictureUrl,
      role: 'member',
      created_at: new Date().toISOString()
    };

    let savedUser = null;
    try {
      const { data: createdUser, error: insertError } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();

      if (insertError) throw insertError;
      savedUser = createdUser;
    } catch (dbErr) {
      console.warn('Database error creating user, using local fallback:', dbErr.message);
      const users = getLocalUsers();
      savedUser = { ...newUser, id: 'u_' + Date.now() };
      users.push(savedUser);
      saveLocalUsers(users);
    }

    // Hapus data verifikasi OTP setelah pendaftaran sukses
    try {
      await supabase.from('otp_codes').delete().eq('phone_number', phone_number);
    } catch (otpCleanupErr) {
      // Cleanup lokal sebagai fallback
      const otps = getLocalOtps().filter(o => o.phone_number !== phone_number);
      saveLocalOtps(otps);
    }

    // 5. Buat token JWT untuk sesi masuk pengguna
    const token = jwt.sign({
      id: savedUser.id,
      name: savedUser.name,
      phone_number: savedUser.phone_number,
      role: savedUser.role
    }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      success: true,
      message: 'Registrasi anggota berhasil.',
      token,
      user: {
        id: savedUser.id,
        name: savedUser.name,
        phone_number: savedUser.phone_number,
        profile_picture: savedUser.profile_picture,
        role: savedUser.role
      }
    });
  } catch (err) {
    console.error('Error in registration controller:', err.message);
    res.status(500).json({ error: 'Gagal melakukan pendaftaran: ' + err.message });
  }
});

// F. Login Anggota Baru dengan OTP
app.post('/api/auth/login-otp', async (req, res) => {
  const { phone_number, code } = req.body;

  if (!phone_number || !code) {
    return res.status(400).json({ error: 'Nomor HP dan kode OTP wajib diisi.' });
  }

  try {
    // 1. Verifikasi kecocokan OTP
    let isOtpValid = false;
    try {
      const { data: otpRecords, error: otpError } = await supabase
        .from('otp_codes')
        .select('*')
        .eq('phone_number', phone_number)
        .eq('code', code)
        .order('created_at', { ascending: false });

      if (otpError) throw otpError;

      const otpRecord = otpRecords && otpRecords[0];
      if (otpRecord && new Date(otpRecord.expires_at) >= new Date()) {
        isOtpValid = true;
      }
    } catch (dbErr) {
      const otps = getLocalOtps();
      const otpRecord = otps.find(o => o.phone_number === phone_number && o.code === code);
      if (otpRecord && new Date(otpRecord.expires_at) >= new Date()) {
        isOtpValid = true;
      }
    }

    if (!isOtpValid) {
      return res.status(400).json({ error: 'Kode OTP salah atau telah kedaluwarsa.' });
    }

    // 2. Cari pengguna terdaftar
    let user = null;
    try {
      const { data: foundUser, error: findError } = await supabase
        .from('users')
        .select('*')
        .eq('phone_number', phone_number)
        .maybeSingle();

      if (findError) throw findError;
      user = foundUser;
    } catch (dbErr) {
      const users = getLocalUsers();
      user = users.find(u => u.phone_number === phone_number);
    }

    if (!user) {
      return res.status(404).json({ error: 'Nomor HP belum terdaftar. Silakan lakukan registrasi terlebih dahulu.' });
    }

    // Hapus OTP setelah login berhasil
    try {
      await supabase.from('otp_codes').delete().eq('phone_number', phone_number);
    } catch (otpCleanupErr) {
      // Abaikan
    }

    // 3. Buat JWT Token
    const token = jwt.sign({
      id: user.id,
      name: user.name,
      phone_number: user.phone_number,
      role: user.role
    }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      success: true,
      message: 'Login berhasil.',
      token,
      user: {
        id: user.id,
        name: user.name,
        phone_number: user.phone_number,
        profile_picture: user.profile_picture,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Error during member OTP login:', err.message);
    res.status(500).json({ error: 'Terjadi kegagalan masuk: ' + err.message });
  }
});


// =========================================================================
// 2. LANDING PAGE CONFIGURATION ENDPOINTS (Protected - Admin Only)
// =========================================================================

app.get('/api/config', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('landing_config')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      // Buat data bawaan jika tabel belum berisi data
      if (error.code === 'PGRST116') {
        const defaultConfig = {
          id: 1,
          hero_badge: 'Penyedia Layanan IT & Solusi Digital Premium',
          hero_title: 'Transformasi Digital Bisnis Anda Bersama Berdikari Digital Nusantara',
          hero_description: 'Kami merancang website premium, aplikasi mobile, sistem AI otomatisasi cerdas, serta produk digital siap pakai untuk mengakselerasi pertumbuhan bisnis Anda secara mandiri.',
          cta_title: 'Siap Memulai Transformasi Digital?',
          cta_description: 'Konsultasikan ide produk digital atau sistem Anda bersama tim ahli kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
        };

        const { data: insertedData, error: insertError } = await supabase
          .from('landing_config')
          .insert([defaultConfig])
          .select()
          .single();

        if (insertError) throw insertError;
        return res.json(insertedData);
      }
      throw error;
    }
    res.json(data);
  } catch (err) {
    console.error('Error fetching config:', err.message);
    res.status(500).json({ error: 'Gagal memuat konfigurasi landing page: ' + err.message });
  }
});

app.post('/api/config', authenticateToken, requireAdmin, async (req, res) => {
  const { hero_badge, hero_title, hero_description, cta_title, cta_description } = req.body;

  try {
    const { data, error } = await supabase
      .from('landing_config')
      .upsert({
        id: 1,
        hero_badge,
        hero_title,
        hero_description,
        cta_title,
        cta_description,
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: 'Konfigurasi landing page berhasil diperbarui.', data });
  } catch (err) {
    console.error('Error updating config:', err.message);
    res.status(500).json({ error: 'Gagal memperbarui konfigurasi landing page: ' + err.message });
  }
});


// =========================================================================
// 3. ACTIVITIES / PORTAL KEGIATAN ENDPOINTS (CRUD - Protected - Admin Only)
// =========================================================================

app.get('/api/activities', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error fetching activities:', err.message);
    res.status(500).json({ error: 'Gagal mengambil data kegiatan: ' + err.message });
  }
});

app.get('/api/activities/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('activities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error('Error fetching activity detail:', err.message);
    res.status(500).json({ error: 'Kegiatan tidak ditemukan: ' + err.message });
  }
});

app.post('/api/activities', authenticateToken, requireAdmin, async (req, res) => {
  const { title, category, date, short_desc, content, image_url } = req.body;

  if (!title || !category || !date || !short_desc || !content || !image_url) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .insert([{ title, category, date, short_desc, content, image_url }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Kegiatan berhasil ditambahkan.', data });
  } catch (err) {
    console.error('Error creating activity:', err.message);
    res.status(500).json({ error: 'Gagal menambahkan kegiatan: ' + err.message });
  }
});

app.put('/api/activities/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { title, category, date, short_desc, content, image_url } = req.body;

  if (!title || !category || !date || !short_desc || !content || !image_url) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('activities')
      .update({ title, category, date, short_desc, content, image_url })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, message: 'Kegiatan berhasil diperbarui.', data });
  } catch (err) {
    console.error('Error updating activity:', err.message);
    res.status(500).json({ error: 'Gagal memperbarui kegiatan: ' + err.message });
  }
});

app.delete('/api/activities/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('activities')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Kegiatan berhasil dihapus.' });
  } catch (err) {
    console.error('Error deleting activity:', err.message);
    res.status(500).json({ error: 'Gagal menghapus kegiatan: ' + err.message });
  }
});


// =========================================================================
// 4. CONTACT SUBMISSIONS / CUSTOMER LEADS ENDPOINTS (CRUD - Protected)
// =========================================================================

app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ error: 'Nama, Email, Telepon/WhatsApp, Layanan, dan Pesan wajib diisi.' });
  }

  const newSubmission = {
    name,
    company,
    email,
    phone,
    service,
    message,
    created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([newSubmission])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, message: 'Pesan Anda berhasil terkirim. Tim kami akan segera menghubungi Anda.', data });
  } catch (err) {
    console.warn('Supabase contact submission failed, using local store:', err.message);

    const store = getLocalContactData();
    const createdSubmission = { ...newSubmission, id: 'c_' + Date.now() };
    store.push(createdSubmission);
    saveLocalContactData(store);

    res.status(201).json({ success: true, message: 'Pesan Anda berhasil terkirim secara lokal.', data: createdSubmission });
  }
});

app.get('/api/contact', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.warn('Supabase failed fetching submissions, using local fallback:', err.message);
    const contacts = getLocalContactData();
    contacts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    res.json(contacts);
  }
});

app.delete('/api/contact/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Data pesan pelanggan berhasil dihapus.' });
  } catch (err) {
    console.warn('Supabase failed deleting contact submission, using local fallback:', err.message);
    const store = getLocalContactData();
    const filtered = store.filter(c => String(c.id) !== String(id));
    if (filtered.length !== store.length) {
      saveLocalContactData(filtered);
      res.json({ success: true, message: 'Data pesan pelanggan berhasil dihapus secara lokal.' });
    } else {
      res.status(404).json({ error: 'Pesan pelanggan tidak ditemukan.' });
    }
  }
});


// =========================================================================
// 5. PORTFOLIOS / CASE STUDIES ENDPOINTS (CRUD - Protected - Admin Only)
// =========================================================================

app.get('/api/portfolios', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.warn('Supabase error fetching portfolios, using local fallback:', err.message);
    res.json(getLocalPortfoliosData());
  }
});

app.get('/api/portfolios/by-slug/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.warn('Supabase error fetching portfolio by slug, using local fallback:', err.message);
    const portfolios = getLocalPortfoliosData();
    const portfolio = portfolios.find(p => p.slug === slug);
    if (portfolio) {
      res.json(portfolio);
    } else {
      res.status(404).json({ error: 'Portofolio tidak ditemukan.' });
    }
  }
});

app.post('/api/portfolios', authenticateToken, requireAdmin, async (req, res) => {
  const {
    slug, title, category, category_label, image_url, video_url, short_desc, client, year, tags, challenge, solution, results,
    demo_url, live_url, project_importance, client_info,
    stat_1_val, stat_1_label, stat_1_desc,
    stat_2_val, stat_2_label, stat_2_desc,
    stat_3_val, stat_3_label, stat_3_desc,
    challenge_detailed, solution_detailed, testimonial_text, testimonial_author, media
  } = req.body;

  if (!slug || !title || !category || !image_url || !short_desc) {
    return res.status(400).json({ error: 'Field slug, title, category, image_url, short_desc wajib diisi.' });
  }

  const newPortfolio = {
    slug, title, category, category_label, image_url, video_url: video_url || '', short_desc, client, year, tags, challenge, solution, results,
    demo_url: demo_url || '', live_url: live_url || '', project_importance: project_importance || '', client_info: client_info || '',
    stat_1_val: stat_1_val || '', stat_1_label: stat_1_label || '', stat_1_desc: stat_1_desc || '',
    stat_2_val: stat_2_val || '', stat_2_label: stat_2_label || '', stat_2_desc: stat_2_desc || '',
    stat_3_val: stat_3_val || '', stat_3_label: stat_3_label || '', stat_3_desc: stat_3_desc || '',
    challenge_detailed: challenge_detailed || '', solution_detailed: solution_detailed || '', testimonial_text: testimonial_text || '', testimonial_author: testimonial_author || '',
    media: media || [], created_at: new Date().toISOString()
  };

  try {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([newPortfolio])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Slug portofolio sudah digunakan. Silakan buat slug yang berbeda.' });
      }
      throw error;
    }
    res.status(201).json({ success: true, message: 'Portofolio berhasil ditambahkan.', data });
  } catch (err) {
    console.warn('Supabase error creating portfolio, using local fallback:', err.message);

    const store = getLocalPortfoliosData();
    if (store.some(p => p.slug === slug)) {
      return res.status(400).json({ error: 'Slug portofolio sudah digunakan.' });
    }

    const createdPortfolio = { ...newPortfolio, id: 'p_' + Date.now() };
    store.push(createdPortfolio);
    saveLocalPortfoliosData(store);

    res.status(201).json({ success: true, message: 'Portofolio berhasil ditambahkan secara lokal.', data: createdPortfolio });
  }
});

app.put('/api/portfolios/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const {
    slug, title, category, category_label, image_url, video_url, short_desc, client, year, tags, challenge, solution, results,
    demo_url, live_url, project_importance, client_info,
    stat_1_val, stat_1_label, stat_1_desc,
    stat_2_val, stat_2_label, stat_2_desc,
    stat_3_val, stat_3_label, stat_3_desc,
    challenge_detailed, solution_detailed, testimonial_text, testimonial_author, media
  } = req.body;

  if (!slug || !title || !category || !image_url || !short_desc) {
    return res.status(400).json({ error: 'Field slug, title, category, image_url, short_desc wajib diisi.' });
  }

  const updatedFields = {
    slug, title, category, category_label, image_url, video_url: video_url || '', short_desc, client, year, tags, challenge, solution, results,
    demo_url: demo_url || '', live_url: live_url || '', project_importance: project_importance || '', client_info: client_info || '',
    stat_1_val: stat_1_val || '', stat_1_label: stat_1_label || '', stat_1_desc: stat_1_desc || '',
    stat_2_val: stat_2_val || '', stat_2_label: stat_2_label || '', stat_2_desc: stat_2_desc || '',
    stat_3_val: stat_3_val || '', stat_3_label: stat_3_label || '', stat_3_desc: stat_3_desc || '',
    challenge_detailed: challenge_detailed || '', solution_detailed: solution_detailed || '', testimonial_text: testimonial_text || '', testimonial_author: testimonial_author || '',
    media: media || []
  };

  try {
    const { data, error } = await supabase
      .from('portfolios')
      .update(updatedFields)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(400).json({ error: 'Slug portofolio sudah digunakan oleh proyek lain.' });
      }
      throw error;
    }
    res.json({ success: true, message: 'Portofolio berhasil diperbarui.', data });
  } catch (err) {
    console.warn('Supabase error updating portfolio, using local fallback:', err.message);

    const store = getLocalPortfoliosData();
    const idx = store.findIndex(p => String(p.id) === String(id) || p.slug === slug);
    if (idx !== -1) {
      if (store.some((p, i) => p.slug === slug && i !== idx)) {
        return res.status(400).json({ error: 'Slug portofolio sudah digunakan oleh proyek lain.' });
      }
      store[idx] = { ...store[idx], ...updatedFields };
      saveLocalPortfoliosData(store);
      res.json({ success: true, message: 'Portofolio berhasil diperbarui secara lokal.', data: store[idx] });
    } else {
      res.status(404).json({ error: 'Portofolio tidak ditemukan.' });
    }
  }
});

app.delete('/api/portfolios/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Portofolio berhasil dihapus.' });
  } catch (err) {
    console.warn('Supabase error deleting portfolio, using local fallback:', err.message);

    const store = getLocalPortfoliosData();
    const filtered = store.filter(p => String(p.id) !== String(id));
    if (filtered.length !== store.length) {
      saveLocalPortfoliosData(filtered);
      res.json({ success: true, message: 'Portofolio berhasil dihapus secara lokal.' });
    } else {
      res.status(404).json({ error: 'Portofolio tidak ditemukan.' });
    }
  }
});


// =========================================================================
// 6. FINANCE & ACCOUNTING ENDPOINTS (Protected - Admin Only)
// =========================================================================

const financeStorePath = path.resolve(__dirname, 'finance_store.json');

if (!fs.existsSync(financeStorePath)) {
  const initialStore = {
    transactions: [
      { id: "t1", date: '2026-07-02', type: 'income', category: 'Proyek Web', amount: 15000000, description: 'DP 50% Pembuatan E-Commerce PT Maju' },
      { id: "t2", date: '2026-07-03', type: 'income', category: 'Produk Digital: Undangan', amount: 297000, description: 'Penjualan 3 unit Undangan Pernikahan Gold' },
      { id: "t3", date: '2026-07-04', type: 'expense', category: 'Gaji Karyawan', amount: 7500000, description: 'Pembayaran gaji bulanan desainer UI/UX' },
      { id: "t4", date: '2026-07-05', type: 'expense', category: 'Sewa Server', amount: 850000, description: 'Biaya server AWS & GCP Hosting Utama' },
      { id: "t5", date: '2026-07-05', type: 'income', category: 'Produk Digital: E-Book', amount: 196000, description: 'Penjualan 4 unit E-Book Panduan AI Automasi' },
      { id: "t6", date: '2026-07-06', type: 'expense', category: 'Pemasaran', amount: 1200000, description: 'Iklan Instagram & Google Ads untuk Leads Campaign' },
      { id: "t7", date: '2026-07-06', type: 'income', category: 'Proyek Mobile', amount: 24500000, description: 'Pelunasan Aplikasi Klinik MedPlus Mobile' }
    ],
    invoices: [
      { id: "i1", invoice_number: 'INV-2026-001', client_name: 'Budi Santoso', client_email: 'budi@majujaya.com', project_name: 'ERP Integration Phase 1', amount: 12500000, status: 'paid', due_date: '2026-07-15' },
      { id: "i2", invoice_number: 'INV-2026-002', client_name: 'Dewi Lestari', client_email: 'dewi.l@medika.co.id', project_name: 'Mobile App Health Portal', amount: 8000000, status: 'pending', due_date: '2026-07-20' },
      { id: "i3", invoice_number: 'INV-2026-003', client_name: 'Rian Hidayat', client_email: 'rian@solaria.com', project_name: 'E-Commerce Website Revamp', amount: 4500000, status: 'cancelled', due_date: '2026-07-10' }
    ]
  };
  fs.writeFileSync(financeStorePath, JSON.stringify(initialStore, null, 2));
}

function getLocalFinanceData() {
  try { return JSON.parse(fs.readFileSync(financeStorePath, 'utf8')); } catch (err) { return { transactions: [], invoices: [] }; }
}
function saveLocalFinanceData(data) {
  fs.writeFileSync(financeStorePath, JSON.stringify(data, null, 2));
}

// 1. GET SUMMARY
app.get('/api/finance/summary', authenticateToken, requireAdmin, async (req, res) => {
  try {
    let txs = [];
    try {
      const { data, error } = await supabase.from('financial_transactions').select('*');
      if (error) throw error;
      txs = data;
    } catch (dbErr) {
      console.warn("Supabase finance fetch failed, using local json store:", dbErr.message);
      txs = getLocalFinanceData().transactions;
    }

    const total_income = txs.filter(t => t.type === 'income').reduce((acc, t) => acc + Number(t.amount), 0);
    const total_expense = txs.filter(t => t.type === 'expense').reduce((acc, t) => acc + Number(t.amount), 0);
    const net_profit = total_income - total_expense;

    const category_breakdown = {};
    txs.forEach(t => {
      category_breakdown[t.category] = (category_breakdown[t.category] || 0) + Number(t.amount);
    });

    res.json({
      total_income,
      total_expense,
      net_profit,
      transactions_count: txs.length,
      category_breakdown,
      transactions: txs
    });
  } catch (err) {
    res.status(500).json({ error: 'Gagal memproses data keuangan: ' + err.message });
  }
});

// 2. TRANSACTIONS CRUD
app.get('/api/finance/transactions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (dbErr) {
    console.warn("Supabase transactions error, using local json:", dbErr.message);
    const txs = getLocalFinanceData().transactions;
    txs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(txs);
  }
});

app.post('/api/finance/transactions', authenticateToken, requireAdmin, async (req, res) => {
  const { date, type, category, amount, description, receipt_url } = req.body;

  if (!type || !category || !amount || !description) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  const newTx = {
    date: date || new Date().toISOString().split('T')[0],
    type, category, amount: Number(amount), description, receipt_url
  };

  try {
    const { data, error } = await supabase
      .from('financial_transactions')
      .insert([newTx])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (dbErr) {
    console.warn("Supabase transactions error, saving locally:", dbErr.message);
    const store = getLocalFinanceData();
    const createdTx = { ...newTx, id: 't_' + Date.now() };
    store.transactions.push(createdTx);
    saveLocalFinanceData(store);
    res.status(201).json({ success: true, data: createdTx });
  }
});

app.put('/api/finance/transactions/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { date, type, category, amount, description, receipt_url } = req.body;

  const updateData = { date, type, category, amount: Number(amount), description, receipt_url };

  try {
    const { data, error } = await supabase
      .from('financial_transactions')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (dbErr) {
    console.warn("Supabase transactions error, updating locally:", dbErr.message);
    const store = getLocalFinanceData();
    const idx = store.transactions.findIndex(t => String(t.id) === String(id));
    if (idx !== -1) {
      store.transactions[idx] = { ...store.transactions[idx], ...updateData };
      saveLocalFinanceData(store);
      res.json({ success: true, data: store.transactions[idx] });
    } else {
      res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }
  }
});

app.delete('/api/finance/transactions/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('financial_transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Transaksi berhasil dihapus.' });
  } catch (dbErr) {
    console.warn("Supabase transactions error, deleting locally:", dbErr.message);
    const store = getLocalFinanceData();
    const newTxs = store.transactions.filter(t => String(t.id) !== String(id));
    if (newTxs.length !== store.transactions.length) {
      store.transactions = newTxs;
      saveLocalFinanceData(store);
      res.json({ success: true, message: 'Transaksi lokal berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }
  }
});

// 3. INVOICES CRUD
app.get('/api/finance/invoices', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (dbErr) {
    console.warn("Supabase invoices error, using local json:", dbErr.message);
    const invoices = getLocalFinanceData().invoices;
    res.json(invoices);
  }
});

app.post('/api/finance/invoices', authenticateToken, requireAdmin, async (req, res) => {
  const { invoice_number, client_name, client_email, project_name, amount, status, due_date } = req.body;

  if (!invoice_number || !client_name || !client_email || !project_name || !amount || !due_date) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  const newInvoice = {
    invoice_number, client_name, client_email, project_name, amount: Number(amount), status: status || 'pending', due_date
  };

  try {
    const { data, error } = await supabase
      .from('invoices')
      .insert([newInvoice])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ success: true, data });
  } catch (dbErr) {
    console.warn("Supabase invoice error, saving locally:", dbErr.message);
    const store = getLocalFinanceData();
    const createdInvoice = { ...newInvoice, id: 'i_' + Date.now() };
    store.invoices.push(createdInvoice);
    saveLocalFinanceData(store);
    res.status(201).json({ success: true, data: createdInvoice });
  }
});

app.put('/api/finance/invoices/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { invoice_number, client_name, client_email, project_name, amount, status, due_date } = req.body;

  const updateData = { invoice_number, client_name, client_email, project_name, amount: Number(amount), status, due_date };

  try {
    const { data, error } = await supabase
      .from('invoices')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json({ success: true, data });
  } catch (dbErr) {
    console.warn("Supabase invoices error, updating locally:", dbErr.message);
    const store = getLocalFinanceData();
    const idx = store.invoices.findIndex(i => String(i.id) === String(id));
    if (idx !== -1) {
      store.invoices[idx] = { ...store.invoices[idx], ...updateData };
      saveLocalFinanceData(store);
      res.json({ success: true, data: store.invoices[idx] });
    } else {
      res.status(404).json({ error: 'Invoice tidak ditemukan' });
    }
  }
});

app.delete('/api/finance/invoices/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Invoice berhasil dihapus.' });
  } catch (dbErr) {
    console.warn("Supabase invoices error, deleting locally:", dbErr.message);
    const store = getLocalFinanceData();
    const newInvoices = store.invoices.filter(i => String(i.id) !== String(id));
    if (newInvoices.length !== store.invoices.length) {
      store.invoices = newInvoices;
      saveLocalFinanceData(store);
      res.json({ success: true, message: 'Invoice lokal berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Invoice tidak ditemukan' });
    }
  }
});


// =========================================================================
// 7. FILE UPLOAD ROUTE (Image & Video)
// =========================================================================

app.post('/api/upload', authenticateToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Tidak ada berkas yang diunggah.' });
  }

  const file = req.file;
  const fileName = `${Date.now()}_${path.basename(file.originalname).replace(/\s+/g, '_')}`;
  const contentType = file.mimetype;

  try {
    // Upload to Supabase Storage 'uploads' bucket
    const { error } = await supabase.storage
      .from('uploads')
      .upload(fileName, file.buffer, {
        contentType,
        upsert: true
      });

    if (error) throw error;

    // Dapatkan URL publik
    const { data: urlData } = supabase.storage
      .from('uploads')
      .getPublicUrl(fileName);

    res.json({
      success: true,
      message: 'Berkas berhasil diunggah ke cloud storage.',
      url: urlData.publicUrl
    });
  } catch (err) {
    console.warn('Supabase Storage upload failed, saving locally:', err.message);

    try {
      const localFilePath = path.join(uploadsDir, fileName);
      fs.writeFileSync(localFilePath, file.buffer);
      const localUrl = `/api/uploads/${fileName}`;

      res.json({
        success: true,
        message: 'Berkas berhasil diunggah secara lokal.',
        url: localUrl
      });
    } catch (writeErr) {
      console.error('Local upload failed:', writeErr.message);
      res.status(500).json({ error: 'Gagal mengunggah berkas: ' + writeErr.message });
    }
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ name: 'Berdikari Tech API Server', version: '1.0.0', status: 'Running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  Berdikari Tech Server running on port ${PORT}`);
  console.log(`  Connected to Supabase Project`);
  console.log(`=================================================`);
});
