import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import fs from 'fs';
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

// 1. ROUTE AUTENTIKASI: Login Admin (Database-Driven)
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

    // Verifikasi kata sandi
    if (user.password_hash === password) {
      const token = jwt.sign({ username: user.username, role: user.role || 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    } else {
      return res.status(401).json({ error: 'Username atau kata sandi salah.' });
    }
  } catch (err) {
    // Fallback darurat jika tabel belum dimigrasikan atau terjadi kendala DB
    if (username === 'admin' && password === defaultPassword) {
      const token = jwt.sign({ username: 'admin', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
      return res.json({ success: true, token });
    }
    return res.status(500).json({ error: 'Terjadi kegagalan verifikasi server: ' + err.message });
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
// ==========================================
// FINANCE & ACCOUNTING BACKEND CONTROLLER
// ==========================================

const financeStorePath = path.resolve(__dirname, 'finance_store.json');

// Initialize mock finance store if not exists
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
  try {
    return JSON.parse(fs.readFileSync(financeStorePath, 'utf8'));
  } catch (err) {
    return { transactions: [], invoices: [] };
  }
}

function saveLocalFinanceData(data) {
  fs.writeFileSync(financeStorePath, JSON.stringify(data, null, 2));
}

// 1. GET SUMMARY
app.get('/api/finance/summary', authenticateToken, async (req, res) => {
  try {
    let txs = [];
    try {
      const { data, error } = await supabase.from('financial_transactions').select('*');
      if (error) throw error;
      txs = data;
    } catch (dbErr) {
      console.warn("Supabase query failed, using local json store:", dbErr.message);
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
app.get('/api/finance/transactions', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('financial_transactions')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (dbErr) {
    console.warn("Supabase error, using local json:", dbErr.message);
    const txs = getLocalFinanceData().transactions;
    // sort by date desc
    txs.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    res.json(txs);
  }
});

app.post('/api/finance/transactions', authenticateToken, async (req, res) => {
  const { date, type, category, amount, description } = req.body;

  if (!type || !category || !amount || !description) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  const newTx = {
    date: date || new Date().toISOString().split('T')[0],
    type,
    category,
    amount: Number(amount),
    description
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
    console.warn("Supabase error, saving locally:", dbErr.message);
    const store = getLocalFinanceData();
    const createdTx = { ...newTx, id: 't_' + Date.now() };
    store.transactions.push(createdTx);
    saveLocalFinanceData(store);
    res.status(201).json({ success: true, data: createdTx, note: 'Tersimpan lokal' });
  }
});

app.put('/api/finance/transactions/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { date, type, category, amount, description } = req.body;

  const updateData = { date, type, category, amount: Number(amount), description };

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
    console.warn("Supabase error, updating locally:", dbErr.message);
    const store = getLocalFinanceData();
    const idx = store.transactions.findIndex(t => t.id === id);
    if (idx !== -1) {
      store.transactions[idx] = { ...store.transactions[idx], ...updateData };
      saveLocalFinanceData(store);
      res.json({ success: true, data: store.transactions[idx] });
    } else {
      res.status(404).json({ error: 'Transaksi tidak ditemukan' });
    }
  }
});

app.delete('/api/finance/transactions/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('financial_transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Transaksi berhasil dihapus.' });
  } catch (dbErr) {
    console.warn("Supabase error, deleting locally:", dbErr.message);
    const store = getLocalFinanceData();
    const newTxs = store.transactions.filter(t => t.id !== id);
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
app.get('/api/finance/invoices', authenticateToken, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (dbErr) {
    console.warn("Supabase error, using local invoices:", dbErr.message);
    const invoices = getLocalFinanceData().invoices;
    res.json(invoices);
  }
});

app.post('/api/finance/invoices', authenticateToken, async (req, res) => {
  const { invoice_number, client_name, client_email, project_name, amount, status, due_date } = req.body;

  if (!invoice_number || !client_name || !client_email || !project_name || !amount || !due_date) {
    return res.status(400).json({ error: 'Seluruh input wajib diisi.' });
  }

  const newInvoice = {
    invoice_number,
    client_name,
    client_email,
    project_name,
    amount: Number(amount),
    status: status || 'pending',
    due_date
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
    console.warn("Supabase error, saving invoice locally:", dbErr.message);
    const store = getLocalFinanceData();
    const createdInvoice = { ...newInvoice, id: 'i_' + Date.now() };
    store.invoices.push(createdInvoice);
    saveLocalFinanceData(store);
    res.status(201).json({ success: true, data: createdInvoice });
  }
});

app.put('/api/finance/invoices/:id', authenticateToken, async (req, res) => {
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
    console.warn("Supabase error, updating invoice locally:", dbErr.message);
    const store = getLocalFinanceData();
    const idx = store.invoices.findIndex(i => i.id === id);
    if (idx !== -1) {
      store.invoices[idx] = { ...store.invoices[idx], ...updateData };
      saveLocalFinanceData(store);
      res.json({ success: true, data: store.invoices[idx] });
    } else {
      res.status(404).json({ error: 'Invoice tidak ditemukan' });
    }
  }
});

app.delete('/api/finance/invoices/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;

  try {
    const { error } = await supabase
      .from('invoices')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ success: true, message: 'Invoice berhasil dihapus.' });
  } catch (dbErr) {
    console.warn("Supabase error, deleting invoice locally:", dbErr.message);
    const store = getLocalFinanceData();
    const newInvoices = store.invoices.filter(i => i.id !== id);
    if (newInvoices.length !== store.invoices.length) {
      store.invoices = newInvoices;
      saveLocalFinanceData(store);
      res.json({ success: true, message: 'Invoice lokal berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Invoice tidak ditemukan' });
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
