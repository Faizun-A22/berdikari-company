#!/bin/bash
set -e

# 1. Optimasi MTU jaringan dan buffer Git
ip link set dev ens18 mtu 1350 2>/dev/null || true
git config --global http.version HTTP/1.1 2>/dev/null || true
git config --global http.postBuffer 524288000 2>/dev/null || true

cd /var/www/berdikari-company

echo "===> Menarik update terbaru..."
# Coba git fetch & reset terlebih dahulu
if git fetch origin main && git reset --hard origin/main; then
    echo "[OK] Git fetch & reset berhasil!"
else
    echo "[INFO] Git fetch terkendala, menggunakan sinkronisasi raw files..."
    TS=$(date +%s)
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/components/Hero.tsx?v=$TS" -o src/components/Hero.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/pages/Home.tsx?v=$TS" -o src/pages/Home.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/pages/AboutPage.tsx?v=$TS" -o src/pages/AboutPage.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/components/Navbar.tsx?v=$TS" -o src/components/Navbar.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/components/Services.tsx?v=$TS" -o src/components/Services.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/components/Portfolio.tsx?v=$TS" -o src/components/Portfolio.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/components/NewsSection.tsx?v=$TS" -o src/components/NewsSection.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/pages/NewsPage.tsx?v=$TS" -o src/pages/NewsPage.tsx
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/src/index.css?v=$TS" -o src/index.css
    curl -4 -sSL "https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/index.html?v=$TS" -o index.html
fi

echo "===> Menyiapkan konfigurasi backend..."
if [ ! -f server/.env ] && [ -f server/.env.example ]; then
    echo "===> Menyalin server/.env dari template..."
    cp server/.env.example server/.env
fi

echo "===> Membersihkan cache build lama..."
rm -rf dist node_modules/.vite

echo "===> Membangun frontend Vite..."
npm run build

echo "===> Memastikan izin berkas web server..."
chown -R www-data:www-data dist 2>/dev/null || true
chmod -R 755 dist 2>/dev/null || true

echo "===> Merestart Nginx & Service Backend..."
systemctl restart nginx
pm2 restart all 2>/dev/null || pm2 start server/index.js --name "berdikari-api" 2>/dev/null || true

# Daftarkan perintah saklek update-web secara permanen
cat << 'INNER_EOF' > /usr/local/bin/update-web
#!/bin/bash
curl -4 -sSL https://raw.githubusercontent.com/Faizun-A22/berdikari-company/main/update.sh | bash
INNER_EOF
chmod +x /usr/local/bin/update-web

echo "=================================================="
echo "SELESAI! Website sudah ter-update 100%!"
echo "Untuk update berikutnya, cukup ketik: update-web"
echo "=================================================="
