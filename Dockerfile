# Build stage
FROM php:8.3-fpm as builder

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git curl zip unzip \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Copy composer files
COPY composer.json composer.lock ./

# Install composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer && \
    composer install --no-dev --optimize-autoloader

# Copy package.json and build React
COPY package.json package-lock.json ./
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists* && \
    npm install && \
    npm run build

# Copy application code
COPY . .

# Runtime stage
FROM php:8.3-fpm

WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    nginx postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql

# Copy from builder
COPY --from=builder /var/www/html /var/www/html

# Copy nginx config
COPY nginx.conf /etc/nginx/sites-available/default

# Create necessary directories
RUN mkdir -p /var/run/php && \
    chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

EXPOSE 80

# Start both PHP-FPM and Nginx
CMD sh -c "php artisan migrate --force && \
    php artisan config:cache && \
    php artisan route:cache && \
    php-fpm -D && \
    nginx -g 'daemon off;'"
