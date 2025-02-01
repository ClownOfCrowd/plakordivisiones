# Установка имени хоста
hostnamectl set-hostname plakor-production

# Установка временной зоны (Испания)
timedatectl set-timezone Europe/Madrid

# Синхронизация времени
apt install chrony -y
systemctl enable chrony
systemctl start chrony 