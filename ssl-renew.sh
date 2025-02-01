# Создаём скрипт для обновления
cat > /etc/cron.d/certbot << EOF
0 */12 * * * root test -x /usr/bin/certbot -a \! -d /run/systemd/shutdown/scheduled && certbot renew --quiet --deploy-hook "systemctl reload nginx"
EOF 