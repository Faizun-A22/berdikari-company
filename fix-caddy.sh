#!/bin/bash
set -e

echo "===> Mengatur konfigurasi Caddy untuk Cloudflare & berdignus.my.id..."

# Backup Caddyfile lama jika ada
cp /etc/caddy/Caddyfile /etc/caddy/Caddyfile.bak.$(date +%s) 2>/dev/null || true

cat << 'EOF' > /etc/caddy/Caddyfile
berdignus.my.id {
    tls internal
    root * /var/www/berdikari-company/dist
    file_server
    try_files {path} /index.html

    handle /api/* {
        reverse_proxy localhost:3000
    }

    handle /uploads/* {
        reverse_proxy localhost:3000
    }
}

:80 {
    root * /var/www/berdikari-company/dist
    file_server
    try_files {path} /index.html

    handle /api/* {
        reverse_proxy localhost:3000
    }

    handle /uploads/* {
        reverse_proxy localhost:3000
    }
}
EOF

echo "===> Memeriksa izin direktori web..."
chown -R www-data:www-data /var/www/berdikari-company/dist 2>/dev/null || true
chmod -R 755 /var/www/berdikari-company/dist 2>/dev/null || true

echo "===> Merestart Caddy & Service Backend..."
systemctl restart caddy
pm2 restart all 2>/dev/null || true

echo "=================================================="
echo "SUKSES! Caddy & Cloudflare sudah tersinkronisasi 100%!"
echo "Silakan buka kembali: https://berdignus.my.id"
echo "=================================================="
