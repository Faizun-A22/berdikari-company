#!/bin/bash
set -e

echo "=========================================="
echo "   PEMERIKSAAN & PERBAIKAN TOTAL SERVER   "
echo "=========================================="

cd /var/www/berdikari-company

# 1. Pastikan folder dist di-build ulang dengan kode terbaru
echo "===> Membangun frontend Vite terbaru..."
rm -rf dist node_modules/.vite
npm run build

chown -R www-data:www-data dist 2>/dev/null || true
chmod -R 755 dist 2>/dev/null || true

# 2. Pastikan backend Node.js (PM2) berjalan di port 3000
echo "===> Memastikan backend API (PM2) aktif..."
if [ ! -f "server/.env" ] && [ -f "server/.env.example" ]; then
    cp server/.env.example server/.env
fi
pm2 restart all 2>/dev/null || pm2 start server/index.js --name "berdikari-api" 2>/dev/null || true

# 3. Buat Sertifikat SSL Mandiri agar Nginx bisa melayani Port 443 (Full SSL) sekaligus Port 80 (Flexible)
echo "===> Memastikan sertifikat SSL lokal tersedia untuk Port 443..."
mkdir -p /etc/ssl/certs /etc/ssl/private
if [ ! -f /etc/ssl/certs/berdikari.crt ]; then
    openssl req -x509 -nodes -days 3650 -newkey rsa:2048 \
      -keyout /etc/ssl/private/berdikari.key \
      -out /etc/ssl/certs/berdikari.crt \
      -subj "/C=ID/ST=Jakarta/L=Jakarta/O=Berdikari/CN=berdignus.my.id" 2>/dev/null || true
fi

# 4. Optimasi MTU & Firewall (Mencegah drop paket ens18 yang membuat muter-muter)
echo "===> Mengoptimalkan MTU jaringan & firewall port 80/443..."
ip link set dev ens18 mtu 1400 2>/dev/null || true
iptables -t mangle -A POSTROUTING -p tcp --tcp-flags SYN,RST SYN -j TCPMSS --clamp-mss-to-pmtu 2>/dev/null || true
ufw allow 80/tcp 2>/dev/null || true
ufw allow 443/tcp 2>/dev/null || true
iptables -I INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null || true
iptables -I INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null || true

# 5. Konfigurasi NGINX (Melayani HTTP 80 & HTTPS 443 sekaligus tanpa delay)
echo "===> Mengonfigurasi NGINX (Dual Port 80 & 443)..."
cat << 'EOF' > /etc/nginx/sites-available/berdikari
server {
    listen 80 default_server;
    listen 443 ssl default_server;
    server_name berdignus.my.id www.berdignus.my.id _;

    ssl_certificate /etc/ssl/certs/berdikari.crt;
    ssl_certificate_key /etc/ssl/private/berdikari.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/berdikari-company/dist;
    index index.html;

    # Anti-Cache untuk file HTML agar browser tidak menahan tampilan lama
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires 0;
        try_files $uri /index.html;
    }

    # Frontend Single Page App & static assets
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Backend API Proxy dengan timeout cepat (anti hanging)
    location /api/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_connect_timeout 3s;
        proxy_read_timeout 10s;
        proxy_cache_bypass $http_upgrade;
    }

    # Uploads Proxy
    location /uploads/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
    }
}
EOF

# Hapus file ganda di sites-enabled agar tidak bentrok
rm -f /etc/nginx/sites-enabled/*
ln -sf /etc/nginx/sites-available/berdikari /etc/nginx/sites-enabled/berdikari

# 6. Hentikan Caddy jika berjalan di VPS agar tidak merebut port
systemctl stop caddy 2>/dev/null || true
systemctl disable caddy 2>/dev/null || true
pkill -9 caddy 2>/dev/null || true

# 7. Uji dan restart Nginx
echo "===> Menguji konfigurasi Nginx..."
nginx -t
systemctl restart nginx
echo "[OK] Nginx berhasil melayani Port 80 (HTTP) dan Port 443 (HTTPS)!"

echo "=========================================="
echo "HASIL TES RESPON LOKAL:"
echo "------------------------------------------"
curl -I -s http://127.0.0.1:80 | head -n 5 || echo "Port 80 belum merespons"
curl -k -I -s https://127.0.0.1:443 | head -n 5 || echo "Port 443 belum merespons"
echo "------------------------------------------"
echo "SELESAI! Silakan akses: https://berdignus.my.id"
echo "=========================================="
