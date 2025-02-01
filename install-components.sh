# Установка Node.js через nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18

# Установка PM2
npm install -g pm2

# Установка и настройка Nginx
apt install nginx -y
systemctl enable nginx
systemctl start nginx

# Установка PostgreSQL
apt install postgresql postgresql-contrib -y
systemctl enable postgresql
systemctl start postgresql 