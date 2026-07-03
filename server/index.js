import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import { supabase } from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key-berdikari-2026';

// Middleware
app.use(cors());
app.use(express.json());

// Logger Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware Authentikasi JWT
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

// 1. ROUTE AUTENTIKASI: Login Admin
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'berdikariadmin';

  if (password === adminPassword) {
    // Generate JWT Token valid untuk 24 jam
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
    return res.json({ success: true, token });
  } else {
    return res.status(401).json({ error: 'Kata sandi salah.' });
  }
});

// Verifikasi token
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ success: true, role: req.user.role });
});

// 2. ROUTE CONFIG: Ambil Konfigurasi Landing Page
app.get('/api/config', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('landing_config')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) {
      // Jika error karena tabel kosong, buat default baru
      if (error.code === 'PGRST116') {
        const defaultConfig = {
          id: 1,
          hero_badge: 'Penyedia Jasa IT Terpercaya & Premium',
          hero_title: 'Transformasi Digital Bisnis Anda Bersama Berdikari Tech',
          hero_description: 'Kami merancang dan mengembangkan website premium, aplikasi mobile (iOS & Android), serta sistem custom berkinerja tinggi untuk membantu bisnis Anda berkembang lebih cepat, aman, dan profesional.',
          cta_title: 'Siap Memulai Transformasi Digital?',
          cta_description: 'Konsultasikan ide aplikasi atau website Anda bersama tim konsultan ahli IT kami secara gratis. Dapatkan estimasi biaya dan rancangan proyek dalam waktu singkat.'
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

// Update Konfigurasi Landing Page (Protected)
app.post('/api/config', authenticateToken, async (req, res) => {
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

// 3. ROUTE ACTIVITIES: Ambil Semua Kegiatan (Public)
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

// Ambil Satu Kegiatan Detail (Public)
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

// Buat Kegiatan Baru (Protected)
app.post('/api/activities', authenticateToken, async (req, res) => {
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

// Perbarui Kegiatan (Protected)
app.put('/api/activities/:id', authenticateToken, async (req, res) => {
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

// Hapus Kegiatan (Protected)
app.delete('/api/activities/:id', authenticateToken, async (req, res) => {
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

// 4. ROUTE CONTACT SUBMISSIONS (Data Pelanggan / Leads)
// Simpan Pesan Kontak Baru (Public)
app.post('/api/contact', async (req, res) => {
  const { name, company, email, phone, service, message } = req.body;

  if (!name || !email || !phone || !service || !message) {
    return res.status(400).json({ error: 'Nama, Email, Telepon/WhatsApp, Layanan, dan Pesan wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{ name, company, email, phone, service, message }])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({ success: true, message: 'Pesan Anda berhasil terkirim. Tim kami akan segera menghubungi Anda.', data });
  } catch (err) {
    console.error('Error saving contact submission:', err.message);
    res.status(500).json({ error: 'Gagal mengirim pesan kontak: ' + err.message });
  }
});

// Ambil Semua Pesan Kontak (Protected)
app.get('/api/contact', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching contact submissions:', err.message);
    res.status(500).json({ error: 'Gagal memuat pesan kontak: ' + err.message });
  }
});

// Hapus Pesan Kontak (Protected)
app.delete('/api/contact/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Data pesan pelanggan berhasil dihapus.' });
  } catch (err) {
    console.error('Error deleting contact submission:', err.message);
    res.status(500).json({ error: 'Gagal menghapus pesan pelanggan: ' + err.message });
  }
});

// 5. ROUTE PORTFOLIOS (Proyek Portofolio)
// Ambil Semua Portofolio (Public)
app.get('/api/portfolios', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    console.error('Error fetching portfolios:', err.message);
    res.status(500).json({ error: 'Gagal memuat data portofolio: ' + err.message });
  }
});

// Buat Portofolio Baru (Protected)
app.post('/api/portfolios', authenticateToken, async (req, res) => {
  const { slug, title, category, category_label, image_url, short_desc, client, year, tags, challenge, solution, results } = req.body;

  if (!slug || !title || !category || !category_label || !image_url || !short_desc || !client || !year || !tags || !challenge || !solution || !results) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('portfolios')
      .insert([{ slug, title, category, category_label, image_url, short_desc, client, year, tags, challenge, solution, results }])
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
    console.error('Error creating portfolio:', err.message);
    res.status(500).json({ error: 'Gagal menambahkan portofolio: ' + err.message });
  }
});

// Perbarui Portofolio (Protected)
app.put('/api/portfolios/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { slug, title, category, category_label, image_url, short_desc, client, year, tags, challenge, solution, results } = req.body;

  if (!slug || !title || !category || !category_label || !image_url || !short_desc || !client || !year || !tags || !challenge || !solution || !results) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  try {
    const { data, error } = await supabase
      .from('portfolios')
      .update({ slug, title, category, category_label, image_url, short_desc, client, year, tags, challenge, solution, results })
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
    console.error('Error updating portfolio:', err.message);
    res.status(500).json({ error: 'Gagal memperbarui portofolio: ' + err.message });
  }
});

// Hapus Portofolio (Protected)
app.delete('/api/portfolios/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('portfolios')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ success: true, message: 'Portofolio berhasil dihapus.' });
  } catch (err) {
    console.error('Error deleting portfolio:', err.message);
    res.status(500).json({ error: 'Gagal menghapus portofolio: ' + err.message });
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
