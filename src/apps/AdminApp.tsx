import { useState, useEffect } from 'react';
import { 
  Terminal, Lock, Eye, EyeOff, LayoutGrid, FileText, Plus, Trash2, 
  Edit3, LogOut, CheckCircle2, AlertCircle, ExternalLink,
  ArrowLeft, RefreshCw, Mail, Phone, FolderKanban, Landmark,
  TrendingUp, DollarSign, Printer, CreditCard
} from 'lucide-react';

const PRESET_IMAGES = [
  { label: 'Dashboard ERP & Bisnis', value: '/images/erp_dashboard.png' },
  { label: 'Web E-Commerce & Retail', value: '/images/ecommerce_web.png' },
  { label: 'Aplikasi Medis & Kesehatan', value: '/images/medical_app.png' },
  { label: 'Aplikasi FinTech E-Wallet', value: '/images/ewallet_app.png' },
];

const formatRupiah = (num: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
};

export default function AdminApp() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [shake, setShake] = useState(false);

  // General Dashboard State
  const [activeTab, setActiveTab] = useState<'landing' | 'news' | 'leads' | 'portfolio' | 'finance'>('landing');
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Finance & Accounting State
  const [financeSummary, setFinanceSummary] = useState<any>({
    total_income: 0,
    total_expense: 0,
    net_profit: 0,
    category_breakdown: {},
    transactions: []
  });
  const [transactions, setTransactions] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [showTxModal, setShowTxModal] = useState(false);
  const [showInvModal, setShowInvModal] = useState(false);
  const [currentTx, setCurrentTx] = useState<any | null>(null);
  const [currentInv, setCurrentInv] = useState<any | null>(null);

  // Form states for transaction
  const [txDate, setTxDate] = useState('');
  const [txType, setTxType] = useState<'income' | 'expense'>('income');
  const [txCategory, setTxCategory] = useState('Proyek Web');
  const [txAmount, setTxAmount] = useState('');
  const [txDescription, setTxDescription] = useState('');

  // Form states for invoice
  const [invNumber, setInvNumber] = useState('');
  const [invClientName, setInvClientName] = useState('');
  const [invClientEmail, setInvClientEmail] = useState('');
  const [invProjectName, setInvProjectName] = useState('');
  const [invAmount, setInvAmount] = useState('');
  const [invStatus, setInvStatus] = useState<'pending' | 'paid' | 'cancelled'>('pending');
  const [invDueDate, setInvDueDate] = useState('');

  // Report & Print states
  const [showProfitLossModal, setShowProfitLossModal] = useState(false);
  const [showInvoicePrintModal, setShowInvoicePrintModal] = useState<any | null>(null);
  const [activeFinanceSubTab, setActiveFinanceSubTab] = useState<'summary' | 'transactions' | 'invoices'>('summary');

  // Portfolio State
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false);
  const [currentPortfolio, setCurrentPortfolio] = useState<any | null>(null);

  // Portfolio Form Fields
  const [pTitle, setPTitle] = useState('');
  const [pSlug, setPSlug] = useState('');
  const [pCategory, setPCategory] = useState('web');
  const [pYear, setPYear] = useState('2026');
  const [pClient, setPClient] = useState('');
  const [pTags, setPTags] = useState('');
  const [pShortDesc, setPShortDesc] = useState('');
  const [pChallenge, setPChallenge] = useState('');
  const [pSolution, setPSolution] = useState('');
  const [pResults, setPResults] = useState('');
  const [pImage, setPImage] = useState('/images/erp_dashboard.png');
  const [pCustomImage, setPCustomImage] = useState('');
  const [pUseCustomImage, setPUseCustomImage] = useState(false);

  // Landing Page Editor State
  const [config, setConfig] = useState({
    hero_badge: '',
    hero_title: '',
    hero_description: '',
    cta_title: '',
    cta_description: ''
  });

  // Activities Portal State
  const [activities, setActivities] = useState<any[]>([]);
  const [showFormModal, setShowFormModal] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<any | null>(null);
  
  // News Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Kegiatan');
  const [formDate, setFormDate] = useState('');
  const [formShortDesc, setFormShortDesc] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState('/images/erp_dashboard.png');
  const [customImage, setCustomImage] = useState('');
  const [useCustomImage, setUseCustomImage] = useState(false);

  // Check authentication on load
  useEffect(() => {
    const token = localStorage.getItem('berdikari_admin_token');
    if (token) {
      // Verifikasi token
      fetch('/api/auth/verify', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then(res => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('berdikari_admin_token');
        }
      })
      .catch(() => {
        localStorage.removeItem('berdikari_admin_token');
      });
    }
  }, []);

  // Fetch configs and activities when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchConfig();
      fetchActivities();
      fetchSubmissions();
      fetchPortfolios();
      fetchFinanceData();
    }
  }, [isAuthenticated]);

  // Alert message auto-dismiss
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem('berdikari_admin_token', data.token);
        setIsAuthenticated(true);
      } else {
        setLoginError(data.error || 'Autentikasi gagal.');
        triggerShake();
      }
    } catch (err) {
      setLoginError('Koneksi ke server gagal.');
      triggerShake();
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('berdikari_admin_token');
    setIsAuthenticated(false);
    setPassword('');
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const fetchConfig = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/config');
      if (res.ok) {
        const data = await res.json();
        setConfig(data);
      } else {
        setErrorMessage('Gagal memuat konfigurasi landing page.');
      }
    } catch (err) {
      setErrorMessage('Gagal menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchActivities = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/activities');
      if (res.ok) {
        const data = await res.json();
        setActivities(data);
      } else {
        setErrorMessage('Gagal memuat data kegiatan.');
      }
    } catch (err) {
      setErrorMessage('Gagal menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    try {
      const res = await fetch('/api/contact', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        setErrorMessage('Gagal memuat pesan pelanggan.');
      }
    } catch (err) {
      setErrorMessage('Gagal menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSubmission = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pesan dari "${name}"?`)) return;

    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');

    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccessMessage('Pesan pelanggan berhasil dihapus.');
        fetchSubmissions();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menghapus pesan.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/portfolios');
      if (res.ok) {
        const data = await res.json();
        setPortfolios(data);
      } else {
        setErrorMessage('Gagal memuat data portofolio.');
      }
    } catch (err) {
      setErrorMessage('Gagal menghubungi server.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFinanceData = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    try {
      const sumRes = await fetch('/api/finance/summary', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (sumRes.ok) {
        const sumData = await sumRes.json();
        setFinanceSummary(sumData);
      }

      const txRes = await fetch('/api/finance/transactions', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData);
      }

      const invRes = await fetch('/api/finance/invoices', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (invRes.ok) {
        const invData = await invRes.json();
        setInvoices(invData);
      }
    } catch (err) {
      setErrorMessage('Gagal memuat data keuangan.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddTx = () => {
    setCurrentTx(null);
    setTxDate(new Date().toISOString().split('T')[0]);
    setTxType('income');
    setTxCategory('Proyek Web');
    setTxAmount('');
    setTxDescription('');
    setShowTxModal(true);
  };

  const openEditTx = (tx: any) => {
    setCurrentTx(tx);
    setTxDate(tx.date.split('T')[0]);
    setTxType(tx.type);
    setTxCategory(tx.category);
    setTxAmount(tx.amount.toString());
    setTxDescription(tx.description);
    setShowTxModal(true);
  };

  const handleSaveTx = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    const txData = {
      date: txDate,
      type: txType,
      category: txCategory,
      amount: Number(txAmount),
      description: txDescription
    };

    try {
      const url = currentTx ? `/api/finance/transactions/${currentTx.id}` : '/api/finance/transactions';
      const method = currentTx ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(txData)
      });

      if (res.ok) {
        setSuccessMessage(currentTx ? 'Transaksi berhasil diperbarui.' : 'Transaksi berhasil ditambahkan.');
        setShowTxModal(false);
        fetchFinanceData();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menyimpan transaksi.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTx = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus transaksi ini?')) return;
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    try {
      const res = await fetch(`/api/finance/transactions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccessMessage('Transaksi berhasil dihapus.');
        fetchFinanceData();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        setErrorMessage('Gagal menghapus transaksi.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddInvoice = () => {
    setCurrentInv(null);
    setInvNumber(`INV-2026-${String(invoices.length + 1).padStart(3, '0')}`);
    setInvClientName('');
    setInvClientEmail('');
    setInvProjectName('');
    setInvAmount('');
    setInvStatus('pending');
    setInvDueDate(new Date(Date.now() + 14 * 24 * 3600 * 1000).toISOString().split('T')[0]); // 14 days due
    setShowInvModal(true);
  };

  const openEditInvoice = (inv: any) => {
    setCurrentInv(inv);
    setInvNumber(inv.invoice_number);
    setInvClientName(inv.client_name);
    setInvClientEmail(inv.client_email);
    setInvProjectName(inv.project_name);
    setInvAmount(inv.amount.toString());
    setInvStatus(inv.status);
    setInvDueDate(inv.due_date.split('T')[0]);
    setShowInvModal(true);
  };

  const handleSaveInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    const invData = {
      invoice_number: invNumber,
      client_name: invClientName,
      client_email: invClientEmail,
      project_name: invProjectName,
      amount: Number(invAmount),
      status: invStatus,
      due_date: invDueDate
    };

    try {
      const url = currentInv ? `/api/finance/invoices/${currentInv.id}` : '/api/finance/invoices';
      const method = currentInv ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(invData)
      });

      if (res.ok) {
        setSuccessMessage(currentInv ? 'Invoice berhasil diperbarui.' : 'Invoice berhasil ditambahkan.');
        setShowInvModal(false);
        fetchFinanceData();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menyimpan invoice.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteInvoice = async (id: string) => {
    if (!confirm('Apakah Anda yakin ingin menghapus invoice ini?')) return;
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    try {
      const res = await fetch(`/api/finance/invoices/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setSuccessMessage('Invoice berhasil dihapus.');
        fetchFinanceData();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        setErrorMessage('Gagal menghapus invoice.');
      }
    } catch (err) {
      setErrorMessage('Terjadi kesalahan koneksi.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddPortfolio = () => {
    setCurrentPortfolio(null);
    setPTitle('');
    setPSlug('');
    setPCategory('web');
    setPYear('2026');
    setPClient('');
    setPTags('');
    setPShortDesc('');
    setPChallenge('');
    setPSolution('');
    setPResults('');
    setPImage('/images/erp_dashboard.png');
    setPCustomImage('');
    setPUseCustomImage(false);
    setShowPortfolioModal(true);
  };

  const openEditPortfolio = (port: any) => {
    setCurrentPortfolio(port);
    setPTitle(port.title);
    setPSlug(port.slug);
    setPCategory(port.category);
    setPYear(port.year);
    setPClient(port.client);
    setPTags(port.tags ? port.tags.join(', ') : '');
    setPShortDesc(port.short_desc);
    setPChallenge(port.challenge);
    setPSolution(port.solution);
    setPResults(port.results);
    
    const isPreset = PRESET_IMAGES.some(p => p.value === port.image_url);
    if (isPreset) {
      setPImage(port.image_url);
      setPUseCustomImage(false);
    } else {
      setPCustomImage(port.image_url);
      setPUseCustomImage(true);
    }
    
    setShowPortfolioModal(true);
  };

  const handleSavePortfolio = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageUrl = pUseCustomImage ? pCustomImage : pImage;
    if (!imageUrl) {
      setErrorMessage('Pilih gambar atau ketik URL kustom.');
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');

    // Split tags by comma and trim whitespace
    const tagsArray = pTags.split(',').map(t => t.trim()).filter(t => t !== '');
    
    const categoryLabels: Record<string, string> = {
      web: 'Website & Web App',
      mobile: 'Mobile Application',
      uiux: 'UI/UX Design'
    };

    const payload = {
      slug: pSlug,
      title: pTitle,
      category: pCategory,
      category_label: categoryLabels[pCategory] || 'Sistem Custom',
      image_url: imageUrl,
      short_desc: pShortDesc,
      client: pClient,
      year: pYear,
      tags: tagsArray,
      challenge: pChallenge,
      solution: pSolution,
      results: pResults
    };

    const url = currentPortfolio 
      ? `/api/portfolios/${currentPortfolio.id}` 
      : '/api/portfolios';
    const method = currentPortfolio ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccessMessage(currentPortfolio ? 'Portofolio berhasil diperbarui!' : 'Portofolio baru berhasil ditambahkan!');
        setShowPortfolioModal(false);
        fetchPortfolios();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menyimpan portofolio.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeletePortfolio = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus portofolio "${title}"?`)) return;

    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');

    try {
      const res = await fetch(`/api/portfolios/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccessMessage('Portofolio berhasil dihapus.');
        fetchPortfolios();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menghapus portofolio.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');

    try {
      const res = await fetch('/api/config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(config)
      });

      if (res.ok) {
        setSuccessMessage('Konfigurasi landing page berhasil disimpan!');
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menyimpan konfigurasi.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const openAddActivity = () => {
    setCurrentActivity(null);
    setFormTitle('');
    setFormCategory('Kegiatan');
    
    // Set date default to today (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    setFormDate(today);
    
    setFormShortDesc('');
    setFormContent('');
    setFormImage('/images/erp_dashboard.png');
    setCustomImage('');
    setUseCustomImage(false);
    setShowFormModal(true);
  };

  const openEditActivity = (activity: any) => {
    setCurrentActivity(activity);
    setFormTitle(activity.title);
    setFormCategory(activity.category);
    setFormDate(activity.date.split('T')[0]); // handle timestamp timezone date
    setFormShortDesc(activity.short_desc);
    setFormContent(activity.content);
    
    const isPreset = PRESET_IMAGES.some(p => p.value === activity.image_url);
    if (isPreset) {
      setFormImage(activity.image_url);
      setUseCustomImage(false);
    } else {
      setCustomImage(activity.image_url);
      setUseCustomImage(true);
    }
    
    setShowFormModal(true);
  };

  const handleSaveActivity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const imageUrl = useCustomImage ? customImage : formImage;
    if (!imageUrl) {
      setErrorMessage('Pilih gambar atau masukkan URL gambar kustom.');
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');
    
    const payload = {
      title: formTitle,
      category: formCategory,
      date: formDate,
      short_desc: formShortDesc,
      content: formContent,
      image_url: imageUrl
    };

    const url = currentActivity 
      ? `/api/activities/${currentActivity.id}` 
      : '/api/activities';
    const method = currentActivity ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccessMessage(currentActivity ? 'Kegiatan berhasil diperbarui!' : 'Kegiatan baru berhasil ditambahkan!');
        setShowFormModal(false);
        fetchActivities();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menyimpan kegiatan.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteActivity = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus kegiatan "${title}"?`)) return;

    setIsLoading(true);
    const token = localStorage.getItem('berdikari_admin_token');

    try {
      const res = await fetch(`/api/activities/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (res.ok) {
        setSuccessMessage('Kegiatan berhasil dihapus.');
        fetchActivities();
      } else {
        if (res.status === 401 || res.status === 403) handleLogout();
        const data = await res.json();
        setErrorMessage(data.error || 'Gagal menghapus kegiatan.');
      }
    } catch (err) {
      setErrorMessage('Koneksi server gagal.');
    } finally {
      setIsLoading(false);
    }
  };

  // --- RENDERING LOGIN GATE ---
  if (!isAuthenticated) {
    return (
      <div className="login-gate-bg">
        <div className="glow-orb login-glow-1"></div>
        <div className="glow-orb login-glow-2"></div>
        
        <div className={`card-glass login-card ${shake ? 'shake-animation' : ''}`}>
          <div className="login-header">
            <div className="login-logo">
              <Terminal size={32} className="logo-icon" />
              <span>Berdikari<span className="text-red"> Digital Nusantara</span></span>
            </div>
            <h2>Akses Kontrol Admin</h2>
            <p>Masukkan kata sandi untuk masuk ke panel manajemen</p>
          </div>

          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="password">Kata Sandi Rahasia</label>
              <div className="password-input-wrapper">
                <span className="input-icon"><Lock size={18} /></span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ketik kata sandi manual..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Tampilkan sandi"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="error-alert">
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-full" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <RefreshCw className="animate-spin" size={18} />
                  <span>Memverifikasi...</span>
                </>
              ) : (
                <span>Masuk ke Dashboard</span>
              )}
            </button>
          </form>
          
          <a href="/index.html" className="back-link">
            <ArrowLeft size={16} /> Kembali ke Landing Page
          </a>
        </div>

        <style>{`
          .login-gate-bg {
            min-height: 100vh;
            width: 100vw;
            display: flex;
            align-items: center;
            justify-content: center;
            background: radial-gradient(circle at 50% 50%, rgba(229, 62, 62, 0.04) 0%, #0f172a 100%);
            padding: 20px;
            position: relative;
            overflow: hidden;
            font-family: var(--font-body);
          }
          .login-glow-1 {
            top: 20%;
            left: 20%;
            background: radial-gradient(circle, rgba(229, 62, 62, 0.06) 0%, rgba(255, 255, 255, 0) 60%);
          }
          .login-glow-2 {
            bottom: 20%;
            right: 20%;
            background: radial-gradient(circle, rgba(229, 62, 62, 0.05) 0%, rgba(255, 255, 255, 0) 60%);
          }
          .login-card {
            width: 100%;
            max-width: 440px;
            padding: 40px;
            text-align: center;
            border-radius: 20px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.08);
            background: rgba(15, 23, 42, 0.85);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            color: #f8fafc;
            position: relative;
            z-index: 10;
          }
          .login-logo {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-size: 1.5rem;
            font-weight: 800;
            font-family: var(--font-heading);
            color: #ffffff;
            margin-bottom: 24px;
          }
          .logo-icon {
            color: var(--primary);
          }
          .text-red {
            color: var(--primary);
          }
          .login-header h2 {
            font-size: 1.5rem;
            color: #ffffff;
            margin-bottom: 8px;
            font-weight: 700;
          }
          .login-header p {
            font-size: 0.9rem;
            color: #94a3b8;
            margin-bottom: 32px;
          }
          .login-form {
            text-align: left;
          }
          .form-group {
            margin-bottom: 20px;
          }
          .form-group label {
            display: block;
            font-size: 0.85rem;
            color: #cbd5e1;
            font-weight: 600;
            margin-bottom: 8px;
          }
          .password-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
          }
          .input-icon {
            position: absolute;
            left: 14px;
            color: #64748b;
            display: flex;
            align-items: center;
          }
          .password-input-wrapper input {
            width: 100%;
            padding: 12px 45px 12px 45px;
            background: rgba(30, 41, 59, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: #ffffff;
            font-size: 0.95rem;
            transition: all var(--transition-fast);
          }
          .password-input-wrapper input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.15);
            background: rgba(30, 41, 59, 0.8);
          }
          .toggle-password {
            position: absolute;
            right: 14px;
            background: none;
            border: none;
            color: #64748b;
            cursor: pointer;
            display: flex;
            align-items: center;
            padding: 4px;
            border-radius: 4px;
          }
          .toggle-password:hover {
            color: #cbd5e1;
          }
          .error-alert {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(239, 68, 68, 0.1);
            border: 1px solid rgba(239, 68, 68, 0.2);
            color: #fca5a5;
            padding: 10px 14px;
            border-radius: 8px;
            font-size: 0.85rem;
            margin-bottom: 20px;
          }
          .w-full {
            width: 100%;
          }
          .back-link {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            color: #94a3b8;
            text-decoration: none;
            font-size: 0.85rem;
            margin-top: 24px;
            transition: color var(--transition-fast);
          }
          .back-link:hover {
            color: #ffffff;
          }
          .animate-spin {
            animation: spin 1s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          .shake-animation {
            animation: shake 0.5s ease-in-out;
          }
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%, 60% { transform: translateX(-6px); }
            40%, 80% { transform: translateX(6px); }
          }
        `}</style>
      </div>
    );
  }

  // --- RENDERING ADMIN DASHBOARD ---
  return (
    <div className="admin-dashboard">
      {/* Toast Notifications */}
      {successMessage && (
        <div className="toast-notification success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}
      {errorMessage && (
        <div className="toast-notification error">
          <AlertCircle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Sidebar Panel */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <Terminal size={24} className="logo-icon" />
          <span>Berdikari<span className="text-red"> Digital</span></span>
          <span className="admin-badge">Admin</span>
        </div>

        <nav className="sidebar-menu">
          <button 
            className={`menu-item ${activeTab === 'landing' ? 'active' : ''}`}
            onClick={() => setActiveTab('landing')}
          >
            <LayoutGrid size={18} />
            <span>Landing Page</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'news' ? 'active' : ''}`}
            onClick={() => setActiveTab('news')}
          >
            <FileText size={18} />
            <span>Portal Berita/Kegiatan</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            <Mail size={18} />
            <span>Pesan Pelanggan</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'portfolio' ? 'active' : ''}`}
            onClick={() => setActiveTab('portfolio')}
          >
            <FolderKanban size={18} />
            <span>Manajemen Portofolio</span>
          </button>
          <button 
            className={`menu-item ${activeTab === 'finance' ? 'active' : ''}`}
            onClick={() => setActiveTab('finance')}
          >
            <Landmark size={18} />
            <span>Keuangan & Akuntansi</span>
          </button>
        </nav>

        <div className="sidebar-footer">
          <a href="/index.html" target="_blank" rel="noopener noreferrer" className="menu-item secondary-item">
            <ExternalLink size={18} />
            <span>Lihat Website</span>
          </a>
          <button onClick={handleLogout} className="menu-item logout-item">
            <LogOut size={18} />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="dashboard-main">
        {/* Top Header */}
        <header className="main-header">
          <div className="header-info">
            <h1>
              {activeTab === 'landing' && 'Manajemen Konten Landing Page'}
              {activeTab === 'news' && 'Portal Berita & Kegiatan'}
              {activeTab === 'leads' && 'Pesan Pelanggan (Leads)'}
              {activeTab === 'portfolio' && 'Manajemen Portofolio Proyek'}
              {activeTab === 'finance' && 'Sistem Keuangan & Akuntansi'}
            </h1>
            <p>
              {activeTab === 'landing' && 'Ubah konten visual dan salinan utama di halaman depan.'}
              {activeTab === 'news' && 'Tambah, edit, atau hapus artikel kegiatan perusahaan.'}
              {activeTab === 'leads' && 'Rekap data formulir kontak dan permintaan konsultasi masuk.'}
              {activeTab === 'portfolio' && 'Tambah, edit, atau hapus item portofolio proyek unggulan.'}
              {activeTab === 'finance' && 'Dashboard Arus Kas, pencatatan transaksi ledger, manajemen invoice penagihan klien, dan cetak Laporan Laba Rugi.'}
            </p>
          </div>
          {isLoading && (
            <div className="global-loader">
              <RefreshCw className="animate-spin text-red" size={20} />
              <span>Sinkronisasi...</span>
            </div>
          )}
        </header>

        {/* Tab 1: Landing Page Config */}
        {activeTab === 'landing' && (
          <div className="tab-content animate-fade-in">
            <form onSubmit={handleSaveConfig} className="card-glass content-form">
              <h2 className="card-title">Bagian Utama (Hero Section)</h2>
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label htmlFor="hero_badge">Badge Teks Atas</label>
                  <input
                    id="hero_badge"
                    type="text"
                    value={config.hero_badge}
                    onChange={(e) => setConfig({ ...config, hero_badge: e.target.value })}
                    placeholder="Contoh: Penyedia Jasa IT Terpercaya"
                    required
                  />
                </div>

                <div className="form-group col-span-2">
                  <label htmlFor="hero_title">Judul Utama Hero (Mendukung HTML tag seperti &lt;span className="gradient-text-expert font-extra"&gt;Berdikari Digital Nusantara&lt;/span&gt;)</label>
                  <input
                    id="hero_title"
                    type="text"
                    value={config.hero_title}
                    onChange={(e) => setConfig({ ...config, hero_title: e.target.value })}
                    placeholder="Ketik judul utama banner depan..."
                    required
                  />
                </div>

                <div className="form-group col-span-2">
                  <label htmlFor="hero_description">Deskripsi Penjelasan Hero</label>
                  <textarea
                    id="hero_description"
                    rows={4}
                    value={config.hero_description}
                    onChange={(e) => setConfig({ ...config, hero_description: e.target.value })}
                    placeholder="Tulis ringkasan visi/penjelasan jasa perusahaan..."
                    required
                  ></textarea>
                </div>
              </div>

              <h2 className="card-title" style={{ marginTop: '40px' }}>Bagian Ajakan Kolaborasi (CTA Section)</h2>
              <div className="form-grid">
                <div className="form-group col-span-2">
                  <label htmlFor="cta_title">Judul Banner CTA</label>
                  <input
                    id="cta_title"
                    type="text"
                    value={config.cta_title}
                    onChange={(e) => setConfig({ ...config, cta_title: e.target.value })}
                    placeholder="Contoh: Siap Memulai Transformasi Digital?"
                    required
                  />
                </div>

                <div className="form-group col-span-2">
                  <label htmlFor="cta_description">Deskripsi Penawaran CTA</label>
                  <textarea
                    id="cta_description"
                    rows={3}
                    value={config.cta_description}
                    onChange={(e) => setConfig({ ...config, cta_description: e.target.value })}
                    placeholder="Detail ajakan untuk berkonsultasi secara gratis..."
                    required
                  ></textarea>
                </div>
              </div>

              <div className="form-actions-bar">
                <button type="button" onClick={fetchConfig} className="btn btn-secondary" disabled={isLoading}>
                  Reset Nilai
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <RefreshCw className="animate-spin" size={16} />
                      <span>Menyimpan...</span>
                    </>
                  ) : (
                    <span>Simpan Perubahan</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Activities/News CRUD */}
        {activeTab === 'news' && (
          <div className="tab-content animate-fade-in">
            <div className="actions-header">
              <div className="search-stat">
                Total data: <strong>{activities.length}</strong> artikel terbit.
              </div>
              <button onClick={openAddActivity} className="btn btn-primary">
                <Plus size={18} /> Tambah Kegiatan
              </button>
            </div>

            {/* List / Table grid */}
            <div className="card-glass p-0 overflow-hidden">
              {activities.length === 0 ? (
                <div className="empty-state">
                  <FileText size={48} className="text-muted" />
                  <h3>Belum Ada Data Kegiatan</h3>
                  <p>Klik tombol 'Tambah Kegiatan' untuk menerbitkan kegiatan perdana Anda.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Gambar</th>
                        <th>Judul Kegiatan</th>
                        <th>Kategori</th>
                        <th>Tanggal</th>
                        <th>Deskripsi Ringkas</th>
                        <th style={{ textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activities.map((act) => (
                        <tr key={act.id}>
                          <td style={{ width: '80px' }}>
                            <div className="table-img-box">
                              <img src={act.image_url} alt={act.title} />
                            </div>
                          </td>
                          <td style={{ fontWeight: '600', color: 'var(--text-primary)', maxWidth: '240px' }}>
                            {act.title}
                          </td>
                          <td>
                            <span className={`badge badge-${getBadgeClass(act.category)}`}>
                              {act.category}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                            {new Date(act.date).toLocaleDateString('id-ID', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </td>
                          <td className="table-desc" style={{ maxWidth: '300px' }}>
                            {act.short_desc}
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div className="table-actions">
                              <button 
                                onClick={() => openEditActivity(act)}
                                className="action-btn edit-btn"
                                title="Edit"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeleteActivity(act.id, act.title)}
                                className="action-btn delete-btn"
                                title="Hapus"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Contact Submissions / Leads */}
        {activeTab === 'leads' && (
          <div className="tab-content animate-fade-in">
            <div className="actions-header">
              <div className="search-stat">
                Total pesan: <strong>{submissions.length}</strong> permintaan masuk.
              </div>
              <button onClick={fetchSubmissions} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.9rem' }}>
                <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} /> Perbarui Data
              </button>
            </div>

            <div className="card-glass p-0 overflow-hidden">
              {submissions.length === 0 ? (
                <div className="empty-state">
                  <Mail size={48} className="text-muted" />
                  <h3>Belum Ada Pesan Masuk</h3>
                  <p>Seluruh formulir kontak yang diisi oleh klien di landing page akan terkumpul di sini.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Tanggal Masuk</th>
                        <th>Nama Pelanggan</th>
                        <th>Perusahaan</th>
                        <th>WhatsApp &amp; Email</th>
                        <th>Layanan yang Diminta</th>
                        <th>Detail Pesan</th>
                        <th style={{ textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map((sub) => {
                        // Create standard country code WhatsApp link (replace 08xxx with 628xxx)
                        const rawPhone = sub.phone.replace(/[^0-9+]/g, '');
                        const waPhone = rawPhone.replace(/^0/, '62').replace(/^\+/, '');
                        const waUrl = `https://wa.me/${waPhone}?text=Halo%20${encodeURIComponent(sub.name)},%20kami%20dari%20Berdikari%20Digital%20Nusantara%20ingin%20menindaklanjuti%20pesan%20Anda%20mengenai%20${encodeURIComponent(sub.service)}...`;

                        return (
                          <tr key={sub.id}>
                            <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                              {new Date(sub.created_at).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td style={{ fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                              {sub.name}
                            </td>
                            <td style={{ fontStyle: sub.company ? 'normal' : 'italic', color: sub.company ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                              {sub.company || 'Pribadi'}
                            </td>
                            <td>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{sub.email}</span>
                                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-primary)' }}>{sub.phone}</span>
                              </div>
                            </td>
                            <td>
                              <span className="badge badge-berita" style={{ backgroundColor: 'rgba(229, 62, 62, 0.05)', color: 'var(--primary)' }}>
                                 {sub.service === 'web' && 'Website & Web App'}
                                 {sub.service === 'mobile' && 'Mobile App'}
                                 {sub.service === 'uiux' && 'UI/UX Design'}
                                 {sub.service === 'ai_automation' && 'AI Otomatisasi'}
                                 {sub.service === 'digital_product' && 'Produk Digital'}
                                 {!['web', 'mobile', 'uiux', 'ai_automation', 'digital_product'].includes(sub.service) && sub.service}
                              </span>
                            </td>
                            <td style={{ minWidth: '220px', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                              {sub.message}
                            </td>
                            <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                              <div className="table-actions">
                                <a 
                                  href={waUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="action-btn edit-btn"
                                  style={{ borderColor: '#25D366', color: '#25D366', backgroundColor: 'rgba(37, 211, 102, 0.02)' }}
                                  title="Hubungi via WhatsApp"
                                >
                                  <Phone size={16} />
                                </a>
                                <button 
                                  onClick={() => handleDeleteSubmission(sub.id, sub.name)}
                                  className="action-btn delete-btn"
                                  title="Hapus Pesan"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Portfolio CRUD */}
        {activeTab === 'portfolio' && (
          <div className="tab-content animate-fade-in">
            <div className="actions-header">
              <div className="search-stat">
                Total portofolio: <strong>{portfolios.length}</strong> proyek unggulan.
              </div>
              <button onClick={openAddPortfolio} className="btn btn-primary">
                <Plus size={18} /> Tambah Portofolio
              </button>
            </div>

            <div className="card-glass p-0 overflow-hidden">
              {portfolios.length === 0 ? (
                <div className="empty-state">
                  <FolderKanban size={48} className="text-muted" />
                  <h3>Belum Ada Data Portofolio</h3>
                  <p>Klik tombol 'Tambah Portofolio' untuk menerbitkan portofolio proyek perdana Anda.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Gambar</th>
                        <th>Judul Proyek</th>
                        <th>Slug URL</th>
                        <th>Kategori</th>
                        <th>Klien</th>
                        <th>Tahun</th>
                        <th>Tags</th>
                        <th style={{ textAlign: 'right' }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {portfolios.map((port) => (
                        <tr key={port.id}>
                          <td style={{ width: '80px' }}>
                            <div className="table-img-box">
                              <img src={port.image_url} alt={port.title} />
                            </div>
                          </td>
                          <td style={{ fontWeight: '700', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                            {port.title}
                          </td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                            {port.slug}
                          </td>
                          <td>
                            <span className="badge badge-berita" style={{ backgroundColor: 'rgba(59, 130, 246, 0.05)', color: '#3b82f6' }}>
                              {port.category === 'web' && 'Web Dev'}
                              {port.category === 'mobile' && 'Mobile App'}
                              {port.category === 'uiux' && 'UI/UX'}
                              {!['web', 'mobile', 'uiux'].includes(port.category) && port.category}
                            </span>
                          </td>
                          <td style={{ fontSize: '0.9rem' }}>{port.client}</td>
                          <td style={{ fontSize: '0.9rem' }}>{port.year}</td>
                          <td style={{ maxWidth: '200px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                            {port.tags ? port.tags.join(', ') : ''}
                          </td>
                          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                            <div className="table-actions">
                              <button 
                                onClick={() => openEditPortfolio(port)}
                                className="action-btn edit-btn"
                                title="Edit Portofolio"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button 
                                onClick={() => handleDeletePortfolio(port.id, port.title)}
                                className="action-btn delete-btn"
                                title="Hapus Portofolio"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
        {/* Tab 5: Finance & Accounting */}
        {activeTab === 'finance' && (
          <div className="tab-content animate-fade-in">
            {/* Sub-tab Navigation */}
            <div className="finance-nav-tabs" style={{ display: 'flex', gap: '10px', marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              <button 
                type="button"
                className={`btn ${activeFinanceSubTab === 'summary' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '100px', padding: '8px 20px', fontSize: '0.85rem' }}
                onClick={() => setActiveFinanceSubTab('summary')}
              >
                <TrendingUp size={14} style={{ marginRight: '6px' }} /> Ringkasan Finansial
              </button>
              <button 
                type="button"
                className={`btn ${activeFinanceSubTab === 'transactions' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '100px', padding: '8px 20px', fontSize: '0.85rem' }}
                onClick={() => setActiveFinanceSubTab('transactions')}
              >
                <DollarSign size={14} style={{ marginRight: '6px' }} /> Buku Kas & Transaksi
              </button>
              <button 
                type="button"
                className={`btn ${activeFinanceSubTab === 'invoices' ? 'btn-primary' : 'btn-secondary'}`}
                style={{ borderRadius: '100px', padding: '8px 20px', fontSize: '0.85rem' }}
                onClick={() => setActiveFinanceSubTab('invoices')}
              >
                <CreditCard size={14} style={{ marginRight: '6px' }} /> Invoice Penagihan
              </button>
            </div>

            {/* Sub-tab 1: Summary */}
            {activeFinanceSubTab === 'summary' && (
              <div className="finance-summary-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* KPI Cards Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  <div className="card-glass" style={{ padding: '24px', borderLeft: '4px solid #25D366' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Pendapatan (Income)</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#25D366' }}>{formatRupiah(financeSummary.total_income)}</div>
                  </div>
                  <div className="card-glass" style={{ padding: '24px', borderLeft: '4px solid var(--primary)' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Total Pengeluaran (Expense)</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>{formatRupiah(financeSummary.total_expense)}</div>
                  </div>
                  <div className="card-glass" style={{ padding: '24px', borderLeft: '4px solid #3182ce' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '8px' }}>Laba Bersih (Net Profit)</div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: financeSummary.net_profit >= 0 ? '#3182ce' : 'var(--primary)' }}>
                      {formatRupiah(financeSummary.net_profit)}
                    </div>
                  </div>
                </div>

                {/* Cash Flow Chart & Category Breakdown */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.75fr', gap: '24px' }}>
                  {/* SVG Chart Card */}
                  <div className="card-glass" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>Tren Arus Kas (Income vs Expense)</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', height: '240px', paddingBottom: '20px', borderBottom: '2px solid var(--border)', gap: '40px' }}>
                      {/* Bar 1: Income */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40px', background: 'linear-gradient(180deg, #25D366 0%, #128C7E 100%)', height: `${Math.min(180, (financeSummary.total_income / Math.max(1, financeSummary.total_income + financeSummary.total_expense)) * 180)}px`, borderRadius: '6px 6px 0 0', boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)', transition: 'height 0.5s ease' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 750, color: 'var(--text-secondary)' }}>Masuk</span>
                      </div>
                      {/* Bar 2: Expense */}
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{ width: '40px', background: 'linear-gradient(180deg, var(--primary) 0%, #c53030 100%)', height: `${Math.min(180, (financeSummary.total_expense / Math.max(1, financeSummary.total_income + financeSummary.total_expense)) * 180)}px`, borderRadius: '6px 6px 0 0', boxShadow: '0 4px 10px rgba(229, 62, 62, 0.2)', transition: 'height 0.5s ease' }}></div>
                        <span style={{ fontSize: '0.75rem', fontWeight: 750, color: 'var(--text-secondary)' }}>Keluar</span>
                      </div>
                    </div>
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>* Perhitungan akumulasi riil seluruh transaksi ledger.</span>
                      <button onClick={() => setShowProfitLossModal(true)} className="btn btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', padding: '6px 14px' }}>
                        <Printer size={14} /> Cetak Laporan Keuangan
                      </button>
                    </div>
                  </div>

                  {/* Category Breakdown Card */}
                  <div className="card-glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Rincian Kategori Ledger</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '220px', overflowY: 'auto' }}>
                      {Object.entries(financeSummary.category_breakdown || {}).length === 0 ? (
                        <div style={{ padding: '20px', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>Belum ada data ledger.</div>
                      ) : (
                        Object.entries(financeSummary.category_breakdown).map(([cat, val]: any) => (
                          <div key={cat} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px solid var(--border)' }}>
                            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 550 }}>{cat}</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: 750, color: 'var(--text-primary)' }}>{formatRupiah(val)}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-tab 2: Transactions Table */}
            {activeFinanceSubTab === 'transactions' && (
              <div className="transactions-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="actions-header" style={{ margin: 0 }}>
                  <div className="search-stat">Total Ledger: <strong>{transactions.length}</strong> transaksi terdaftar.</div>
                  <button onClick={openAddTx} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Tambah Transaksi
                  </button>
                </div>

                <div className="card-glass p-0 overflow-hidden">
                  {transactions.length === 0 ? (
                    <div className="empty-state" style={{ padding: '48px' }}>
                      <DollarSign size={48} className="text-muted" />
                      <p style={{ marginTop: '16px' }}>Belum ada transaksi ledger tercatat.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Tanggal</th>
                            <th>Tipe</th>
                            <th>Kategori</th>
                            <th>Jumlah (Amount)</th>
                            <th>Deskripsi</th>
                            <th style={{ textAlign: 'right' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactions.map((tx) => (
                            <tr key={tx.id}>
                              <td style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                                {new Date(tx.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                              </td>
                              <td>
                                <span className={`badge ${tx.type === 'income' ? 'badge-success' : 'badge-danger'}`} style={{ backgroundColor: tx.type === 'income' ? 'rgba(37, 211, 102, 0.1)' : 'rgba(229, 62, 62, 0.1)', color: tx.type === 'income' ? '#128C7E' : 'var(--primary)', fontWeight: 700, padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem' }}>
                                  {tx.type === 'income' ? 'MASUK' : 'KELUAR'}
                                </span>
                              </td>
                              <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{tx.category}</td>
                              <td style={{ fontWeight: 800, color: tx.type === 'income' ? '#128C7E' : 'var(--text-primary)' }}>
                                {tx.type === 'income' ? '+' : '-'} {formatRupiah(tx.amount)}
                              </td>
                              <td className="table-desc" style={{ maxWidth: '300px' }}>{tx.description}</td>
                              <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                <div className="table-actions">
                                  <button onClick={() => openEditTx(tx)} className="action-btn edit-btn" title="Edit Transaksi"><Edit3 size={16} /></button>
                                  <button onClick={() => handleDeleteTx(tx.id)} className="action-btn delete-btn" title="Hapus Transaksi"><Trash2 size={16} /></button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Sub-tab 3: Invoices Table */}
            {activeFinanceSubTab === 'invoices' && (
              <div className="invoices-view" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="actions-header" style={{ margin: 0 }}>
                  <div className="search-stat">Total Invoice: <strong>{invoices.length}</strong> invoice penagihan.</div>
                  <button onClick={openAddInvoice} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={16} /> Buat Invoice Baru
                  </button>
                </div>

                <div className="card-glass p-0 overflow-hidden">
                  {invoices.length === 0 ? (
                    <div className="empty-state" style={{ padding: '48px' }}>
                      <CreditCard size={48} className="text-muted" />
                      <p style={{ marginTop: '16px' }}>Belum ada invoice penagihan tercatat.</p>
                    </div>
                  ) : (
                    <div className="table-responsive">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>No Invoice</th>
                            <th>Klien</th>
                            <th>Proyek</th>
                            <th>Jumlah</th>
                            <th>Status</th>
                            <th>Jatuh Tempo</th>
                            <th style={{ textAlign: 'right' }}>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoices.map((inv) => {
                            const waText = `Halo ${inv.client_name},\nKami mengirimkan tagihan untuk proyek "${inv.project_name}".\n\nNo Invoice: ${inv.invoice_number}\nJumlah: ${formatRupiah(inv.amount)}\nJatuh Tempo: ${new Date(inv.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}\nStatus: ${inv.status.toUpperCase()}.\n\nMohon pembayaran dapat ditransfer. Terima kasih.`;
                            const waUrl = `https://wa.me/${inv.client_email.includes('@') ? '' : inv.client_email}?text=${encodeURIComponent(waText)}`;
                            return (
                              <tr key={inv.id}>
                                <td style={{ fontWeight: '750', color: 'var(--text-primary)', fontFamily: 'monospace' }}>{inv.invoice_number}</td>
                                <td>
                                  <div style={{ fontWeight: '600' }}>{inv.client_name}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{inv.client_email}</div>
                                </td>
                                <td style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{inv.project_name}</td>
                                <td style={{ fontWeight: 800 }}>{formatRupiah(inv.amount)}</td>
                                <td>
                                  <span className={`badge`} style={{ 
                                    backgroundColor: inv.status === 'paid' ? 'rgba(37, 211, 102, 0.1)' : inv.status === 'pending' ? 'rgba(237, 137, 54, 0.1)' : 'rgba(229, 62, 62, 0.1)', 
                                    color: inv.status === 'paid' ? '#128C7E' : inv.status === 'pending' ? '#c05621' : 'var(--primary)',
                                    fontWeight: 700, padding: '4px 10px', borderRadius: '100px', fontSize: '0.75rem' 
                                  }}>
                                    {inv.status === 'paid' ? 'LUNAS' : inv.status === 'pending' ? 'PENDING' : 'BATAL'}
                                  </span>
                                </td>
                                <td style={{ fontSize: '0.85rem' }}>
                                  {new Date(inv.due_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'short', day: 'numeric' })}
                                </td>
                                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                                  <div className="table-actions">
                                    <button onClick={() => setShowInvoicePrintModal(inv)} className="action-btn edit-btn" style={{ borderColor: '#3182ce', color: '#3182ce', backgroundColor: 'rgba(49, 130, 206, 0.02)' }} title="Pratinjau & Cetak Invoice"><Printer size={16} /></button>
                                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="action-btn edit-btn" style={{ borderColor: '#25D366', color: '#25D366', backgroundColor: 'rgba(37, 211, 102, 0.02)' }} title="Kirim Penagihan WA"><Phone size={16} /></a>
                                    <button onClick={() => openEditInvoice(inv)} className="action-btn edit-btn" title="Edit Invoice"><Edit3 size={16} /></button>
                                    <button onClick={() => handleDeleteInvoice(inv.id)} className="action-btn delete-btn" title="Hapus Invoice"><Trash2 size={16} /></button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* --- ADD / EDIT FORM MODAL SLIDE OVER --- */}
      {showFormModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass animate-slide-in-right">
            <div className="modal-header">
              <h3>{currentActivity ? 'Edit Artikel Kegiatan' : 'Tambah Kegiatan Baru'}</h3>
              <button onClick={() => setShowFormModal(false)} className="close-modal-btn">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSaveActivity} className="modal-form-body">
              <div className="form-group">
                <label htmlFor="form_title">Judul Kegiatan</label>
                <input
                  id="form_title"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Ketik judul kegiatan yang menarik..."
                  required
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="form_category">Kategori</label>
                  <select
                    id="form_category"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Rilis">Rilis</option>
                    <option value="Pengumuman">Pengumuman</option>
                    <option value="Berita">Berita</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="form_date">Tanggal Publikasi</label>
                  <input
                    id="form_date"
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="form_short_desc">Ringkasan Kegiatan (Tampil di kartu depan)</label>
                <input
                  id="form_short_desc"
                  type="text"
                  value={formShortDesc}
                  onChange={(e) => setFormShortDesc(e.target.value)}
                  placeholder="Ketik 1-2 kalimat ringkasan penjelasan..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="form_image_select">Pilih Ilustrasi Gambar</label>
                <div className="image-mode-tabs">
                  <button 
                    type="button" 
                    className={`mode-tab-btn ${!useCustomImage ? 'active' : ''}`}
                    onClick={() => setUseCustomImage(false)}
                  >
                    Preset Premium
                  </button>
                  <button 
                    type="button" 
                    className={`mode-tab-btn ${useCustomImage ? 'active' : ''}`}
                    onClick={() => setUseCustomImage(true)}
                  >
                    Ketik URL Custom
                  </button>
                </div>

                {!useCustomImage ? (
                  <select
                    id="form_image_select"
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                  >
                    {PRESET_IMAGES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="form_image_custom"
                    type="text"
                    value={customImage}
                    onChange={(e) => setCustomImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required={useCustomImage}
                  />
                )}
              </div>

              <div className="form-group flex-1">
                <label htmlFor="form_content">Konten Lengkap Detail Kegiatan (Isi Berita)</label>
                <textarea
                  id="form_content"
                  rows={8}
                  style={{ minHeight: '180px', resize: 'vertical' }}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Tulis paragraf lengkap tentang apa kegiatan ini, siapa yang terlibat, dan apa hasil/tujuannya..."
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowFormModal(false)} 
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Menyimpan...' : 'Simpan Artikel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- PORTFOLIO ADD / EDIT FORM MODAL --- */}
      {showPortfolioModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass animate-slide-in-right" style={{ maxWidth: '680px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <div className="modal-header">
              <h3>{currentPortfolio ? 'Edit Portofolio Proyek' : 'Tambah Portofolio Baru'}</h3>
              <button onClick={() => setShowPortfolioModal(false)} className="close-modal-btn">
                &times;
              </button>
            </div>
            
            <form onSubmit={handleSavePortfolio} className="modal-form-body" style={{ flexGrow: 1, overflowY: 'auto' }}>
              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="p_title">Nama/Judul Proyek</label>
                  <input
                    id="p_title"
                    type="text"
                    value={pTitle}
                    onChange={(e) => setPTitle(e.target.value)}
                    placeholder="Contoh: Aethera Enterprise ERP..."
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="p_slug">Slug URL (Unik, huruf kecil & minus)</label>
                  <input
                    id="p_slug"
                    type="text"
                    value={pSlug}
                    onChange={(e) => setPSlug(e.target.value)}
                    placeholder="Contoh: aethera-erp"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="p_category">Kategori Proyek</label>
                  <select
                    id="p_category"
                    value={pCategory}
                    onChange={(e) => setPCategory(e.target.value)}
                  >
                    <option value="web">Website &amp; Web App</option>
                    <option value="mobile">Mobile Application</option>
                    <option value="uiux">UI/UX Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="p_year">Tahun Proyek</label>
                  <input
                    id="p_year"
                    type="text"
                    value={pYear}
                    onChange={(e) => setPYear(e.target.value)}
                    placeholder="Contoh: 2026"
                    required
                  />
                </div>
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label htmlFor="p_client">Nama Klien / Perusahaan</label>
                  <input
                    id="p_client"
                    type="text"
                    value={pClient}
                    onChange={(e) => setPClient(e.target.value)}
                    placeholder="Contoh: PT Semesta Manufaktur"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="p_tags">Tags / Teknologi (Pisahkan dengan koma)</label>
                  <input
                    id="p_tags"
                    type="text"
                    value={pTags}
                    onChange={(e) => setPTags(e.target.value)}
                    placeholder="Contoh: React, NestJS, PostgreSQL"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="p_short_desc">Deskripsi Singkat (Tampil di kartu depan)</label>
                <input
                  id="p_short_desc"
                  type="text"
                  value={pShortDesc}
                  onChange={(e) => setPShortDesc(e.target.value)}
                  placeholder="Ketik 1 kalimat ringkasan tentang proyek..."
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="p_image_select">Pilih Ilustrasi Gambar</label>
                <div className="image-mode-tabs">
                  <button 
                    type="button" 
                    className={`mode-tab-btn ${!pUseCustomImage ? 'active' : ''}`}
                    onClick={() => setPUseCustomImage(false)}
                  >
                    Preset Premium
                  </button>
                  <button 
                    type="button" 
                    className={`mode-tab-btn ${pUseCustomImage ? 'active' : ''}`}
                    onClick={() => setPUseCustomImage(true)}
                  >
                    Ketik URL Custom
                  </button>
                </div>

                {!pUseCustomImage ? (
                  <select
                    id="p_image_select"
                    value={pImage}
                    onChange={(e) => setPImage(e.target.value)}
                  >
                    {PRESET_IMAGES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="p_image_custom"
                    type="text"
                    value={pCustomImage}
                    onChange={(e) => setPCustomImage(e.target.value)}
                    placeholder="https://images.unsplash.com/photo-..."
                    required={pUseCustomImage}
                  />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="p_challenge">Tantangan Proyek (Challenge)</label>
                <textarea
                  id="p_challenge"
                  rows={3}
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  value={pChallenge}
                  onChange={(e) => setPChallenge(e.target.value)}
                  placeholder="Apa tantangan utama yang dihadapi klien?..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="p_solution">Solusi Kami (Solution)</label>
                <textarea
                  id="p_solution"
                  rows={3}
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  value={pSolution}
                  onChange={(e) => setPSolution(e.target.value)}
                  placeholder="Bagaimana solusi IT yang kami rancang dan bangun?..."
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label htmlFor="p_results">Dampak Bisnis / Hasil Nyata (Results)</label>
                <textarea
                  id="p_results"
                  rows={3}
                  style={{ minHeight: '80px', resize: 'vertical' }}
                  value={pResults}
                  onChange={(e) => setPResults(e.target.value)}
                  placeholder="Apa hasil terukur yang didapatkan klien?..."
                  required
                ></textarea>
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  onClick={() => setShowPortfolioModal(false)} 
                  className="btn btn-secondary"
                  disabled={isLoading}
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? 'Menyimpan...' : 'Simpan Portofolio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- TRANSACTION ADD / EDIT MODAL --- */}
      {showTxModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass animate-slide-in-right" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>{currentTx ? 'Edit Transaksi Ledger' : 'Tambah Transaksi Baru'}</h3>
              <button onClick={() => setShowTxModal(false)} className="close-modal-btn">&times;</button>
            </div>
            <form onSubmit={handleSaveTx} className="modal-form-body">
              <div className="form-group">
                <label>Tanggal Transaksi</label>
                <input 
                  type="date" 
                  value={txDate} 
                  onChange={(e) => setTxDate(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Tipe Aliran</label>
                  <select value={txType} onChange={(e: any) => setTxType(e.target.value)} required>
                    <option value="income">Income (Masuk)</option>
                    <option value="expense">Expense (Keluar)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Kategori</label>
                  {txType === 'income' ? (
                    <select value={txCategory} onChange={(e) => setTxCategory(e.target.value)} required>
                      <option value="Proyek Web">Proyek Web</option>
                      <option value="Proyek Mobile">Proyek Mobile</option>
                      <option value="AI Otomatisasi">AI Otomatisasi</option>
                      <option value="Produk Digital: Undangan">Produk Digital: Undangan</option>
                      <option value="Produk Digital: E-Book">Produk Digital: E-Book</option>
                      <option value="Produk Digital: Langganan">Produk Digital: Langganan</option>
                    </select>
                  ) : (
                    <select value={txCategory} onChange={(e) => setTxCategory(e.target.value)} required>
                      <option value="Gaji Karyawan">Gaji Karyawan</option>
                      <option value="Sewa Server">Sewa Server</option>
                      <option value="Pemasaran">Pemasaran</option>
                      <option value="Operasional Kantor">Operasional Kantor</option>
                    </select>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label>Jumlah Uang (Rupiah)</label>
                <input 
                  type="number" 
                  value={txAmount} 
                  onChange={(e) => setTxAmount(e.target.value)} 
                  placeholder="Contoh: 5000000" 
                  required 
                />
              </div>
              <div className="form-group">
                <label>Deskripsi / Keterangan</label>
                <input 
                  type="text" 
                  value={txDescription} 
                  onChange={(e) => setTxDescription(e.target.value)} 
                  placeholder="Keterangan singkat..." 
                  required 
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowTxModal(false)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">{isLoading ? 'Menyimpan...' : 'Simpan Transaksi'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- INVOICE ADD / EDIT MODAL --- */}
      {showInvModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass animate-slide-in-right" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <h3>{currentInv ? 'Edit Invoice Penagihan' : 'Buat Invoice Baru'}</h3>
              <button onClick={() => setShowInvModal(false)} className="close-modal-btn">&times;</button>
            </div>
            <form onSubmit={handleSaveInvoice} className="modal-form-body">
              <div className="form-row-2">
                <div className="form-group">
                  <label>Nomor Invoice</label>
                  <input 
                    type="text" 
                    value={invNumber} 
                    onChange={(e) => setInvNumber(e.target.value)} 
                    placeholder="INV-2026-001" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Tanggal Jatuh Tempo</label>
                  <input 
                    type="date" 
                    value={invDueDate} 
                    onChange={(e) => setInvDueDate(e.target.value)} 
                    required 
                  />
                </div>
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Nama Klien</label>
                  <input 
                    type="text" 
                    value={invClientName} 
                    onChange={(e) => setInvClientName(e.target.value)} 
                    placeholder="Budi Santoso" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Email / WA Klien</label>
                  <input 
                    type="text" 
                    value={invClientEmail} 
                    onChange={(e) => setInvClientEmail(e.target.value)} 
                    placeholder="client@mail.com atau 62812..." 
                    required 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Nama Proyek / Layanan</label>
                <input 
                  type="text" 
                  value={invProjectName} 
                  onChange={(e) => setInvProjectName(e.target.value)} 
                  placeholder="Website E-Commerce Retail..." 
                  required 
                />
              </div>
              <div className="form-row-2">
                <div className="form-group">
                  <label>Nilai Tagihan (IDR)</label>
                  <input 
                    type="number" 
                    value={invAmount} 
                    onChange={(e) => setInvAmount(e.target.value)} 
                    placeholder="12000000" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label>Status Tagihan</label>
                  <select value={invStatus} onChange={(e: any) => setInvStatus(e.target.value)}>
                    <option value="pending">Pending (Belum Bayar)</option>
                    <option value="paid">Paid (Lunas)</option>
                    <option value="cancelled">Cancelled (Batal)</option>
                  </select>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowInvModal(false)} className="btn btn-secondary">Batal</button>
                <button type="submit" className="btn btn-primary">{isLoading ? 'Menyimpan...' : 'Simpan Invoice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- LAPORAN LABA RUGI PRINT MODAL --- */}
      {showProfitLossModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass print-area" style={{ maxWidth: '720px', padding: '40px', background: '#ffffff', color: '#000000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000', paddingBottom: '16px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>BERDIKARI DIGITAL NUSANTARA</h2>
                <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>Portal Dashboard Akuntansi & Keuangan Perusahaan</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>LAPORAN LABA RUGI</h3>
                <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>Periode berjalan s/d Juli 2026</p>
              </div>
            </div>

            <div className="print-body" style={{ textAlign: 'left' }}>
              {/* Income Section */}
              <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '6px', fontWeight: 700 }}>1. PENDAPATAN OPERASIONAL</h4>
              <table style={{ width: '100%', marginBottom: '24px', fontSize: '0.9rem' }}>
                <tbody>
                  {Object.entries(financeSummary.category_breakdown || {}).filter(([cat]: any) => ['Proyek Web', 'Proyek Mobile', 'AI Otomatisasi', 'Produk Digital: Undangan', 'Produk Digital: E-Book', 'Produk Digital: Langganan'].includes(cat)).map(([cat, val]: any) => (
                    <tr key={cat}>
                      <td style={{ padding: '4px 0' }}>Pendapatan - {cat}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatRupiah(val)}</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '1px double #000', fontWeight: 800 }}>
                    <td style={{ padding: '8px 0' }}>TOTAL PENDAPATAN KOTOR</td>
                    <td style={{ textAlign: 'right' }}>{formatRupiah(financeSummary.total_income)}</td>
                  </tr>
                </tbody>
              </table>

              {/* Expense Section */}
              <h4 style={{ borderBottom: '1px solid #ddd', paddingBottom: '6px', fontWeight: 700 }}>2. BEBAN & PENGELUARAN OPERASIONAL</h4>
              <table style={{ width: '100%', marginBottom: '24px', fontSize: '0.9rem' }}>
                <tbody>
                  {Object.entries(financeSummary.category_breakdown || {}).filter(([cat]: any) => ['Gaji Karyawan', 'Sewa Server', 'Pemasaran', 'Operasional Kantor'].includes(cat)).map(([cat, val]: any) => (
                    <tr key={cat}>
                      <td style={{ padding: '4px 0' }}>Beban - {cat}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>({formatRupiah(val)})</td>
                    </tr>
                  ))}
                  <tr style={{ borderTop: '1px double #000', fontWeight: 800 }}>
                    <td style={{ padding: '8px 0' }}>TOTAL BEBAN PENGELUARAN</td>
                    <td style={{ textAlign: 'right' }}>({formatRupiah(financeSummary.total_expense)})</td>
                  </tr>
                </tbody>
              </table>

              {/* Profit Section */}
              <div style={{ border: '2px solid #000', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 800, fontSize: '1.1rem', background: '#f8fafc' }}>
                <span>LABA BERSIH (NET PROFIT)</span>
                <span>{formatRupiah(financeSummary.net_profit)}</span>
              </div>
            </div>

            <div className="modal-actions no-print" style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={() => window.print()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={16} /> Cetak Laporan</button>
              <button type="button" onClick={() => setShowProfitLossModal(false)} className="btn btn-secondary">Tutup</button>
            </div>
          </div>
        </div>
      )}

      {/* --- INVOICE PRINT / PREVIEW MODAL --- */}
      {showInvoicePrintModal && (
        <div className="modal-overlay">
          <div className="modal-container card-glass print-area" style={{ maxWidth: '680px', padding: '40px', background: '#ffffff', color: '#000000' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #eee', paddingBottom: '24px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'left' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 850, margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>BERDIKARI DIGITAL NUSANTARA</h2>
                <p style={{ fontSize: '0.8rem', color: '#555', margin: 0 }}>Jakarta, Indonesia | info@berdikari.com</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  border: '2px solid',
                  borderColor: showInvoicePrintModal.status === 'paid' ? '#25D366' : showInvoicePrintModal.status === 'pending' ? '#ed8936' : '#e53e3e',
                  color: showInvoicePrintModal.status === 'paid' ? '#25D366' : showInvoicePrintModal.status === 'pending' ? '#ed8936' : '#e53e3e',
                  padding: '4px 14px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  fontWeight: 900,
                  textTransform: 'uppercase',
                  display: 'inline-block',
                  marginBottom: '12px'
                }}>
                  {showInvoicePrintModal.status === 'paid' ? 'Lunas / Paid' : showInvoicePrintModal.status === 'pending' ? 'Pending' : 'Batal'}
                </span>
                <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '0.95rem' }}>{showInvoicePrintModal.invoice_number}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '32px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div>
                <strong style={{ color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Ditagihkan Kepada:</strong>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{showInvoicePrintModal.client_name}</div>
                <div>{showInvoicePrintModal.client_email}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong style={{ color: '#555', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>Tanggal Jatuh Tempo:</strong>
                <div style={{ fontWeight: 700 }}>
                  {new Date(showInvoicePrintModal.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </div>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ddd', fontWeight: 700 }}>
                  <th style={{ padding: '8px 0' }}>Deskripsi Layanan / Proyek</th>
                  <th style={{ textAlign: 'right', padding: '8px 0' }}>Total Investasi</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 0' }}>
                    <div style={{ fontWeight: 700 }}>{showInvoicePrintModal.project_name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#666', marginTop: '4px' }}>Pengembangan & Integrasi sistem kustom Berdikari Digital Nusantara</div>
                  </td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{formatRupiah(showInvoicePrintModal.amount)}</td>
                </tr>
                <tr style={{ fontWeight: 800, fontSize: '1.05rem', borderTop: '2px solid #000' }}>
                  <td style={{ padding: '16px 0' }}>TOTAL PEMBAYARAN</td>
                  <td style={{ textAlign: 'right', padding: '16px 0' }}>{formatRupiah(showInvoicePrintModal.amount)}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ textAlign: 'left', borderTop: '1px solid #eee', paddingTop: '20px', fontSize: '0.8rem', color: '#555' }}>
              <strong>Instruksi Pembayaran Bank Transfer:</strong>
              <div style={{ marginTop: '6px' }}>Bank Mandiri: 123-000-456789-0 a.n. Berdikari Digital Nusantara</div>
              <div>Bank BCA: 888-999-5555 a.n. Berdikari Digital Nusantara</div>
            </div>

            <div className="modal-actions no-print" style={{ marginTop: '30px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" onClick={() => window.print()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Printer size={16} /> Cetak Invoice</button>
              <button type="button" onClick={() => setShowInvoicePrintModal(null)} className="btn btn-secondary">Tutup</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-area, .print-area * {
            visibility: visible;
          }
          .print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            box-shadow: none !important;
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
        }

        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          width: 100vw;
          background-color: var(--bg-deep);
          color: var(--text-primary);
          font-family: var(--font-body);
        }

        /* Sidebar Layout */
        .dashboard-sidebar {
          width: 280px;
          background: #ffffff;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          padding: 30px 20px;
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          z-index: 100;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.35rem;
          margin-bottom: 40px;
        }

        .admin-badge {
          font-size: 0.7rem;
          font-weight: 700;
          background: var(--primary-glow-intense);
          color: var(--primary);
          padding: 2px 8px;
          border-radius: 100px;
          margin-left: 4px;
          text-transform: uppercase;
        }

        .sidebar-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex-grow: 1;
        }

        .menu-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 10px;
          border: none;
          background: none;
          color: var(--text-secondary);
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all var(--transition-fast);
          text-align: left;
          text-decoration: none;
        }

        .menu-item:hover, .menu-item.active {
          background: var(--primary-glow-intense);
          color: var(--primary);
        }

        .sidebar-footer {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid rgba(15, 23, 42, 0.06);
          padding-top: 20px;
        }

        .secondary-item {
          font-size: 0.85rem;
          padding: 10px 16px;
        }

        .logout-item {
          color: #ef4444;
        }
        .logout-item:hover {
          background: rgba(239, 68, 68, 0.05);
          color: #ef4444;
        }

        /* Main Content Layout */
        .dashboard-main {
          margin-left: 280px;
          flex-grow: 1;
          padding: 40px;
          min-height: 100vh;
        }

        .main-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 36px;
          border-bottom: 1px solid var(--border);
          padding-bottom: 24px;
        }

        .header-info h1 {
          font-size: 1.85rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          margin-bottom: 6px;
        }

        .header-info p {
          color: var(--text-secondary);
          font-size: 0.95rem;
        }

        .global-loader {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ffffff;
          padding: 8px 16px;
          border-radius: 8px;
          border: 1px solid var(--border);
          font-size: 0.85rem;
          font-weight: 600;
        }

        /* Forms in Admin Dashboard */
        .content-form {
          max-width: 800px;
          background: #ffffff;
          border: 1px solid var(--border);
          padding: 40px;
          border-radius: 16px;
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-primary);
          margin-bottom: 20px;
          border-left: 4px solid var(--primary);
          padding-left: 12px;
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .col-span-2 {
          grid-column: span 2;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .form-group input, 
        .form-group textarea, 
        .form-group select {
          padding: 10px 14px;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-family: var(--font-body);
          font-size: 0.95rem;
          color: var(--text-primary);
          background-color: #ffffff;
          transition: all var(--transition-fast);
        }

        .form-group input:focus, 
        .form-group textarea:focus, 
        .form-group select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.05);
        }

        .form-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          margin-top: 36px;
          border-top: 1px solid var(--border);
          padding-top: 24px;
        }

        /* News Section CSS styles */
        .actions-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }

        .search-stat {
          font-size: 0.95rem;
          color: var(--text-secondary);
        }

        .table-responsive {
          width: 100%;
          overflow-x: auto;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          background: #ffffff;
        }

        .admin-table th {
          padding: 16px 24px;
          background: #f8fafc;
          border-bottom: 1px solid var(--border);
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .admin-table td {
          padding: 16px 24px;
          border-bottom: 1px solid var(--border);
          vertical-align: middle;
          font-size: 0.9rem;
        }

        .admin-table tr:hover {
          background-color: rgba(229, 62, 62, 0.01);
        }

        .table-img-box {
          width: 60px;
          height: 40px;
          border-radius: 6px;
          overflow: hidden;
          background-color: #f1f5f9;
          border: 1px solid var(--border);
        }

        .table-img-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .badge {
          display: inline-flex;
          padding: 4px 10px;
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .badge-kegiatan {
          background-color: rgba(59, 130, 246, 0.1);
          color: #3b82f6;
        }

        .badge-rilis {
          background-color: rgba(16, 185, 129, 0.1);
          color: #10b850;
        }

        .badge-pengumuman {
          background-color: rgba(245, 158, 11, 0.1);
          color: #f59e0b;
        }

        .badge-berita {
          background-color: rgba(229, 62, 62, 0.1);
          color: var(--primary);
        }

        .table-desc {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: var(--text-muted);
        }

        .table-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background: #ffffff;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .edit-btn:hover {
          border-color: #3b82f6;
          color: #3b82f6;
          background-color: rgba(59, 130, 246, 0.02);
        }

        .delete-btn:hover {
          border-color: #ef4444;
          color: #ef4444;
          background-color: rgba(239, 68, 68, 0.02);
        }

        .empty-state {
          padding: 80px 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          background: #ffffff;
        }

        .empty-state h3 {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--text-primary);
        }

        .empty-state p {
          color: var(--text-secondary);
          font-size: 0.9rem;
          max-width: 320px;
        }

        /* Toast Notifications */
        .toast-notification {
          position: fixed;
          top: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 14px 20px;
          border-radius: 8px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.95rem;
          z-index: 1000;
          animation: slideInDown 0.3s ease-out;
        }

        .toast-notification.success {
          background-color: #10b850;
          border-left: 4px solid #064e3b;
        }

        .toast-notification.error {
          background-color: #ef4444;
          border-left: 4px solid #7f1d1d;
        }

        @keyframes slideInDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* --- MODAL BOX DESIGN --- */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          justify-content: flex-end;
          z-index: 1000;
        }

        .modal-container {
          width: 100%;
          max-width: 580px;
          background: #ffffff;
          height: 100vh;
          border-radius: 0;
          border-left: 1px solid var(--border);
          box-shadow: -10px 0 40px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
          padding: 0;
          position: relative;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 30px;
          border-bottom: 1px solid var(--border);
        }

        .modal-header h3 {
          font-size: 1.25rem;
          font-weight: 800;
        }

        .close-modal-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: var(--text-muted);
          line-height: 1;
        }

        .close-modal-btn:hover {
          color: var(--text-primary);
        }

        .modal-form-body {
          flex-grow: 1;
          overflow-y: auto;
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .image-mode-tabs {
          display: flex;
          gap: 4px;
          background: #f1f5f9;
          padding: 3px;
          border-radius: 6px;
          margin-bottom: 4px;
        }

        .mode-tab-btn {
          flex: 1;
          padding: 6px;
          border-radius: 4px;
          border: none;
          background: none;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }

        .mode-tab-btn.active {
          background: #ffffff;
          color: var(--primary);
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          border-top: 1px solid var(--border);
          padding-top: 20px;
          margin-top: auto;
        }

        .flex-1 {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .animate-slide-in-right {
          animation: slideInRight var(--transition-normal);
        }

        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        @media (max-width: 991px) {
          .dashboard-sidebar {
            width: 80px;
            padding: 20px 10px;
            align-items: center;
          }
          .sidebar-brand span, 
          .menu-item span {
            display: none;
          }
          .sidebar-brand {
            margin-bottom: 30px;
            justify-content: center;
          }
          .dashboard-main {
            margin-left: 80px;
            padding: 30px 20px;
          }
          .modal-container {
            max-width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

// Badge coloring helper
function getBadgeClass(cat: string) {
  switch (cat) {
    case 'Kegiatan': return 'kegiatan';
    case 'Rilis': return 'rilis';
    case 'Pengumuman': return 'pengumuman';
    case 'Berita': return 'berita';
    default: return 'kegiatan';
  }
}
