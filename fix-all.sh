#!/bin/bash
set -e

echo "=========================================="
echo "   PEMERIKSAAN & PERBAIKAN TOTAL SERVER   "
echo "=========================================="

cd /var/www/berdikari-company

# 1. Pastikan folder dist ada dan sudah di-build
if [ ! -f "dist/index.html" ]; then
    echo "===> Membangun frontend Vite..."
    rm -rf dist node_modules/.vite
    npm run build
fi

chown -R www-data:www-data dist 2>/dev/null || true
chmod -R 755 dist 2>/dev/null || true

# 2. Pastikan backend Node.js (PM2) berjalan di port 3000
echo "===> Memastikan backend API (PM2) aktif..."
if [ ! -f "server/.env" ] && [ -f "server/.env.example" ]; then
    cp server/.env.example server/.env
fi
pm2 restart all 2>/dev/null || pm2 start server/index.js --name "berdikari-api" 2>/dev/null || true

# 3. Konfigurasi NGINX
echo "===> Mengonfigurasi NGINX..."
cat << 'EOF' > /etc/nginx/sites-available/berdikari
server {
    listen 80 default_server;
    listen [::]:80 default_server;
    server_name berdignus.my.id www.berdignus.my.id _;

    root /var/www/berdikari-company/dist;
    index index.html;

    # Frontend Single Page App
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads Proxy
    location /uploads/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
}
EOF

# Hapus file ganda di sites-enabled agar tidak bentrok duplicate default_server
rm -f /etc/nginx/sites-enabled/*
ln -sf /etc/nginx/sites-available/berdikari /etc/nginx/sites-enabled/berdikari

# 4. Hentikan Caddy jika berjalan di VPS agar tidak merebut port 80 dari Nginx
systemctl stop caddy 2>/dev/null || true
systemctl disable caddy 2>/dev/null || true
pkill -9 caddy 2>/dev/null || true

# 5. Uji dan restart Nginx
echo "===> Menguji konfigurasi Nginx..."
nginx -t
systemctl restart nginx
echo "[OK] Nginx berhasil di-restart dan melayani port 80!"

echo "=========================================="
echo "HASIL TES RESPON LOKAL:"
echo "------------------------------------------"
curl -I -s http://127.0.0.1:80 | head -n 5 || echo "Port 80 belum merespons"
echo "------------------------------------------"
echo "SELESAI! Silakan refresh browser: https://berdignus.my.id"
echo "=========================================="
