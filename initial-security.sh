# Обновление системы
apt update && apt upgrade -y

# Настройка файрвола
ufw allow 22
ufw allow 80
ufw allow 443
ufw enable

# Установка fail2ban
apt install fail2ban -y 