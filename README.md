# PINCOREHUB Laravel Application

This repository contains the Laravel application for PINCOREHUB, ported from a Next.js App Router project. It's designed to be compatible with shared hosting environments like Qserver (cPanel).

## Features Ported:
- **Authentication**: User registration, login (email/password, Google OAuth), role-based access (USER, ADMIN, INSTRUCTOR).
- **Database**: MySQL integration via Eloquent ORM for Users, Courses, Lessons, Enrollments, Payments, Bookings, BlogPosts, Comments, Certificates.
- **Payment Integration**: Paystack payment gateway for course enrollment and bookings.
- **Course Management**: Admin CRUD for courses and lessons, student enrollment, progress tracking.
- **Blog Management**: Admin/Instructor CRUD for blog posts, public blog list.
- **User Profile**: User-editable profiles with image uploads.
- **Email System**: Transactional emails for registration and payment confirmations.
- **File Uploads**: Cloudinary integration for media storage.
- **Design**: Tailwind CSS-inspired modern, clean, and responsive UI.

## Local Development Setup

1.  **Clone the repository:**
    \`\`\`bash
    git clone <your-repo-url> pincohub-laravel
    cd pincohub-laravel
    \`\`\`
2.  **Install Composer dependencies:**
    \`\`\`bash
    composer install
    \`\`\`
3.  **Install NPM dependencies and compile assets:**
    \`\`\`bash
    npm install
    npm run dev # For development
    # npm run build # For production assets
    \`\`\`
4.  **Create `.env` file:**
    Copy `.env.example` to `.env` and configure your environment variables:
    \`\`\`dotenv
    APP_NAME="PINCOREHUB"
    APP_ENV=local
    APP_KEY=
    APP_DEBUG=true
    APP_URL=http://localhost:8000 # Or your local development URL

    LOG_CHANNEL=stack
    LOG_LEVEL=debug

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=pincohub_db # Create this database in MySQL
    DB_USERNAME=root
    DB_PASSWORD=

    BROADCAST_DRIVER=log
    CACHE_DRIVER=file
    FILESYSTEM_DISK=local
    QUEUE_CONNECTION=sync
    SESSION_DRIVER=file
    SESSION_LIFETIME=120

    MEMCACHED_HOST=127.0.0.1
    REDIS_HOST=127.0.0.1
    REDIS_PASSWORD=null
    REDIS_PORT=6379

    MAIL_MAILER=smtp
    MAIL_HOST=mailpit
    MAIL_PORT=1025
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"

    AWS_ACCESS_KEY_ID=
    AWS_SECRET_ACCESS_KEY=
    AWS_DEFAULT_REGION=us-east-1
    AWS_BUCKET=
    AWS_USE_PATH_STYLE_ENDPOINT=false

    PUSHER_APP_ID=
    PUSHER_APP_KEY=
    PUSHER_APP_SECRET=
    PUSHER_APP_CLUSTER=mt1

    VITE_APP_NAME="${APP_NAME}"
    VITE_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
    VITE_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

    # Custom Environment Variables
    PAYSTACK_SECRET_KEY=sk_test_your-paystack-test-key-here
    PAYSTACK_PUBLIC_KEY=pk_test_your-paystack-public-key-here # Add this for frontend use

    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret

    GOOGLE_CLIENT_ID=your_google_client_id
    GOOGLE_CLIENT_SECRET=your_google_client_secret
    GOOGLE_REDIRECT_URI="${APP_URL}/auth/google/callback"

    # For Qserver SMTP
    # MAIL_HOST=mail.pincohub.com.ng
    # MAIL_PORT=587
    # MAIL_USERNAME=info@pincohub.com.ng
    # MAIL_PASSWORD=your-email-password
    # MAIL_ENCRYPTION=tls # Or ssl depending on Qserver
    \`\`\`
5.  **Generate Application Key:**
    \`\`\`bash
    php artisan key:generate
    \`\`\`
6.  **Run Migrations:**
    \`\`\`bash
    php artisan migrate
    \`\`\`
7.  **Seed Database (Optional):**
    You can create seeders to populate your database with initial data.
    \`\`\`bash
    php artisan db:seed
    \`\`\`
8.  **Start Development Server:**
    \`\`\`bash
    php artisan serve
    \`\`\`
    Access the application at `http://localhost:8000`.

## Deployment to Qserver (cPanel)

Deploying a Laravel application to cPanel involves a few key steps to ensure it runs correctly.

1.  **Prepare your Laravel application for production:**
    \`\`\`bash
    npm run build # Compile your assets for production
    php artisan config:cache
    php artisan route:cache
    php artisan view:cache
    \`\`\`
2.  **Create a Database on cPanel:**
    *   Log in to your cPanel.
    *   Go to "MySQL Databases".
    *   Create a new database (e.g., `pincohub_db`).
    *   Create a new user (e.g., `pincohub_user`) and assign a strong password.
    *   Add the user to the database and grant "All Privileges".
    *   Note down the full database name (e.g., `cpaneluser_pincohub_db`) and username (e.g., `cpaneluser_pincohub_user`).
3.  **Update `.env` for Production:**
    *   Edit your local `.env` file with production details:
        \`\`\`dotenv
        APP_ENV=production
        APP_DEBUG=false
        APP_URL=https://pincohub.com.ng

        DB_CONNECTION=mysql
        DB_HOST=localhost # Usually 'localhost' on cPanel
        DB_PORT=3306
        DB_DATABASE=cpaneluser_pincohub_db # Your full cPanel database name
        DB_USERNAME=cpaneluser_pincohub_user # Your full cPanel database username
        DB_PASSWORD=your-database-password

        MAIL_HOST=mail.pincohub.com.ng
        MAIL_PORT=587
        MAIL_USERNAME=info@pincohub.com.ng
        MAIL_PASSWORD=your-email-password
        MAIL_ENCRYPTION=tls # Or ssl, check Qserver's documentation
        MAIL_FROM_ADDRESS="info@pincohub.com.ng"
        MAIL_FROM_NAME="PINCOREHUB"

        # ... other production keys (Paystack, Cloudinary, Google OAuth)
        \`\`\`
4.  **Upload Files via cPanel File Manager or FTP:**
    *   **Compress your Laravel project (excluding `node_modules` and `vendor` directories)** into a `.zip` file.
    *   Log in to cPanel.
    *   Go to "File Manager".
    *   Navigate to your `public_html` directory (or the domain's root directory, e.g., `pincohub.com.ng`).
    *   Upload the `.zip` file and extract it. This will place all your Laravel files directly into `public_html`.
    *   **Crucial Step**: Move all files and folders *except* the `public` folder from `public_html` to a directory *outside* of `public_html` (e.g., `../pincohub_app`). This is for security.
    *   Move the *contents* of the `public` folder (e.g., `index.php`, `web.config`, `mix-manifest.json`, `css`, `js`) into the `public_html` directory.
    *   **Adjust `index.php`**: Open `public_html/index.php` and modify the paths to `vendor/autoload.php` and `bootstrap/app.php` to point to your new Laravel root directory (e.g., `../pincohub_app/vendor/autoload.php`).
        \`\`\`php
        // In public_html/index.php
        require __DIR__.'/../pincohub_app/vendor/autoload.php';
        $app = require_once __DIR__.'/../pincohub_app/bootstrap/app.php';
        \`\`\`
5.  **Run Migrations on cPanel:**
    *   Go to "Terminal" in cPanel (if available) or use SSH.
    *   Navigate to your Laravel root directory (e.g., `cd ../pincohub_app`).
    *   Run: `php artisan migrate`
    *   If you don't have SSH/Terminal access, you might need to use a tool like "phpMyAdmin" to manually import your database schema, or use a custom script to run migrations.
6.  **Set Permissions:**
    *   Ensure the `storage` and `bootstrap/cache` directories (and their subdirectories) have write permissions (e.g., `755` or `775`). You can usually do this via cPanel File Manager by right-clicking the folder and selecting "Change Permissions".
7.  **Verify `php.ini` (Optional but Recommended):**
    *   Check your PHP version (Laravel 10+ requires PHP 8.1+).
    *   Ensure necessary PHP extensions are enabled (e.g., `pdo_mysql`, `mbstring`, `tokenizer`, `xml`, `curl`, `gd`, `json`, `fileinfo`). You can usually manage this in cPanel under "Select PHP Version".

## Differences from Next.js (Qserver Compatibility)

*   **Server-Side Rendering (SSR) vs. Traditional PHP**: Next.js App Router provides advanced SSR and Server Components. Laravel uses traditional server-side rendering with Blade templates. While both render HTML on the server, Next.js's approach is more integrated with React's component model and client-side hydration.
*   **API Routes vs. Laravel Controllers**: Next.js API Routes are replaced by Laravel Controllers and API routes (`routes/api.php`).
*   **Database ORM**: Prisma (TypeScript) is replaced by Eloquent ORM (PHP).
*   **Deployment**: Next.js is optimized for platforms like Vercel. Laravel is more flexible for traditional shared hosting, but requires manual configuration of the `public` directory and `.htaccess` rules.
*   **Static Assets**: Next.js handles asset serving automatically. In Laravel, compiled assets (CSS, JS) are placed in the `public` directory and linked in Blade templates.
*   **Environment Variables**: Both use `.env` files, but Laravel's `.env` is read by the PHP server, not directly exposed to the client.

## Security Considerations

*   **CSRF Protection**: Laravel automatically includes CSRF protection for forms. Ensure you use `@csrf` directive in your Blade forms.
*   **Input Validation**: Laravel's robust validation rules are used in controllers to sanitize and validate all incoming data.
*   **HTTPS**: Ensure your domain `pincohub.com.ng` has an SSL certificate installed (Qserver provides Comodo Positive SSL). Laravel automatically redirects to HTTPS if `APP_URL` is set to `https://`.
*   **Environment Variables**: Never expose sensitive keys directly in client-side code. All API keys are handled server-side in Laravel.
