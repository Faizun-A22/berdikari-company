import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShoppingBag, Smartphone, Laptop, RefreshCw, Cpu, Database, Award, ArrowRightLeft, ShieldCheck } from 'lucide-react';

interface InteractiveDemoViewerProps {
  project: {
    slug: string;
    title: string;
    category: 'web' | 'mobile' | 'uiux';
    categoryLabel: string;
    client: string;
    year: string;
    tags: string[];
    challenge: string;
    solution: string;
    results: string;
    challengeDetailed?: string;
    solutionDetailed?: string;
    resultsHighlight?: string;
    demoUrl?: string;
    liveUrl?: string;
    projectImportance?: string;
    shortDesc?: string;
  };
  onClose: () => void;
}

export default function InteractiveDemoViewer({ project, onClose }: InteractiveDemoViewerProps) {
  const [deviceMode, setDeviceMode] = useState<'desktop' | 'mobile'>(
    project.category === 'mobile' ? 'mobile' : 'desktop'
  );

  return (
    <div className="demo-viewer-overlay animate-fade-in">
      <div className="demo-viewer-header">
        <div className="demo-viewer-title-box">
          <span className="demo-badge">FRONTEND DEMO SIMULATOR</span>
          <h2>{project.title}</h2>
        </div>
        <div className="demo-viewer-controls">
          <button 
            className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
            onClick={() => setDeviceMode('desktop')}
          >
            <Laptop size={18} /> Desktop View
          </button>
          <button 
            className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
            onClick={() => setDeviceMode('mobile')}
          >
            <Smartphone size={18} /> Mobile View
          </button>
          <button className="demo-close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>
      </div>

      <div className="demo-viewer-body">
        {deviceMode === 'desktop' ? (
          <div className="browser-mockup card-glass">
            <div className="browser-topbar">
              <div className="browser-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="browser-address">
                <span className="https-lock">🔒</span>
                <span className="address-text">{project.demoUrl || `https://demo.kodeflow.id/${project.slug}/app`}</span>
              </div>
              <div className="browser-actions">
                <span className="refresh-icon">🔄</span>
              </div>
            </div>
            <div className="browser-viewport">
              <DemoRouter slug={project.slug} project={project} />
            </div>
          </div>
        ) : (
          <div className="phone-mockup">
            <div className="phone-screen">
              <div className="phone-notch">
                <div className="notch-camera"></div>
                <div className="notch-speaker"></div>
              </div>
              <div className="phone-statusbar">
                <span className="status-time">09:41</span>
                <div className="status-icons">
                  <span>📶</span>
                  <span>🔋</span>
                </div>
              </div>
              <div className="phone-viewport">
                <DemoRouter slug={project.slug} project={project} />
              </div>
              <div className="phone-home-indicator"></div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .demo-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: #030712;
          z-index: 1200;
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          color: #f3f4f6;
        }

        .demo-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: #090d16;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .demo-viewer-title-box h2 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.25rem;
          margin: 0;
          color: white;
        }

        .demo-badge {
          background: linear-gradient(135deg, #e53e3e 0%, #ff6b6b 100%);
          color: white;
          font-size: 0.65rem;
          font-weight: 700;
          padding: 2px 6px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          display: inline-block;
          margin-bottom: 4px;
        }

        .demo-viewer-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .device-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #9ca3af;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.3s ease;
        }

        .device-btn:hover {
          color: white;
          background: rgba(255, 255, 255, 0.06);
        }

        .device-btn.active {
          background: rgba(229, 62, 62, 0.1);
          border-color: rgba(229, 62, 62, 0.3);
          color: #ff6b6b;
        }

        .demo-close-btn {
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .demo-close-btn:hover {
          color: white;
        }

        .demo-viewer-body {
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: radial-gradient(circle at center, #0f172a 0%, #030712 100%);
          overflow: hidden;
        }

        /* Browser Mockup */
        .browser-mockup {
          width: 100%;
          max-width: 1100px;
          height: 90%;
          max-height: 720px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          background: #090d16;
          display: flex;
          flex-direction: column;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .browser-topbar {
          background: #0d1321;
          height: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          padding: 0 16px;
          gap: 16px;
        }

        .browser-dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          display: inline-block;
        }
        .dot-red { background: #ef4444; }
        .dot-yellow { background: #f59e0b; }
        .dot-green { background: #10b981; }

        .browser-address {
          flex-grow: 1;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.05);
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 12px;
          font-size: 0.75rem;
          color: #9ca3af;
          gap: 6px;
        }

        .address-text {
          color: #d1d5db;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .browser-actions {
          color: #9ca3af;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .browser-viewport {
          flex-grow: 1;
          overflow: hidden;
          background: #020617;
          display: flex;
        }

        /* Phone Mockup */
        .phone-mockup {
          width: 320px;
          height: 640px;
          border: 10px solid #1f2937;
          border-radius: 40px;
          background: #030712;
          position: relative;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6);
        }

        .phone-screen {
          width: 100%;
          height: 100%;
          border-radius: 30px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .phone-notch {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 20px;
          background: #1f2937;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }

        .notch-camera {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #0b1329;
        }

        .notch-speaker {
          width: 35px;
          height: 4px;
          border-radius: 2px;
          background: #374151;
        }

        .phone-statusbar {
          height: 28px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 4px 16px 0;
          font-size: 0.65rem;
          font-weight: 600;
          color: #d1d5db;
          z-index: 99;
          background: #090d16;
        }

        .status-icons {
          display: flex;
          gap: 4px;
        }

        .phone-viewport {
          flex-grow: 1;
          overflow: hidden;
          background: #020617;
          display: flex;
        }

        .phone-home-indicator {
          position: absolute;
          bottom: 6px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: #4b5563;
          border-radius: 2px;
          z-index: 100;
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease forwards;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// Router component to render corresponding app simulation
function DemoRouter({ slug, project }: { slug: string; project: any }) {
  const builtInSlugs = ['wepose', 'lppm-portal', 'erp-aethera', 'medplus-health', 'solaria-ecommerce', 'velo-wallet'];
  
  if (project.demoUrl && !builtInSlugs.includes(slug)) {
    return (
      <iframe 
        src={project.demoUrl} 
        style={{ width: '100%', height: '100%', border: 'none', background: 'white' }} 
        title={`${project.title} Demo`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  switch (slug) {
    case 'wepose':
      return <WeposePrototype />;
    case 'lppm-portal':
      return <LppmPrototype />;
    case 'erp-aethera':
      return <ErpPrototype />;
    case 'medplus-health':
      return <MedPlusPrototype />;
    case 'solaria-ecommerce':
      return <SolariaPrototype />;
    case 'velo-wallet':
      return <VeloPrototype />;
    default:
      return <GenericPrototype project={project} />;
  }
}

/* ==========================================================================
   1. WEPOSE VISA ASSISTANT PROTOTYPE
   ========================================================================== */
function WeposePrototype() {
  const [activeTab, setActiveTab] = useState<'wizard' | 'tracker' | 'leads'>('wizard');
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'bot', text: 'Halo! Saya Wepose AI Assistant. Saya siap memandu Anda mempersiapkan persyaratan visa untuk ke 35+ negara. Silakan klik pertanyaan di bawah atau ketik langsung!' }
  ]);
  const [chatInput, setChatInput] = useState('');
  
  // Wizard state
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardCountry, setWizardCountry] = useState('Jepang');
  const [wizardPurpose, setWizardPurpose] = useState('wisata');
  const [wizardJob, setWizardJob] = useState('karyawan');
  const [wizardFinance, setWizardFinance] = useState('cukup');
  const [wizardChecking, setWizardChecking] = useState(false);
  const [wizardResult, setWizardResult] = useState<any | null>(null);

  // Tracker state
  const [trackCode, setTrackCode] = useState('');
  const [trackResult, setTrackResult] = useState<any | null>(null);

  // Leads state
  const [leadsList, setLeadsList] = useState([
    { id: 1, name: 'Ahmad Fauzi', country: 'Jepang', email: 'ahmad@gmail.com', status: 'Baru' },
    { id: 2, name: 'Sarah Wijaya', country: 'Swiss', email: 'sarah@medika.co.id', status: 'Dihubungi' },
    { id: 3, name: 'Teguh Prasetyo', country: 'Korea Selatan', email: 'teguh@tech.id', status: 'Tindak Lanjut' }
  ]);

  const faqs = [
    { q: 'Apa syarat visa Jepang?', a: 'Untuk visa Jepang (Kunjungan Wisata Mandiri):\n1. Paspor yang masih berlaku minimal 6 bulan.\n2. Formulir permohonan visa & pasfoto 4.5 x 4.5 cm terbaru.\n3. Fotokopi KTP & Kartu Keluarga.\n4. Bukti Keuangan (Rekening koran 3 bulan terakhir, minimal saldo Rp 20 juta disarankan).\n5. Itinerary/jadwal perjalanan.' },
    { q: 'Berapa biaya visa Swiss?', a: 'Visa Schengen (Swiss):\n1. Biaya Visa (EUR 90 / sekitar Rp 1.600.000).\n2. Biaya Layanan VFS Global (sekitar Rp 350.000).\nCatatan: Biaya visa dapat berubah tergantung kurs resmi rupiah saat pembayaran dilakukan di VFS.' },
    { q: 'Berapa lama proses visa Korea?', a: 'Proses aplikasi visa Korea Selatan di KVAC Jakarta biasanya memakan waktu 5-7 hari kerja untuk Visa Reguler, dan 2-3 hari kerja untuk Express Visa (jika kuota tersedia).' }
  ];

  const handleFaqClick = (faq: any) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: faq.q }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: faq.a }]);
    }, 600);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      // Smart response logic
      let botResponse = 'Maaf, saya belum memahami pertanyaan Anda secara spesifik. Silakan hubungi admin Customer Service Wepose untuk konsultasi lebih mendalam.';
      const query = userText.toLowerCase();
      if (query.includes('jepang') || query.includes('japan')) {
        botResponse = faqs[0].a;
      } else if (query.includes('swiss') || query.includes('schengen')) {
        botResponse = faqs[1].a;
      } else if (query.includes('korea') || query.includes('seoul')) {
        botResponse = faqs[2].a;
      } else if (query.includes('halo') || query.includes('hi') || query.includes('selamat')) {
        botResponse = 'Halo! Ada yang bisa saya bantu hari ini seputar pengajuan visa Anda?';
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  const runWizard = () => {
    setWizardChecking(true);
    setTimeout(() => {
      setWizardChecking(false);
      setWizardResult({
        eligible: wizardFinance === 'cukup',
        country: wizardCountry,
        message: wizardFinance === 'cukup' 
          ? `Selamat! Berdasarkan data keuangan & profil Anda, peluang persetujuan Visa ${wizardCountry} Anda sangat TINGGI. Silakan siapkan rekening koran 3 bulan terakhir dengan saldo stabil.`
          : `Perhatian: Persyaratan saldo minimum keuangan untuk Visa ${wizardCountry} belum ideal. Kami menyarankan Anda menyertakan Surat Sponsor Keuangan dari keluarga terdekat.`
      });
    }, 1500);
  };

  const checkTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackCode) return;
    
    if (trackCode.toUpperCase() === 'WP-2025' || trackCode === '2025') {
      setTrackResult({
        id: 'WP-2025',
        client: 'Budi Santoso',
        country: 'Jepang',
        status: 'Proses Kedutaan',
        percent: 75,
        steps: [
          { name: 'Dokumen Diterima', done: true, date: '01 Juli 2026' },
          { name: 'Verifikasi & Pengunggahan', done: true, date: '03 Juli 2026' },
          { name: 'Penyerahan ke Kedutaan', done: true, date: '05 Juli 2026' },
          { name: 'Visa Approved / Selesai', done: false, date: 'Estimasi: 12 Juli 2026' }
        ]
      });
    } else {
      setTrackResult({ error: 'Nomor aplikasi tidak ditemukan. Coba masukkan "WP-2025" untuk simulasi.' });
    }
  };

  return (
    <div className="wepose-container">
      {/* Sidebar Mock */}
      <div className="wepose-sidebar">
        <div className="wepose-logo-box">
          <Award style={{ color: '#e53e3e' }} size={24} />
          <span>Wepose Visa</span>
        </div>
        <nav className="wepose-nav">
          <button className={activeTab === 'wizard' ? 'active' : ''} onClick={() => setActiveTab('wizard')}>
            🛡️ Uji Kelayakan Visa
          </button>
          <button className={activeTab === 'tracker' ? 'active' : ''} onClick={() => setActiveTab('tracker')}>
            📦 Pelacakan Berkas
          </button>
          <button className={activeTab === 'leads' ? 'active' : ''} onClick={() => setActiveTab('leads')}>
            👥 CRM Leads Admin
          </button>
        </nav>
        <div className="wepose-sb-footer">
          <small>Sistem Terintegrasi v1.2</small>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="wepose-main">
        {activeTab === 'wizard' && (
          <div className="wepose-content-card">
            <h3>Uji Kelayakan Visa Otomatis</h3>
            <p className="subtitle">Hitung skor kelayakan berkas Anda secara instan sebelum mengajukan ke kedutaan.</p>
            
            {wizardStep === 1 && !wizardResult && (
              <div className="wizard-form">
                <div className="form-group-wepose">
                  <label>Pilih Negara Tujuan:</label>
                  <select value={wizardCountry} onChange={(e) => setWizardCountry(e.target.value)}>
                    <option value="Jepang">Jepang (Asia)</option>
                    <option value="Korea Selatan">Korea Selatan (Asia)</option>
                    <option value="Swiss">Swiss (Schengen Eropa)</option>
                    <option value="Amerika Serikat">Amerika Serikat (USA)</option>
                  </select>
                </div>
                <div className="form-group-wepose">
                  <label>Tujuan Kunjungan:</label>
                  <div className="radio-group">
                    <button className={wizardPurpose === 'wisata' ? 'selected' : ''} onClick={() => setWizardPurpose('wisata')}>Wisata</button>
                    <button className={wizardPurpose === 'bisnis' ? 'selected' : ''} onClick={() => setWizardPurpose('bisnis')}>Bisnis</button>
                  </div>
                </div>
                <div className="form-group-wepose">
                  <label>Status Pekerjaan Saat Ini:</label>
                  <select value={wizardJob} onChange={(e) => setWizardJob(e.target.value)}>
                    <option value="karyawan">Karyawan Swasta / PNS</option>
                    <option value="wiraswasta">Pemilik Bisnis / Wiraswasta</option>
                    <option value="mahasiswa">Mahasiswa / Pelajar</option>
                    <option value="tidak_bekerja">Belum Bekerja</option>
                  </select>
                </div>
                <div className="form-group-wepose">
                  <label>Berapa estimasi saldo rata-rata rekening koran Anda 3 bulan terakhir?</label>
                  <select value={wizardFinance} onChange={(e) => setWizardFinance(e.target.value)}>
                    <option value="kurang">Di bawah Rp 10 Juta</option>
                    <option value="cukup">Rp 10 Juta s/d Rp 50 Juta</option>
                    <option value="sangat_cukup">Di atas Rp 50 Juta</option>
                  </select>
                </div>
                <button className="btn-wepose-primary" onClick={runWizard} disabled={wizardChecking}>
                  {wizardChecking ? 'Sedang Menganalisis dengan AI...' : 'Uji Kelayakan Sekarang'}
                </button>
              </div>
            )}

            {wizardChecking && (
              <div className="wizard-loading">
                <RefreshCw className="animate-spin" size={32} />
                <p>Memproses data keuangan &amp; kriteria Kedutaan {wizardCountry}...</p>
              </div>
            )}

            {wizardResult && (
              <div className="wizard-result">
                <div className={`result-alert ${wizardResult.eligible ? 'success' : 'warning'}`}>
                  <h4>{wizardResult.eligible ? '✅ Layak Mengajukan!' : '⚠️ Rekomendasi Tambahan'}</h4>
                  <p>{wizardResult.message}</p>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button className="btn-wepose-secondary" onClick={() => { setWizardResult(null); setWizardStep(1); }}>
                    Uji Kembali
                  </button>
                  <button className="btn-wepose-primary" onClick={() => setActiveTab('tracker')}>
                    Lacak Berkas Saya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'tracker' && (
          <div className="wepose-content-card">
            <h3>Pelacakan Berkas Pengajuan Visa</h3>
            <p className="subtitle">Masukkan kode aplikasi Anda untuk melihat progress pengurusan berkas di kedutaan secara real-time.</p>
            
            <form onSubmit={checkTracking} className="tracker-search-bar">
              <input 
                type="text" 
                placeholder="Contoh: WP-2025" 
                value={trackCode}
                onChange={(e) => setTrackCode(e.target.value)}
                required
              />
              <button type="submit" className="btn-wepose-primary">Cari Berkas</button>
            </form>

            {trackResult && !trackResult.error && (
              <div className="tracker-result-box">
                <div className="tracker-res-header">
                  <div>
                    <span className="bold-text">Aplikasi: {trackResult.id}</span>
                    <span className="category-label">{trackResult.client} ({trackResult.country})</span>
                  </div>
                  <span className="status-badge-blue">{trackResult.status}</span>
                </div>
                
                <div className="progress-bar-wepose">
                  <div className="progress-fill" style={{ width: `${trackResult.percent}%` }}></div>
                </div>

                <div className="tracking-steps-list">
                  {trackResult.steps.map((step: any, idx: number) => (
                    <div key={idx} className={`tracking-step-item ${step.done ? 'done' : 'pending'}`}>
                      <div className="step-circle">{step.done ? '✓' : idx + 1}</div>
                      <div className="step-content">
                        <h5>{step.name}</h5>
                        <small>{step.date}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trackResult && trackResult.error && (
              <div className="result-alert warning" style={{ marginTop: '20px' }}>
                <p>{trackResult.error}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'leads' && (
          <div className="wepose-content-card">
            <h3>Inquiry CRM &amp; Leads (Admin CMS)</h3>
            <p className="subtitle">Daftar calon pelanggan yang mengirim pertanyaan melalui formulir website.</p>
            
            <table className="wepose-table">
              <thead>
                <tr>
                  <th>Nama Pelanggan</th>
                  <th>Negara Tujuan</th>
                  <th>Email</th>
                  <th>Status Lead</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {leadsList.map((lead) => (
                  <tr key={lead.id}>
                    <td>{lead.name}</td>
                    <td>{lead.country}</td>
                    <td>{lead.email}</td>
                    <td><span className={`badge-lead ${lead.status === 'Baru' ? 'red' : 'gray'}`}>{lead.status}</span></td>
                    <td>
                      <button className="action-btn-sm" onClick={() => {
                        setLeadsList(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'Dihubungi' } : l));
                      }}>
                        Hubungi
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* AI Chatbot Widget (Floating) */}
        <div className="wepose-chatbot-widget">
          <div className="chatbot-header">
            <span className="pulse-indicator"></span>
            <h4>Wepose Chatbot AI</h4>
          </div>
          <div className="chatbot-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                <div className="msg-bubble">{msg.text}</div>
              </div>
            ))}
          </div>
          <div className="chatbot-faqs">
            <span className="faq-title">Pertanyaan Umum:</span>
            <div className="faq-chips">
              {faqs.map((faq, idx) => (
                <button key={idx} className="faq-chip" onClick={() => handleFaqClick(faq)}>{faq.q}</button>
              ))}
            </div>
          </div>
          <form onSubmit={handleSendChat} className="chatbot-input-box">
            <input 
              type="text" 
              placeholder="Tanyakan syarat visa negara..." 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
            />
            <button type="submit"><Send size={14} /></button>
          </form>
        </div>
      </div>

      <style>{`
        .wepose-container {
          display: flex;
          width: 100%;
          height: 100%;
          background: #0b0f19;
          font-size: 0.9rem;
          position: relative;
        }

        .wepose-sidebar {
          width: 200px;
          background: #090d16;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          padding: 16px;
        }

        .wepose-logo-box {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
          margin-bottom: 24px;
        }

        .wepose-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .wepose-nav button {
          background: none;
          border: none;
          color: #94a3b8;
          text-align: left;
          padding: 10px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.85rem;
          transition: all 0.2s ease;
        }

        .wepose-nav button:hover, .wepose-nav button.active {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .wepose-nav button.active {
          border-left: 2px solid #e53e3e;
          border-radius: 0 6px 6px 0;
        }

        .wepose-sb-footer {
          margin-top: auto;
          color: #4b5563;
          font-size: 0.7rem;
        }

        .wepose-main {
          flex-grow: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          overflow-y: auto;
          padding-right: 320px; /* Space for chatbot */
        }

        .wepose-content-card {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 20px;
        }

        .wepose-content-card h3 {
          color: white;
          margin-bottom: 4px;
        }

        .subtitle {
          color: #64748b;
          font-size: 0.8rem;
          margin-bottom: 20px;
        }

        /* Wizard Form Styles */
        .form-group-wepose {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-group-wepose label {
          color: #94a3b8;
          font-weight: 500;
          font-size: 0.85rem;
        }

        .form-group-wepose select {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          color: white;
        }

        .radio-group {
          display: flex;
          gap: 10px;
        }

        .radio-group button {
          flex-grow: 1;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .radio-group button.selected {
          border-color: #e53e3e;
          color: white;
          background: rgba(229, 62, 62, 0.08);
        }

        .btn-wepose-primary {
          background: #e53e3e;
          border: none;
          color: white;
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .btn-wepose-primary:hover {
          background: #c53030;
        }

        .btn-wepose-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
        }

        .wizard-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 0;
          gap: 12px;
          color: #94a3b8;
        }

        .wizard-result {
          margin-top: 10px;
        }

        .result-alert {
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 16px;
        }
        .result-alert.success {
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.2);
          color: #a7f3d0;
        }
        .result-alert.warning {
          background: rgba(245, 158, 11, 0.1);
          border: 1px solid rgba(245, 158, 11, 0.2);
          color: #fde68a;
        }

        .result-alert h4 {
          margin-bottom: 6px;
          color: white;
        }

        /* Tracker styles */
        .tracker-search-bar {
          display: flex;
          gap: 8px;
          margin-bottom: 20px;
        }

        .tracker-search-bar input {
          flex-grow: 1;
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          color: white;
        }

        .tracker-result-box {
          background: #0f172a;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: 16px;
        }

        .tracker-res-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .bold-text {
          font-weight: 700;
          color: white;
          display: block;
        }

        .category-label {
          font-size: 0.75rem;
          color: #64748b;
        }

        .status-badge-blue {
          background: rgba(59, 130, 246, 0.1);
          border: 1px solid rgba(59, 130, 246, 0.2);
          color: #93c5fd;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 4px;
          align-self: flex-start;
        }

        .progress-bar-wepose {
          background: rgba(255, 255, 255, 0.05);
          height: 6px;
          border-radius: 3px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .progress-fill {
          background: #e53e3e;
          height: 100%;
        }

        .tracking-steps-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .tracking-step-item {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .step-circle {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.75rem;
        }

        .tracking-step-item.done .step-circle {
          background: #e53e3e;
          color: white;
        }

        .tracking-step-item.pending .step-circle {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #4b5563;
        }

        .step-content h5 {
          color: white;
          margin-bottom: 2px;
        }

        .step-content small {
          color: #64748b;
          font-size: 0.7rem;
        }

        /* CRM Table */
        .wepose-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.8rem;
        }

        .wepose-table th {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 10px;
          color: #94a3b8;
          font-weight: 600;
        }

        .wepose-table td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 10px;
          color: #d1d5db;
        }

        .badge-lead {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .badge-lead.red {
          background: rgba(239, 68, 68, 0.15);
          color: #f87171;
        }
        .badge-lead.gray {
          background: rgba(156, 163, 175, 0.15);
          color: #d1d5db;
        }

        .action-btn-sm {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #d1d5db;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .action-btn-sm:hover {
          background: #e53e3e;
          border-color: #e53e3e;
          color: white;
        }

        /* Chatbot widget */
        .wepose-chatbot-widget {
          position: absolute;
          top: 24px;
          right: 24px;
          bottom: 24px;
          width: 280px;
          background: #090d16;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .chatbot-header {
          background: #0d1222;
          padding: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pulse-indicator {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10b981;
          animation: pulse 1.5s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .chatbot-header h4 {
          margin: 0;
          color: white;
          font-size: 0.85rem;
        }

        .chatbot-messages {
          flex-grow: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-message {
          display: flex;
        }
        .chat-message.bot { justify-content: flex-start; }
        .chat-message.user { justify-content: flex-end; }

        .msg-bubble {
          padding: 8px 12px;
          border-radius: 10px;
          max-width: 85%;
          font-size: 0.75rem;
          line-height: 1.4;
          white-space: pre-line;
        }

        .bot .msg-bubble {
          background: #1e293b;
          color: #e2e8f0;
          border-bottom-left-radius: 2px;
        }

        .user .msg-bubble {
          background: #e53e3e;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .chatbot-faqs {
          padding: 8px 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(255, 255, 255, 0.01);
        }

        .faq-title {
          font-size: 0.7rem;
          color: #64748b;
          display: block;
          margin-bottom: 6px;
        }

        .faq-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .faq-chip {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #94a3b8;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .faq-chip:hover {
          color: white;
          background: rgba(229, 62, 62, 0.1);
          border-color: rgba(229, 62, 62, 0.2);
        }

        .chatbot-input-box {
          display: flex;
          padding: 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          background: #0d1222;
        }

        .chatbot-input-box input {
          flex-grow: 1;
          background: none;
          border: none;
          color: white;
          font-size: 0.75rem;
          outline: none;
          padding: 4px;
        }

        .chatbot-input-box button {
          background: #e53e3e;
          border: none;
          color: white;
          width: 26px;
          height: 26px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   2. LPPM PORTAL PENELITIAN PROTOTYPE
   ========================================================================== */
function LppmPrototype() {
  const [proposals, setProposals] = useState([
    { id: 1, title: 'Penerapan AI untuk Deteksi Dini Kanker Payudara', scheme: 'Riset Unggulan', amount: 'Rp 75,000,000', status: 'Disetujui', reviewer: 'Dr. Roni Wijaya' },
    { id: 2, title: 'Sistem Pemantauan IoT Pertanian Presisi Hidroponik', scheme: 'Pengabdian Masyarakat', amount: 'Rp 45,000,000', status: 'Sedang Direview', reviewer: 'Prof. Yanto Susilo' }
  ]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newScheme, setNewScheme] = useState('Hibah Bersaing');
  const [newAmount, setNewAmount] = useState('');
  
  const handleSubmitProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAmount) return;

    const added = {
      id: Date.now(),
      title: newTitle,
      scheme: newScheme,
      amount: `Rp ${parseInt(newAmount).toLocaleString('id-ID')}`,
      status: 'Menunggu Kaprodi',
      reviewer: 'Belum Ditugaskan'
    };

    setProposals(prev => [added, ...prev]);
    setNewTitle('');
    setNewAmount('');
    setShowSubmitModal(false);
  };

  return (
    <div className="lppm-container">
      {/* Top Navbar */}
      <div className="lppm-header">
        <div className="lppm-brand">
          <Database style={{ color: '#3b82f6' }} size={20} />
          <span>LPPM Portal Riset</span>
        </div>
        <div className="lppm-user">
          <span>Dr. Ir. Ahmad Fauzi (Dosen)</span>
        </div>
      </div>

      <div className="lppm-layout">
        {/* Sidebar */}
        <div className="lppm-sidebar">
          <button className="active">📊 Ringkasan Riset</button>
          <button>📝 Proposal Baru</button>
          <button>📚 Luaran Ilmiah</button>
          <button>⚙️ Pengaturan</button>
        </div>

        {/* Content */}
        <div className="lppm-content">
          <div className="lppm-banner">
            <h3>Selamat Datang di Portal Riset LPPM</h3>
            <p>Kelola semua berkas proposal penelitian dan pengabdian masyarakat Dosen Universitas Berdikari secara transparan.</p>
          </div>

          {/* Stats */}
          <div className="lppm-stats">
            <div className="lppm-stat-card">
              <span className="lbl">Proposal Diajukan</span>
              <span className="val">{proposals.length}</span>
            </div>
            <div className="lppm-stat-card">
              <span className="lbl">Disetujui</span>
              <span className="val">1</span>
            </div>
            <div className="lppm-stat-card">
              <span className="lbl">Total Pendanaan</span>
              <span className="val">Rp 120 Juta</span>
            </div>
          </div>

          {/* Table list */}
          <div className="lppm-table-card">
            <div className="table-header">
              <h4>Daftar Proposal Riset Anda</h4>
              <button className="btn-lppm-primary" onClick={() => setShowSubmitModal(true)}>
                + Ajukan Proposal Baru
              </button>
            </div>

            <table className="lppm-table">
              <thead>
                <tr>
                  <th>Judul Riset</th>
                  <th>Skema Hibah</th>
                  <th>Dana Diajukan</th>
                  <th>Status</th>
                  <th>Reviewer</th>
                </tr>
              </thead>
              <tbody>
                {proposals.map((prop) => (
                  <tr key={prop.id}>
                    <td className="prop-title">{prop.title}</td>
                    <td>{prop.scheme}</td>
                    <td>{prop.amount}</td>
                    <td>
                      <span className={`status-badge-lppm ${
                        prop.status === 'Disetujui' ? 'green' : 
                        prop.status === 'Sedang Direview' ? 'orange' : 'blue'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td>{prop.reviewer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Form Proposal */}
      {showSubmitModal && (
        <div className="lppm-modal-overlay">
          <div className="lppm-modal card-glass">
            <div className="lppm-modal-header">
              <h4>Ajukan Proposal Penelitian Baru</h4>
              <button onClick={() => setShowSubmitModal(false)} className="close">&times;</button>
            </div>
            <form onSubmit={handleSubmitProposal} className="lppm-modal-form">
              <div className="form-group-lppm">
                <label>Judul Riset / Penelitian:</label>
                <input 
                  type="text" 
                  value={newTitle} 
                  onChange={(e) => setNewTitle(e.target.value)} 
                  placeholder="Ketik judul proposal lengkap..."
                  required 
                />
              </div>
              <div className="form-group-lppm">
                <label>Skema Hibah:</label>
                <select value={newScheme} onChange={(e) => setNewScheme(e.target.value)}>
                  <option value="Riset Unggulan">Riset Unggulan Institusi (RUI)</option>
                  <option value="Hibah Bersaing">Hibah Bersaing Dosen Pemula (HBDP)</option>
                  <option value="Pengabdian Masyarakat">Pengabdian Masyarakat (PPM)</option>
                </select>
              </div>
              <div className="form-group-lppm">
                <label>Anggaran yang Diajukan (Rupiah):</label>
                <input 
                  type="number" 
                  value={newAmount} 
                  onChange={(e) => setNewAmount(e.target.value)} 
                  placeholder="Contoh: 35000000"
                  required 
                />
              </div>
              <div className="form-group-lppm">
                <label>File Proposal (PDF Simulator):</label>
                <div className="file-box">📄 proposal_penelitian_final.pdf</div>
              </div>
              <div className="lppm-modal-actions">
                <button type="button" className="btn-lppm-sec" onClick={() => setShowSubmitModal(false)}>Batal</button>
                <button type="submit" className="btn-lppm-primary">Kirim Proposal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .lppm-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: #f8fafc;
          color: #1e293b;
          font-size: 0.85rem;
        }

        .lppm-header {
          height: 50px;
          background: white;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
        }

        .lppm-brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 1rem;
          color: #0f172a;
        }

        .lppm-user {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
        }

        .lppm-layout {
          flex-grow: 1;
          display: flex;
          overflow: hidden;
        }

        .lppm-sidebar {
          width: 180px;
          background: white;
          border-right: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
          padding: 12px;
          gap: 6px;
        }

        .lppm-sidebar button {
          border: none;
          background: none;
          text-align: left;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          color: #475569;
          font-weight: 500;
          font-size: 0.8rem;
        }

        .lppm-sidebar button.active {
          background: rgba(59, 130, 246, 0.08);
          color: #2563eb;
          font-weight: 600;
        }

        .lppm-content {
          flex-grow: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }

        .lppm-banner {
          background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
          color: white;
          padding: 16px;
          border-radius: 8px;
        }

        .lppm-banner h3 {
          margin-bottom: 4px;
          color: white;
        }

        .lppm-banner p {
          font-size: 0.75rem;
          opacity: 0.9;
        }

        .lppm-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .lppm-stat-card {
          background: white;
          padding: 12px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          display: flex;
          flex-direction: column;
        }

        .lppm-stat-card .lbl {
          font-size: 0.7rem;
          color: #64748b;
          margin-bottom: 4px;
        }

        .lppm-stat-card .val {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
        }

        .lppm-table-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }

        .table-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .btn-lppm-primary {
          background: #2563eb;
          border: none;
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .btn-lppm-primary:hover {
          background: #1d4ed8;
        }

        .btn-lppm-sec {
          background: #f1f5f9;
          border: 1px solid #cbd5e1;
          color: #475569;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.75rem;
        }

        .lppm-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.75rem;
        }

        .lppm-table th {
          border-bottom: 1px solid #e2e8f0;
          padding: 8px;
          color: #64748b;
        }

        .lppm-table td {
          border-bottom: 1px solid #f1f5f9;
          padding: 8px;
        }

        .prop-title {
          font-weight: 600;
          color: #0f172a;
        }

        .status-badge-lppm {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .status-badge-lppm.green { background: #dcfce7; color: #166534; }
        .status-badge-lppm.orange { background: #ffedd5; color: #9a3412; }
        .status-badge-lppm.blue { background: #dbeafe; color: #1e40af; }

        /* Modal styling */
        .lppm-modal-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.4);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .lppm-modal {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 450px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .lppm-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .lppm-modal-header h4 {
          margin: 0;
        }

        .lppm-modal-header .close {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .lppm-modal-form {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-group-lppm {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .form-group-lppm label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
        }

        .form-group-lppm input, .form-group-lppm select {
          padding: 8px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
        }

        .file-box {
          border: 1px dashed #cbd5e1;
          padding: 10px;
          background: #f8fafc;
          border-radius: 4px;
          font-size: 0.7rem;
          color: #64748b;
        }

        .lppm-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 8px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   3. ERP AETHERA PROTOTYPE
   ========================================================================== */
function ErpPrototype() {
  const [inventory, setInventory] = useState([
    { id: 1, name: 'Busing A2', stock: 120, status: 'Aman' },
    { id: 2, name: 'Gigi Transmisi B1', stock: 2, status: 'Kritis' },
    { id: 3, name: 'Piston Ring C2', stock: 4, status: 'Kritis' }
  ]);
  const [search, setSearch] = useState('');
  const [restockingId, setRestockingId] = useState<number | null>(null);

  const handleRestock = (id: number) => {
    setRestockingId(id);
    setTimeout(() => {
      setInventory(prev => prev.map(item => item.id === id ? { ...item, stock: 100, status: 'Aman' } : item));
      setRestockingId(null);
    }, 1200);
  };

  const filteredInv = inventory.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="erp-container">
      {/* Top Header */}
      <div className="erp-header">
        <div className="erp-logo">
          <Cpu style={{ color: '#dc2626' }} size={18} />
          <span>Aethera ERP 2.0</span>
        </div>
        <div className="erp-nav-quick">
          <span>⚡ Pabrik Utama (Karawang)</span>
        </div>
      </div>

      <div className="erp-body">
        {/* Left Stats Grid */}
        <div className="erp-grid-layout">
          <div className="erp-grid-header">
            <h4>Dashboard Ringkasan Operasional</h4>
            <small>Sinkronisasi terakhir: 1 detik yang lalu</small>
          </div>

          <div className="erp-stats-row">
            <div className="erp-stat-box">
              <span className="lbl">Pendapatan Bersih (YTD)</span>
              <span className="val">Rp 1.452 B</span>
              <span className="trend positive">+12% Bulan Ini</span>
            </div>
            <div className="erp-stat-box">
              <span className="lbl">Stok Gudang Utama</span>
              <span className="val">8,421 Unit</span>
              <span className="trend">Kapasitas 82%</span>
            </div>
            <div className="erp-stat-box">
              <span className="lbl">Stok Kritis</span>
              <span className="val" style={{ color: '#ef4444' }}>
                {inventory.filter(i => i.status === 'Kritis').length} Item
              </span>
              <span className="trend negative">Perlu Tindakan</span>
            </div>
            <div className="erp-stat-box">
              <span className="lbl">Efisiensi Rantai Pasok</span>
              <span className="val">94.2%</span>
              <span className="trend positive">Optimal</span>
            </div>
          </div>

          {/* Inventory Table Card */}
          <div className="erp-table-card">
            <div className="table-search-bar">
              <h4>Manajemen Persediaan Gudang</h4>
              <input 
                type="text" 
                placeholder="Cari nama komponen otomotif..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <table className="erp-table">
              <thead>
                <tr>
                  <th>Nama Barang</th>
                  <th>Stok Tersedia</th>
                  <th>Status Persediaan</th>
                  <th>Aksi Cepat</th>
                </tr>
              </thead>
              <tbody>
                {filteredInv.map((item) => (
                  <tr key={item.id}>
                    <td className="item-name">{item.name}</td>
                    <td>{item.stock} Unit</td>
                    <td>
                      <span className={`erp-status-badge ${item.status === 'Aman' ? 'green' : 'red'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td>
                      {item.status === 'Kritis' ? (
                        <button className="btn-erp-action" onClick={() => handleRestock(item.id)} disabled={restockingId === item.id}>
                          {restockingId === item.id ? 'Memproses PO...' : 'Order Stok Cepat'}
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Stok Mencukupi</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Live Logs Stream Sidebar */}
        <div className="erp-logs-sidebar">
          <h4>Aliran Log Sinkronisasi</h4>
          <div className="logs-list">
            <div className="log-item">
              <span className="time">[09:41:12]</span>
              <span className="text">Pabrik 1: Sinkronisasi data inventori sukses (3 cabang terintegrasi).</span>
            </div>
            <div className="log-item">
              <span className="time">[09:39:55]</span>
              <span className="text">Finance: Laporan rekonsiliasi bulanan diunduh oleh Admin.</span>
            </div>
            <div className="log-item">
              <span className="time">[09:35:10]</span>
              <span className="text">Gudang: Pembaruan stok 'Busing A2' (+50 unit) dicatat.</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .erp-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: #020617;
          color: #94a3b8;
          font-size: 0.8rem;
        }

        .erp-header {
          height: 44px;
          background: #0b0f19;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
        }

        .erp-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
        }

        .erp-nav-quick {
          font-size: 0.75rem;
          color: #64748b;
        }

        .erp-body {
          flex-grow: 1;
          display: flex;
          overflow: hidden;
        }

        .erp-grid-layout {
          flex-grow: 1;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
        }

        .erp-grid-header h4 {
          color: white;
          margin-bottom: 2px;
        }
        .erp-grid-header small {
          color: #64748b;
        }

        .erp-stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }

        .erp-stat-box {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 12px;
        }

        .erp-stat-box .lbl {
          font-size: 0.7rem;
          color: #64748b;
          display: block;
          margin-bottom: 4px;
        }

        .erp-stat-box .val {
          font-size: 1.2rem;
          font-weight: 700;
          color: white;
          display: block;
        }

        .erp-stat-box .trend {
          font-size: 0.65rem;
          color: #64748b;
          display: block;
          margin-top: 4px;
        }
        .erp-stat-box .trend.positive { color: #10b981; }
        .erp-stat-box .trend.negative { color: #ef4444; }

        .erp-table-card {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          padding: 16px;
        }

        .table-search-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .table-search-bar h4 {
          color: white;
        }

        .table-search-bar input {
          background: #020617;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          width: 250px;
        }

        .erp-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
        }

        .erp-table th {
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px;
          color: #64748b;
        }

        .erp-table td {
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding: 8px;
        }

        .item-name {
          color: white;
          font-weight: 600;
        }

        .erp-status-badge {
          font-size: 0.7rem;
          font-weight: 600;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .erp-status-badge.green { background: rgba(16, 185, 129, 0.15); color: #34d399; }
        .erp-status-badge.red { background: rgba(239, 68, 68, 0.15); color: #f87171; }

        .btn-erp-action {
          background: #dc2626;
          border: none;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .btn-erp-action:hover {
          background: #b91c1c;
        }

        .erp-logs-sidebar {
          width: 220px;
          background: #090d16;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .erp-logs-sidebar h4 {
          color: white;
        }

        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .log-item {
          font-size: 0.7rem;
          line-height: 1.4;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          padding-bottom: 8px;
        }

        .log-item .time {
          color: #64748b;
          font-weight: 600;
        }

        .log-item .text {
          color: #d1d5db;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   4. MEDPLUS HEALTH SOLUTION PROTOTYPE
   ========================================================================== */
function MedPlusPrototype() {
  const [activeScreen, setActiveScreen] = useState<'home' | 'chat' | 'cart'>('home');
  const [chatMessages, setChatMessages] = useState([
    { sender: 'doc', text: 'Halo! Saya dr. Adrian. Ada keluhan medis yang bisa saya bantu hari ini?' }
  ]);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [deliveryStep, setDeliveryStep] = useState(0);

  const handleSymptomSelect = (symptom: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: `Saya mengalami ${symptom}.` }]);
    setTimeout(() => {
      let docText = 'Silakan perbanyak istirahat dan pastikan kebutuhan cairan terpenuhi. Saya akan meresepkan obat penunjang untuk Anda.';
      if (symptom.toLowerCase().includes('demam')) {
        docText = 'Demam tinggi bisa diredakan dengan Paracetamol 500mg (3x sehari setelah makan). Saya rekomendasikan pemesanan obat langsung melalui tombol di bawah resep ini.';
        setCartItems([{ id: 1, name: 'Paracetamol 500mg', qty: 1, price: 'Rp 15.000' }]);
      } else if (symptom.toLowerCase().includes('batuk')) {
        docText = 'Untuk batuk berdahak, silakan minum Sirup Obat Batuk Acetylcysteine (3x sehari 1 sendok takar). Obat telah disiapkan di resep medis Anda.';
        setCartItems([{ id: 2, name: 'Sirup Obat Batuk', qty: 1, price: 'Rp 28.000' }]);
      }
      setChatMessages(prev => [...prev, { sender: 'doc', text: docText }]);
    }, 800);
  };

  const startDelivery = () => {
    setDeliveryStep(1);
    const intervals = [2, 3, 4];
    intervals.forEach((step, idx) => {
      setTimeout(() => {
        setDeliveryStep(step);
      }, (idx + 1) * 1500);
    });
  };

  return (
    <div className="medplus-container">
      {/* App Body Screen */}
      <div className="medplus-viewport-inner">
        {activeScreen === 'home' && (
          <div className="medplus-screen-home">
            <div className="med-header">
              <div>
                <small>Halo,</small>
                <h4>Ahmad Fauzi</h4>
              </div>
              <span className="avatar">🩺</span>
            </div>

            <div className="promo-banner">
              <h5>Konsultasi Dokter Instan</h5>
              <p>Virtual Chatbot MedPlus melayani keluhan Anda 24 jam sehari.</p>
              <button onClick={() => setActiveScreen('chat')}>Chat Sekarang</button>
            </div>

            <div className="section-title-med">
              <span>Fitur Utama</span>
            </div>

            <div className="features-grid">
              <div className="feat-box" onClick={() => setActiveScreen('chat')}>
                <span className="icon">💬</span>
                <span>Konsultasi Dokter</span>
              </div>
              <div className="feat-box" onClick={() => {
                if (cartItems.length > 0) setActiveScreen('cart');
              }}>
                <span className="icon">💊</span>
                <span>Pesan Obat</span>
                {cartItems.length > 0 && <span className="cart-badge-med">{cartItems.length}</span>}
              </div>
            </div>

            <div className="doctor-list-med">
              <span>Dokter Online</span>
              <div className="doc-card-med">
                <span className="avatar">👨‍⚕️</span>
                <div>
                  <h6>dr. Adrian, Sp.A</h6>
                  <small>Spesialis Anak • Online</small>
                </div>
                <button className="chat-btn-med" onClick={() => setActiveScreen('chat')}>Chat</button>
              </div>
            </div>
          </div>
        )}

        {activeScreen === 'chat' && (
          <div className="medplus-screen-chat">
            <div className="chat-header-med">
              <button onClick={() => setActiveScreen('home')}>←</button>
              <div>
                <h5>dr. Adrian, Sp.A</h5>
                <small>Konsultasi Aktif</small>
              </div>
            </div>

            <div className="chat-messages-med">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`chat-bubble-med ${msg.sender}`}>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            {/* Prescriptions quick trigger */}
            {chatMessages.length === 1 && (
              <div className="symptoms-chips">
                <span style={{ fontSize: '0.7rem', color: '#64748b', display: 'block', marginBottom: '4px' }}>Pilih keluhan:</span>
                <button onClick={() => handleSymptomSelect('Demam & Flu')}>Demam &amp; Flu</button>
                <button onClick={() => handleSymptomSelect('Batuk Berdahak')}>Batuk Berdahak</button>
              </div>
            )}

            {cartItems.length > 0 && chatMessages.length > 1 && (
              <div className="prescription-card">
                <h6>Resep Digital Terbit</h6>
                <p>{cartItems[0].name} ({cartItems[0].qty}x)</p>
                <button onClick={() => setActiveScreen('cart')}>Beli &amp; Pesan Obat</button>
              </div>
            )}
          </div>
        )}

        {activeScreen === 'cart' && (
          <div className="medplus-screen-cart">
            <div className="chat-header-med">
              <button onClick={() => setActiveScreen('chat')}>←</button>
              <h5>Keranjang &amp; Pengiriman</h5>
            </div>

            <div className="cart-content">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item-med">
                  <div>
                    <h6>{item.name}</h6>
                    <small>Kuantitas: {item.qty}x</small>
                  </div>
                  <span>{item.price}</span>
                </div>
              ))}

              <div className="address-box-med">
                <h6>Alamat Pengiriman</h6>
                <p>Jl. Merdeka No. 45, Bandung Barat</p>
              </div>

              {deliveryStep === 0 ? (
                <button className="btn-checkout-med" onClick={startDelivery}>
                  Konfirmasi &amp; Simulasikan Antar
                </button>
              ) : (
                <div className="delivery-simulation">
                  <h6>Progres Pengiriman Kurir</h6>
                  <div className="delivery-steps">
                    <div className={`dev-step ${deliveryStep >= 1 ? 'done' : ''}`}>🛵 Kurir Menjemput Obat</div>
                    <div className={`dev-step ${deliveryStep >= 2 ? 'done' : ''}`}>🛣️ Sedang di Perjalanan</div>
                    <div className={`dev-step ${deliveryStep >= 3 ? 'done' : ''}`}>📍 Kurir Tiba di Lokasi</div>
                    <div className={`dev-step ${deliveryStep >= 4 ? 'done' : ''}`}>🎉 Obat Diterima!</div>
                  </div>
                  {deliveryStep === 4 && (
                    <button className="btn-checkout-med" onClick={() => {
                      setCartItems([]);
                      setDeliveryStep(0);
                      setActiveScreen('home');
                    }}>
                      Kembali ke Beranda
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        .medplus-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #0f172a;
          color: #0f172a;
        }

        .medplus-viewport-inner {
          width: 100%;
          height: 100%;
          background: #f8fafc;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .medplus-screen-home, .medplus-screen-chat, .medplus-screen-cart {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          padding: 12px;
          overflow-y: auto;
        }

        .med-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .med-header h4 {
          margin: 0;
          color: #0f172a;
        }

        .med-header .avatar {
          font-size: 1.5rem;
        }

        .promo-banner {
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 12px;
          padding: 16px;
          color: white;
          margin-bottom: 16px;
        }

        .promo-banner h5 {
          margin-bottom: 4px;
          color: white;
        }
        .promo-banner p {
          font-size: 0.7rem;
          margin-bottom: 12px;
        }
        .promo-banner button {
          background: white;
          color: #059669;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
        }

        .section-title-med {
          font-size: 0.8rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 8px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-bottom: 16px;
        }

        .feat-box {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.75rem;
          position: relative;
        }

        .cart-badge-med {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: white;
          font-size: 0.6rem;
          font-weight: 700;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .doctor-list-med {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .doctor-list-med span {
          font-weight: 700;
          font-size: 0.8rem;
          color: #475569;
        }

        .doc-card-med {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 10px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .doc-card-med h6 {
          margin: 0;
          color: #0f172a;
        }
        .doc-card-med small {
          color: #64748b;
        }

        .chat-btn-med {
          margin-left: auto;
          background: #10b981;
          color: white;
          border: none;
          padding: 4px 10px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
        }

        /* Chat screen style */
        .chat-header-med {
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }

        .chat-header-med button {
          border: none;
          background: none;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .chat-header-med h5 {
          margin: 0;
        }

        .chat-messages-med {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
          overflow-y: auto;
          margin-bottom: 12px;
        }

        .chat-bubble-med {
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          max-width: 80%;
          line-height: 1.4;
        }
        .chat-bubble-med.doc {
          background: #e2e8f0;
          color: #1e293b;
          align-self: flex-start;
          border-bottom-left-radius: 2px;
        }
        .chat-bubble-med.user {
          background: #10b981;
          color: white;
          align-self: flex-end;
          border-bottom-right-radius: 2px;
        }

        .symptoms-chips {
          margin-bottom: 8px;
        }

        .symptoms-chips button {
          background: white;
          border: 1px solid #10b981;
          color: #10b981;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 600;
          margin-right: 6px;
          cursor: pointer;
        }

        .prescription-card {
          background: #dcfce7;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 12px;
          margin-top: 10px;
        }
        .prescription-card h6 {
          color: #166534;
          margin-bottom: 2px;
        }
        .prescription-card button {
          background: #10b981;
          border: none;
          color: white;
          padding: 6px 12px;
          border-radius: 6px;
          width: 100%;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          margin-top: 8px;
        }

        /* Cart & delivery styles */
        .cart-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .cart-item-med {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-item-med h6 {
          margin: 0;
        }

        .address-box-med {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
        }
        .address-box-med h6 {
          color: #475569;
          margin-bottom: 2px;
        }
        .address-box-med p {
          font-size: 0.7rem;
        }

        .btn-checkout-med {
          background: #10b981;
          border: none;
          color: white;
          padding: 12px;
          border-radius: 8px;
          font-weight: 700;
          cursor: pointer;
        }

        .delivery-simulation {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 12px;
        }

        .delivery-steps {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
          margin-bottom: 12px;
        }

        .dev-step {
          font-size: 0.75rem;
          color: #94a3b8;
        }
        .dev-step.done {
          color: #10b981;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   5. SOLARIA E-COMMERCE PROTOTYPE
   ========================================================================== */
function SolariaPrototype() {
  const [cart, setCart] = useState<any[]>([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const products = [
    { id: 1, name: 'Premium Cotton T-Shirt', price: 149000, img: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Waterproof Windbreaker', price: 349000, img: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Urban Techwear Jogger', price: 299000, img: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=400&q=80' }
  ];

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowDrawer(true);
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);

  const triggerPay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setOrderSuccess(true);
      setCart([]);
    }, 1500);
  };

  return (
    <div className="solaria-container">
      {/* Header */}
      <div className="solaria-header">
        <span className="logo-sol">SOLARIA RETAIL</span>
        <button className="cart-trigger" onClick={() => setShowDrawer(true)}>
          <ShoppingBag size={18} />
          {cart.length > 0 && <span className="badge">{cart.reduce((a,i)=>a+i.qty,0)}</span>}
        </button>
      </div>

      {/* Catalog */}
      <div className="solaria-catalog">
        <div className="catalog-banner">
          <h4>Koleksi Urban Modern 2026</h4>
          <p>Potongan minimalis dengan kenyamanan maksimal untuk kebutuhan harian Anda.</p>
        </div>

        <div className="products-grid-sol">
          {products.map((prod) => (
            <div key={prod.id} className="prod-card-sol">
              <div className="img-box">
                <img src={prod.img} alt={prod.name} />
              </div>
              <div className="info">
                <h6>{prod.name}</h6>
                <span className="price">Rp {prod.price.toLocaleString('id-ID')}</span>
                <button onClick={() => addToCart(prod)}>+ Tambah</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart Drawer */}
      {showDrawer && (
        <div className="drawer-overlay" onClick={() => setShowDrawer(false)}>
          <div className="drawer card-glass" onClick={(e)=>e.stopPropagation()}>
            <div className="drawer-hdr">
              <h5>Keranjang Belanja</h5>
              <button onClick={() => setShowDrawer(false)}>&times;</button>
            </div>

            <div className="drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#94a3b8' }}>Keranjang kosong.</div>
              ) : (
                <div className="cart-items-sol">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item-sol">
                      <h6>{item.name} (x{item.qty})</h6>
                      <span>Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                    </div>
                  ))}
                  <div className="total-box">
                    <span>Total Subtotal:</span>
                    <span className="total-val">Rp {cartTotal.toLocaleString('id-ID')}</span>
                  </div>
                  <button className="btn-pay-sol" onClick={() => { setShowDrawer(false); setCheckoutModal(true); }}>
                    Proses ke Checkout (1-Click)
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Checkout simulator modal */}
      {checkoutModal && (
        <div className="checkout-overlay">
          <div className="checkout-card card-glass">
            <div className="checkout-hdr">
              <h5>Stripe Payment Simulator</h5>
              <button onClick={() => setCheckoutModal(false)}>&times;</button>
            </div>

            {!orderSuccess ? (
              <div className="checkout-body">
                <div className="amount-pay">Total Tagihan: <strong>Rp {cartTotal.toLocaleString('id-ID')}</strong></div>
                <div className="credit-card-inputs">
                  <div className="form-group-sol">
                    <label>Nomor Kartu Kredit:</label>
                    <div className="mock-card-num">💳 **** **** **** 4242 (Prefilled)</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div className="form-group-sol">
                      <label>Valid Thru:</label>
                      <input type="text" value="12/29" readOnly />
                    </div>
                    <div className="form-group-sol">
                      <label>CVC:</label>
                      <input type="text" value="421" readOnly />
                    </div>
                  </div>
                </div>

                <button className="btn-pay-sol" onClick={triggerPay} disabled={paying}>
                  {paying ? 'Memproses Transaksi Terenkripsi...' : `Bayar Rp ${cartTotal.toLocaleString('id-ID')}`}
                </button>
              </div>
            ) : (
              <div className="order-success-sol">
                <CheckCircle2 style={{ color: '#10b981' }} size={48} />
                <h4>Pembayaran Berhasil!</h4>
                <p>Order #SOL-9821 telah dikonfirmasi oleh sistem retail Solaria.</p>
                <button className="btn-pay-sol" onClick={() => { setOrderSuccess(false); setCheckoutModal(false); }}>
                  Selesai
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .solaria-container {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          background: #ffffff;
          color: #0f172a;
          font-size: 0.8rem;
          position: relative;
        }

        .solaria-header {
          height: 48px;
          border-bottom: 1px solid #e2e8f0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 16px;
        }

        .logo-sol {
          font-family: 'Outfit', sans-serif;
          font-weight: 800;
          font-size: 1rem;
          letter-spacing: 0.05em;
        }

        .cart-trigger {
          border: none;
          background: none;
          cursor: pointer;
          position: relative;
          color: #0f172a;
        }

        .cart-trigger .badge {
          position: absolute;
          top: -6px;
          right: -8px;
          background: #e53e3e;
          color: white;
          font-size: 0.55rem;
          font-weight: 700;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .solaria-catalog {
          flex-grow: 1;
          padding: 12px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .catalog-banner {
          background: #0f172a;
          color: white;
          padding: 16px;
          border-radius: 8px;
        }
        .catalog-banner h4 { color: white; margin-bottom: 4px; }
        .catalog-banner p { font-size: 0.7rem; opacity: 0.8; }

        .products-grid-sol {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .prod-card-sol {
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }

        .prod-card-sol .img-box {
          height: 100px;
          overflow: hidden;
          background: #f1f5f9;
        }
        .prod-card-sol img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .prod-card-sol .info {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .prod-card-sol h6 {
          margin: 0;
          color: #0f172a;
          font-size: 0.75rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .prod-card-sol .price {
          font-size: 0.7rem;
          color: #64748b;
          font-weight: 600;
        }

        .prod-card-sol button {
          background: #0f172a;
          color: white;
          border: none;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 4px;
        }

        /* Drawer */
        .drawer-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.3);
          z-index: 200;
          display: flex;
          justify-content: flex-end;
        }

        .drawer {
          width: 240px;
          background: white;
          height: 100%;
          padding: 16px;
          display: flex;
          flex-direction: column;
          box-shadow: -10px 0 25px rgba(0,0,0,0.1);
        }

        .drawer-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .drawer-hdr button {
          border: none;
          background: none;
          font-size: 1.5rem;
          cursor: pointer;
        }

        .cart-items-sol {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cart-item-sol {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 6px;
        }

        .total-box {
          display: flex;
          justify-content: space-between;
          font-weight: 700;
          margin-top: 10px;
          border-top: 1px solid #e2e8f0;
          padding-top: 10px;
        }

        .btn-pay-sol {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 10px;
          border-radius: 6px;
          font-weight: 700;
          cursor: pointer;
          width: 100%;
          margin-top: 12px;
          font-size: 0.75rem;
        }

        /* Checkout */
        .checkout-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.4);
          z-index: 255;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
        }

        .checkout-card {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 320px;
          padding: 16px;
        }

        .checkout-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 8px;
          margin-bottom: 12px;
        }
        .checkout-hdr button {
          border: none;
          background: none;
          font-size: 1.25rem;
          cursor: pointer;
        }

        .amount-pay {
          font-size: 0.8rem;
          margin-bottom: 12px;
        }

        .credit-card-inputs {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 12px;
        }

        .form-group-sol {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .form-group-sol label {
          font-size: 0.65rem;
          font-weight: 600;
          color: #64748b;
        }
        .form-group-sol input {
          padding: 6px;
          border: 1px solid #cbd5e1;
          border-radius: 4px;
          font-size: 0.75rem;
        }

        .mock-card-num {
          font-size: 0.75rem;
          font-weight: 600;
          color: #334155;
        }

        .order-success-sol {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 10px;
          padding: 16px 0;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   6. VELO WALLET PROTOTYPE (E-WALLET)
   ========================================================================== */
function VeloPrototype() {
  const [balance, setBalance] = useState(12450.25);
  const [txs, setTxs] = useState([
    { id: 1, type: 'Kirim', desc: 'Transfer ke 0x8a92...1102', val: '-$120.00', date: 'Hari ini' },
    { id: 2, type: 'Terima', desc: 'Deposit Fiat Bank Transfer', val: '+$500.00', date: 'Kemarin' }
  ]);
  const [showSendModal, setShowSendModal] = useState(false);
  const [sendTarget, setSendTarget] = useState('');
  const [sendAmount, setSendAmount] = useState('');
  const [signTransaction, setSignTransaction] = useState(false);
  const [approving, setApproving] = useState(false);
  const [txResult, setTxResult] = useState<string | null>(null);

  const handleTriggerSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendTarget || !sendAmount) return;
    setSignTransaction(true);
  };

  const handleSignTransaction = () => {
    setApproving(true);
    setTimeout(() => {
      setApproving(false);
      const amountNum = parseFloat(sendAmount);
      setBalance(prev => prev - amountNum);
      const mockHash = '0x' + Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('');
      setTxResult(mockHash);
      setTxs(prev => [{
        id: Date.now(),
        type: 'Kirim',
        desc: `Transfer ke ${sendTarget.substring(0, 8)}...`,
        val: `-$${amountNum.toFixed(2)}`,
        date: 'Hari ini'
      }, ...prev]);
    }, 1500);
  };

  return (
    <div className="velo-container">
      {/* Viewport wrapper */}
      <div className="velo-viewport">
        {/* Top Header */}
        <div className="velo-header">
          <div className="velo-logo">
            <ArrowRightLeft style={{ color: '#ec4899' }} size={16} />
            <span>Velo Wallet</span>
          </div>
          <span className="velo-net">Web3 Mainnet</span>
        </div>

        {/* Balance Card */}
        <div className="velo-balance-card">
          <span className="title">TOTAL ASSETS VALUE</span>
          <span className="val">${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD</span>
          <div className="actions-velo">
            <button className="action-btn" onClick={() => setShowSendModal(true)}>📤 Kirim</button>
            <button className="action-btn">📥 Terima</button>
            <button className="action-btn">🔄 Swap</button>
          </div>
        </div>

        {/* Transactions list */}
        <div className="velo-txs-card">
          <div className="card-hdr">
            <span>Riwayat Transaksi</span>
            <small>Lihat Semua</small>
          </div>
          
          <div className="tx-list-velo">
            {txs.map((tx) => (
              <div key={tx.id} className="tx-item-velo">
                <div className="tx-icon-box">{tx.type === 'Kirim' ? '⬆️' : '⬇️'}</div>
                <div className="tx-desc">
                  <span>{tx.desc}</span>
                  <small>{tx.date}</small>
                </div>
                <span className={`tx-val ${tx.type === 'Kirim' ? 'negative' : 'positive'}`}>{tx.val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Send modal form */}
      {showSendModal && (
        <div className="velo-modal-overlay">
          <div className="velo-modal card-glass">
            <div className="velo-modal-hdr">
              <h5>Kirim Aset Kripto / Token</h5>
              <button onClick={() => { setShowSendModal(false); setTxResult(null); setSendAmount(''); setSendTarget(''); }}>&times;</button>
            </div>

            {!signTransaction ? (
              <form onSubmit={handleTriggerSend} className="velo-modal-form">
                <div className="form-group-velo">
                  <label>Pilih Aset:</label>
                  <select style={{ background: '#090d16', border: '1px solid rgba(255,255,255,0.1)', color: 'white', padding: '8px', borderRadius: '6px' }}>
                    <option value="USDT">USDT (Tether USD)</option>
                    <option value="BTC">BTC (Bitcoin)</option>
                    <option value="ETH">ETH (Ethereum)</option>
                  </select>
                </div>
                <div className="form-group-velo">
                  <label>Alamat Dompet Penerima:</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 0x8a92...1102"
                    value={sendTarget}
                    onChange={(e) => setSendTarget(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group-velo">
                  <label>Jumlah (USD):</label>
                  <input 
                    type="number" 
                    placeholder="Contoh: 50"
                    value={sendAmount}
                    onChange={(e) => setSendAmount(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-velo-primary">Lanjutkan Transaksi</button>
              </form>
            ) : (
              <div className="velo-signing-box">
                {!txResult ? (
                  <div className="sign-confirm">
                    <ShieldCheck style={{ color: '#ec4899', margin: '0 auto 12px' }} size={40} />
                    <h6>Konfirmasi Otentikasi Biometrik</h6>
                    <p>Otorisasi pengiriman <strong>${parseFloat(sendAmount).toFixed(2)} USDT</strong> ke alamat target.</p>
                    <div className="gas-info">Estimasi Gas Fee: $0.05 USD (Very Low)</div>
                    <button className="btn-velo-primary" onClick={handleSignTransaction} disabled={approving}>
                      {approving ? 'Verifikasi Sidik Jari...' : 'Simulasikan FaceID / Verifikasi'}
                    </button>
                  </div>
                ) : (
                  <div className="sign-result">
                    <CheckCircle2 style={{ color: '#10b981', margin: '0 auto 12px' }} size={40} />
                    <h6>Transaksi Berhasil Disiarkan!</h6>
                    <p>Aset Anda sedang diproses oleh jaringan blockchain.</p>
                    <div className="tx-hash-link" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '240px', fontSize: '0.65rem', background: '#090d16', padding: '6px', borderRadius: '4px', margin: '8px auto', border: '1px solid rgba(255,255,255,0.08)' }}>
                      Hash: {txResult}
                    </div>
                    <button className="btn-velo-primary" onClick={() => {
                      setShowSendModal(false);
                      setSignTransaction(false);
                      setTxResult(null);
                      setSendAmount('');
                      setSendTarget('');
                    }}>
                      Kembali ke Dashboard
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .velo-container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          background: #020617;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
        }

        .velo-viewport {
          width: 100%;
          height: 100%;
          background: #090d16;
          display: flex;
          flex-direction: column;
          padding: 12px;
          overflow-y: auto;
        }

        .velo-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .velo-logo {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 700;
          color: white;
        }

        .velo-net {
          font-size: 0.65rem;
          background: rgba(236, 72, 153, 0.15);
          color: #f472b6;
          border: 1px solid rgba(236, 72, 153, 0.2);
          padding: 2px 6px;
          border-radius: 4px;
        }

        .velo-balance-card {
          background: linear-gradient(135deg, #1d2d50 0%, #133b5c 50%, #1e5f74 100%);
          border-radius: 12px;
          padding: 16px;
          color: white;
          margin-bottom: 16px;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
        }

        .velo-balance-card .title {
          font-size: 0.65rem;
          color: rgba(255,255,255,0.7);
          display: block;
          margin-bottom: 4px;
        }

        .velo-balance-card .val {
          font-size: 1.4rem;
          font-weight: 700;
          display: block;
          margin-bottom: 16px;
        }

        .actions-velo {
          display: flex;
          gap: 8px;
        }

        .actions-velo .action-btn {
          flex-grow: 1;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          padding: 6px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .actions-velo .action-btn:hover {
          background: rgba(255,255,255,0.15);
        }

        .velo-txs-card {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          padding: 12px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
        }

        .velo-txs-card .card-hdr {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          color: white;
          margin-bottom: 12px;
        }

        .tx-list-velo {
          display: flex;
          flex-direction: column;
          gap: 12px;
          overflow-y: auto;
        }

        .tx-item-velo {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          padding-bottom: 8px;
        }

        .tx-icon-box {
          width: 28px;
          height: 28px;
          background: rgba(255,255,255,0.04);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .tx-desc {
          display: flex;
          flex-direction: column;
          font-size: 0.75rem;
        }
        .tx-desc span { color: white; }
        .tx-desc small { color: #64748b; font-size: 0.65rem; }

        .tx-val {
          margin-left: auto;
          font-weight: 700;
          font-size: 0.75rem;
        }
        .tx-val.positive { color: #10b981; }
        .tx-val.negative { color: #ef4444; }

        /* Velo modal */
        .velo-modal-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 200;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }

        .velo-modal {
          background: #0d1222;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          width: 100%;
          max-width: 270px;
          padding: 12px;
        }

        .velo-modal-hdr {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 6px;
          margin-bottom: 8px;
        }
        .velo-modal-hdr h5 { color: white; margin: 0; font-size: 0.8rem; }
        .velo-modal-hdr button { background: none; border: none; font-size: 1.25rem; color: #64748b; cursor: pointer; }

        .velo-modal-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .form-group-velo {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .form-group-velo label {
          font-size: 0.65rem;
          color: #64748b;
        }
        .form-group-velo input {
          background: #090d16;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px;
          border-radius: 6px;
          font-size: 0.75rem;
        }

        .btn-velo-primary {
          background: #ec4899;
          border: none;
          color: white;
          padding: 8px;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.75rem;
          cursor: pointer;
          margin-top: 6px;
        }

        .velo-signing-box {
          text-align: center;
          padding: 12px 0;
        }

        .velo-signing-box h6 {
          color: white;
          margin-bottom: 4px;
        }

        .velo-signing-box p {
          font-size: 0.7rem;
          line-height: 1.4;
          margin-bottom: 8px;
        }

        .gas-info {
          font-size: 0.65rem;
          color: #64748b;
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  );
}

/* ==========================================================================
   7. GENERIC SMART FALLBACK PROTOTYPE
   ========================================================================== */
function GenericPrototype({ project }: { project: any }) {
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'bot', text: `Halo! Saya AI Project Assistant untuk ${project.title}. Saya siap membantu Anda mengeksplorasi rincian teknis, tantangan, dan solusi dari proyek ini.` }
  ]);
  const [chatInput, setChatInput] = useState('');

  const botReplies: Record<string, string> = {
    challenge: `### Tantangan Utama Proyek:\n${project.challengeDetailed || project.challenge}`,
    solution: `### Solusi yang Diberikan Kodeflow:\n${project.solutionDetailed || project.solution}`,
    results: `### Dampak Bisnis & Hasil Nyata:\n${project.results}`,
    about: `### Tentang Proyek:\n${project.projectImportance || project.shortDesc}\n\n**Klien:** ${project.client}\n**Tahun:** ${project.year}`
  };

  const handleQuickAsk = (type: string, question: string) => {
    setChatMessages(prev => [...prev, { sender: 'user', text: question }]);
    setTimeout(() => {
      setChatMessages(prev => [...prev, { sender: 'bot', text: botReplies[type] || 'Maaf, saya tidak menemukan data tersebut.' }]);
    }, 600);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const userText = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    setTimeout(() => {
      let botResponse = 'Maaf, saya didesain untuk menjawab pertanyaan seputar Tantangan, Solusi, Hasil, dan Detail proyek ini. Silakan klik salah satu tombol di bawah untuk informasi instan!';
      const query = userText.toLowerCase();
      if (query.includes('tantangan') || query.includes('kendala') || query.includes('masalah')) {
        botResponse = botReplies.challenge;
      } else if (query.includes('solusi') || query.includes('bagaimana') || query.includes('arsitektur')) {
        botResponse = botReplies.solution;
      } else if (query.includes('hasil') || query.includes('dampak') || query.includes('sukses')) {
        botResponse = botReplies.results;
      } else if (query.includes('tentang') || query.includes('detail') || query.includes('klien')) {
        botResponse = botReplies.about;
      }
      setChatMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 800);
  };

  return (
    <div className="generic-proto-container">
      <div className="generic-main-info">
        <div className="project-header-box">
          <span className="cat-label">{project.categoryLabel}</span>
          <h2>{project.title}</h2>
          <p>{project.shortDesc}</p>
        </div>

        <div className="tech-tags-proto">
          {project.tags.map((tag: string, idx: number) => (
            <span key={idx} className="proto-tag-badge">{tag}</span>
          ))}
        </div>

        <div className="info-quick-cards">
          <div className="q-card">
            <span className="q-lbl">Klien Perusahaan</span>
            <span className="q-val">{project.client}</span>
          </div>
          <div className="q-card">
            <span className="q-lbl">Tahun Rilis</span>
            <span className="q-val">{project.year}</span>
          </div>
        </div>

        <div className="simulator-helper-alert">
          <p>💡 <strong>Simulasi Aktif:</strong> Anda sedang berinteraksi dengan AI Assistant untuk proyek ini. Klik tombol di kanan untuk menanyakan detail dokumentasi.</p>
        </div>
      </div>

      {/* Floating Interactive Chatbot Frame */}
      <div className="generic-chat-frame">
        <div className="chat-hdr">
          <span className="indicator"></span>
          <h5>{project.title} AI Assistant</h5>
        </div>

        <div className="chat-messages-box">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`chat-row ${msg.sender}`}>
              <div className="chat-bubble">{msg.text}</div>
            </div>
          ))}
        </div>

        <div className="chat-quick-buttons">
          <span className="title">Tanyakan Detail:</span>
          <div className="btn-chips">
            <button onClick={() => handleQuickAsk('about', 'Apa rincian umum proyek ini?')}>🔍 Tentang Proyek</button>
            <button onClick={() => handleQuickAsk('challenge', 'Apa kendala sebelum sistem aktif?')}>⚠️ Tantangan Utama</button>
            <button onClick={() => handleQuickAsk('solution', 'Bagaimana Kodeflow menyelesaikan masalah ini?')}>💡 Solusi Teknis</button>
            <button onClick={() => handleQuickAsk('results', 'Apa hasil nyata dari sistem?')}>📈 Hasil &amp; Dampak</button>
          </div>
        </div>

        <form onSubmit={handleSendChat} className="chat-input-bar">
          <input 
            type="text" 
            placeholder="Tanyakan detail proyek..." 
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
          />
          <button type="submit"><Send size={12} /></button>
        </form>
      </div>

      <style>{`
        .generic-proto-container {
          display: flex;
          width: 100%;
          height: 100%;
          background: #090d16;
          color: #94a3b8;
          font-family: 'Inter', sans-serif;
          position: relative;
        }

        .generic-main-info {
          flex-grow: 1;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          overflow-y: auto;
          padding-right: 300px;
        }

        .project-header-box h2 {
          color: white;
          font-family: 'Outfit', sans-serif;
          margin-bottom: 6px;
        }
        .project-header-box p {
          color: #64748b;
          font-size: 0.85rem;
        }

        .cat-label {
          color: #e53e3e;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .tech-tags-proto {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .proto-tag-badge {
          background: rgba(229, 62, 62, 0.05);
          border: 1px solid rgba(229, 62, 62, 0.1);
          color: #ff6b6b;
          font-size: 0.7rem;
          padding: 3px 8px;
          border-radius: 4px;
          font-weight: 500;
        }

        .info-quick-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .q-card {
          background: #0d1222;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          padding: 12px;
        }

        .q-card .q-lbl {
          font-size: 0.65rem;
          color: #64748b;
          display: block;
        }
        .q-card .q-val {
          font-size: 0.85rem;
          font-weight: 600;
          color: white;
        }

        .simulator-helper-alert {
          background: rgba(59, 130, 246, 0.06);
          border: 1px solid rgba(59, 130, 246, 0.15);
          color: #93c5fd;
          padding: 12px;
          border-radius: 8px;
          font-size: 0.75rem;
        }

        /* Generic Chat Frame */
        .generic-chat-frame {
          position: absolute;
          top: 24px;
          right: 24px;
          bottom: 24px;
          width: 260px;
          background: #0b0f19;
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .generic-chat-frame .chat-hdr {
          background: #0d1222;
          padding: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .generic-chat-frame .indicator {
          width: 6px;
          height: 6px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 6px #10b981;
        }

        .generic-chat-frame .chat-hdr h5 {
          margin: 0;
          color: white;
          font-size: 0.8rem;
        }

        .chat-messages-box {
          flex-grow: 1;
          padding: 10px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .chat-row {
          display: flex;
        }
        .chat-row.bot { justify-content: flex-start; }
        .chat-row.user { justify-content: flex-end; }

        .chat-bubble {
          padding: 8px 12px;
          border-radius: 8px;
          max-width: 85%;
          font-size: 0.7rem;
          line-height: 1.4;
          white-space: pre-line;
        }

        .bot .chat-bubble {
          background: #1e293b;
          color: #d1d5db;
          border-bottom-left-radius: 2px;
        }

        .user .chat-bubble {
          background: #e53e3e;
          color: white;
          border-bottom-right-radius: 2px;
        }

        .chat-quick-buttons {
          padding: 8px 10px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: rgba(255,255,255,0.01);
        }
        .chat-quick-buttons .title {
          font-size: 0.65rem;
          color: #64748b;
          display: block;
          margin-bottom: 4px;
        }

        .btn-chips {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .btn-chips button {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.05);
          color: #94a3b8;
          font-size: 0.65rem;
          padding: 4px 8px;
          border-radius: 4px;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
        }

        .btn-chips button:hover {
          color: white;
          background: rgba(229,62,62,0.08);
          border-color: rgba(229,62,62,0.15);
        }

        .chat-inputbar {
          display: flex;
          padding: 6px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #0d1222;
        }

        .chat-input-bar {
          display: flex;
          padding: 6px;
          border-top: 1px solid rgba(255,255,255,0.05);
          background: #0d1222;
        }

        .chat-input-bar input {
          flex-grow: 1;
          background: none;
          border: none;
          color: white;
          font-size: 0.7rem;
          outline: none;
          padding: 4px;
        }

        .chat-input-bar button {
          background: #e53e3e;
          border: none;
          color: white;
          width: 22px;
          height: 22px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
