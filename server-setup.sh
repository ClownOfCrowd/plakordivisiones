# Обновление системы
apt update && apt upgrade -y

# Установка необходимого ПО
apt install -y nginx nodejs npm postgresql

# Настройка swap (на всякий случай)
fallocate -l 4G /swapfile
chmod 600 /swapfile
mkswap /swapfile
swapon /swapfile 