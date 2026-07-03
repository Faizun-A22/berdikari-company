import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'web',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    // Parse URL query parameters to pre-fill referral details
    const params = new URLSearchParams(window.location.search);
    const ref = params.get('ref');
    if (ref) {
      let selectedService = 'web';
      let projectName = '';

      if (ref === 'erp-aethera') {
        selectedService = 'web';
        projectName = 'Aethera Enterprise ERP';
      } else if (ref === 'medplus-health') {
        selectedService = 'mobile';
        projectName = 'MedPlus Health Solution';
      } else if (ref === 'solaria-ecommerce') {
        selectedService = 'web';
        projectName = 'Solaria Premium E-Commerce';
      } else if (ref === 'velo-wallet') {
        selectedService = 'mobile';
        projectName = 'Velo E-Wallet & Crypto';
      }

      if (projectName) {
        setFormData((prev) => ({
          ...prev,
          service: selectedService,
          message: `Saya tertarik berkonsultasi mengenai solusi sistem serupa dengan proyek portofolio Anda: "${projectName}". Mohon hubungi saya untuk menjadwalkan pertemuan diskusi.`,
        }));
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error on keypress
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Nama lengkap wajib diisi';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Alamat email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Nomor WhatsApp wajib diisi';
    } else if (!/^[0-9+]{8,15}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      newErrors.phone = 'Nomor telepon tidak valid (8-15 digit)';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Deskripsi proyek wajib diisi';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Tulis deskripsi proyek minimal 10 karakter';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setShowSuccessModal(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          service: 'web',
          message: '',
        });
      } else {
        const data = await res.json();
        setSubmitError(data.error || 'Gagal mengirim pesan. Silakan coba kembali.');
      }
    } catch (err) {
      setSubmitError('Koneksi ke server gagal. Coba cek koneksi internet Anda.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesMap: Record<string, string> = {
    web: 'Website & Web App Development',
    mobile: 'Mobile App Development (Android/iOS)',
    uiux: 'UI/UX Design & Prototyping',
    cloud: 'Cloud Management & DevOps',
    custom: 'Sistem Custom / Integrasi API',
    consulting: 'Konsultasi & Audit Teknologi',
  };

  return (
    <section id="contact" className="contact-section">
      <div className="glow-orb contact-glow-1"></div>
      <div className="glow-orb contact-glow-2"></div>

      <div className="container">
        <div className="section-title">
          <h2>Konsultasikan Proyek Anda</h2>
          <p>
            Siap mendigitalkan bisnis Anda? Hubungi kami hari ini untuk konsultasi gratis 
            dan penawaran harga terbaik.
          </p>
          <div className="accent-bar"></div>
        </div>

        <div className="contact-grid">
          {/* Contact Information Sidebar */}
          <div className="contact-info-column">
            <h3 className="info-title">Mari Berkolaborasi!</h3>
            <p className="info-desc">
              Sampaikan ide Anda, dan biarkan tim analis sistem serta pengembang berpengalaman kami 
              mewujudkannya menjadi solusi bernilai tinggi.
            </p>

            <div className="info-cards-list">
              <a href="mailto:hello@berdikaritech.com" className="card-glass info-item-card">
                <div className="info-icon-wrapper">
                  <Mail size={20} />
                </div>
                <div className="info-item-details">
                  <span className="info-item-label">Kirim Email</span>
                  <span className="info-item-value">hello@berdikaritech.com</span>
                </div>
              </a>

              <a href="https://wa.me/6281234567890?text=Halo%20Berdikari%20Tech%2C%20saya%20tertarik%20untuk%20berkonsultasi%20mengenai%20proyek%20IT." target="_blank" rel="noopener noreferrer" className="card-glass info-item-card">
                <div className="info-icon-wrapper">
                  <Phone size={20} />
                </div>
                <div className="info-item-details">
                  <span className="info-item-label">Hubungi WhatsApp</span>
                  <span className="info-item-value">+62 812-3456-7890</span>
                </div>
              </a>

              <div className="card-glass info-item-card">
                <div className="info-icon-wrapper">
                  <MapPin size={20} />
                </div>
                <div className="info-item-details">
                  <span className="info-item-label">Kantor Pusat</span>
                  <span className="info-item-value">Sudirman Central Business District (SCBD), Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card-glass contact-form-card">
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nama Lengkap <span className="text-red">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? 'input-error' : ''}
                    placeholder="Contoh: Budi Santoso"
                  />
                  {errors.name && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="company">Nama Perusahaan <span className="text-muted-opt">(Opsional)</span></label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Contoh: PT Sukses Bersama"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Alamat Email <span className="text-red">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? 'input-error' : ''}
                    placeholder="Contoh: budi@email.com"
                  />
                  {errors.email && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.email}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Nomor WhatsApp <span className="text-red">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? 'input-error' : ''}
                    placeholder="Contoh: 08123456789"
                  />
                  {errors.phone && (
                    <span className="error-message">
                      <AlertCircle size={14} /> {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="service">Layanan Yang Dibutuhkan</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                >
                  <option value="web">{servicesMap.web}</option>
                  <option value="mobile">{servicesMap.mobile}</option>
                  <option value="uiux">{servicesMap.uiux}</option>
                  <option value="cloud">{servicesMap.cloud}</option>
                  <option value="custom">{servicesMap.custom}</option>
                  <option value="consulting">{servicesMap.consulting}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message">Deskripsi Proyek Anda <span className="text-red">*</span></label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? 'input-error' : ''}
                  placeholder="Ceritakan secara singkat ide, fitur utama, dan tujuan aplikasi/website yang ingin dibangun..."
                ></textarea>
                {errors.message && (
                  <span className="error-message">
                    <AlertCircle size={14} /> {errors.message}
                  </span>
                )}
              </div>

              {submitError && (
                <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <AlertCircle size={14} /> {submitError}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-submit w-full" disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim Pesan...' : (
                  <>
                    Kirim Permintaan Konsultasi <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-backdrop" onClick={() => setShowSuccessModal(false)}>
          <div className="success-modal card-glass" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-box">
              <CheckCircle size={48} />
            </div>
            <h3>Pesan Terkirim!</h3>
            <p>
              Terima kasih telah menghubungi Berdikari Tech. Konsultan IT kami akan meninjau kebutuhan 
              proyek Anda dan menghubungi Anda via WhatsApp or Email dalam waktu 1x24 jam.
            </p>
            <button className="btn btn-primary" onClick={() => setShowSuccessModal(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}

      <style>{`
        .contact-section {
          background-color: var(--bg-dark);
          position: relative;
          overflow: hidden;
        }

        .contact-glow-1 {
          top: 20%;
          right: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.02) 0%, rgba(255, 255, 255, 0) 65%);
        }

        .contact-glow-2 {
          bottom: 15%;
          left: 5%;
          background: radial-gradient(circle, rgba(229, 62, 62, 0.03) 0%, rgba(255, 255, 255, 0) 65%);
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 48px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 991px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Sidebar info */
        .contact-info-column {
          text-align: left;
        }

        .info-title {
          font-size: 1.85rem;
          margin-bottom: 16px;
          color: var(--text-primary);
        }

        .info-desc {
          font-size: 1rem;
          color: var(--text-secondary);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .info-cards-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .info-item-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px 24px;
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
        }

        .info-item-card:hover {
          transform: translateX(4px) translateY(0);
        }

        .info-icon-wrapper {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          background: rgba(229, 62, 62, 0.04);
          border: 1px solid rgba(229, 62, 62, 0.08);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .info-item-card:hover .info-icon-wrapper {
          background: var(--primary);
          color: var(--white);
          box-shadow: 0 0 10px rgba(229, 62, 62, 0.25);
        }

        .info-item-details {
          display: flex;
          flex-direction: column;
        }

        .info-item-label {
          font-size: 0.8rem;
          color: var(--text-muted);
        }

        .info-item-value {
          font-family: var(--font-heading);
          font-weight: 700;
          font-size: 0.95rem;
          color: var(--text-primary);
        }

        /* Form styling */
        .contact-form-card {
          padding: 40px;
          text-align: left;
          background: #ffffff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0, 0, 0, 0.01);
        }

        @media (max-width: 480px) {
          .contact-form-card {
            padding: 24px;
          }
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        @media (max-width: 768px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .form-group {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          font-family: var(--font-heading);
          font-weight: 600;
          font-size: 0.875rem;
          color: var(--text-primary);
          margin-bottom: 8px;
        }

        .text-muted-opt {
          color: var(--text-muted);
          font-weight: 400;
        }

        .form-group input, 
        .form-group select, 
        .form-group textarea {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          color: var(--text-primary);
          padding: 12px 16px;
          font-family: var(--font-body);
          font-size: 0.925rem;
          transition: var(--transition-fast);
          width: 100%;
        }

        .form-group input:focus, 
        .form-group select:focus, 
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px var(--primary-glow-intense);
          background: #ffffff;
        }

        .form-group select option {
          background: #ffffff;
          color: var(--text-primary);
        }

        .form-group textarea {
          resize: vertical;
        }

        /* Error States */
        .input-error {
          border-color: rgba(229, 62, 62, 0.5) !important;
          background: rgba(229, 62, 62, 0.02) !important;
        }

        .error-message {
          color: #dc2626;
          font-size: 0.75rem;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .btn-submit {
          padding: 14px 28px;
          font-size: 1rem;
          margin-top: 10px;
        }

        .btn-submit:disabled {
          background-color: var(--text-muted);
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        /* Success Dialog */
        .success-modal {
          max-width: 450px;
          padding: 40px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        .success-icon-box {
          color: #10b981;
          margin-bottom: 8px;
          animation: pulseGlow 1.5s infinite ease-in-out;
        }

        .success-modal h3 {
          font-size: 1.5rem;
          color: var(--text-primary);
        }

        .success-modal p {
          font-size: 0.925rem;
          color: var(--text-secondary);
          line-height: 1.6;
          margin-bottom: 8px;
        }
      `}</style>
    </section>
  );
}
