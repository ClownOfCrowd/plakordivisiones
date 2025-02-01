# Установка Certbot
apt install certbot python3-certbot-nginx -y

# Получение SSL-сертификата
# Замените example.com на ваш домен
certbot --nginx -d example.com -d www.example.com

# Проверка автообновления
certbot renew --dry-run 