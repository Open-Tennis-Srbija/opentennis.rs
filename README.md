<p align="center">
  <img src="public/logo.svg" alt="Open Tennis Srbija" width="120" />
</p>

# Open Tennis Srbija

An open-source platform for documenting Serbian elite and recreational tennis. Browse player profiles, match results, courts, leagues, and tournament data.

**Live:** [opentennis.rs](https://opentennis.rs)

## Tech Stack

- **Backend:** Laravel 13, PHP 8.2+
- **Frontend:** Vue 3 + Inertia.js, SCSS
- **Build:** Vite, Tailwind CSS
- **Database:** MySQL/PostgreSQL

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/bemapps/opentennis.rs.git
cd opentennis.rs

# Install PHP dependencies
composer install

# Install JS dependencies
npm install

# Copy environment file and generate app key
cp .env.example .env
php artisan key:generate

# Run migrations and seed the database
php artisan migrate --seed

# Build frontend assets
npm run build

# Start the development server
php artisan serve
```

For development with hot-reload:

```bash
npm run dev
```

### Environment Variables

Key variables to configure in `.env`:

| Variable | Description |
|---|---|
| `APP_URL` | Your application URL |
| `NOTIFICATION_EMAILS` | Comma-separated list of emails for match notifications |
| `DEV_NOTIFICATION_EMAIL` | Email for non-production match notifications |
| `GOOGLE_ANALYTICS_ID` | Google Analytics 4 measurement ID |
| `MAIL_*` | SMTP mail configuration |

## Project Structure

```
app/
  Algorithm/      # ELO rating algorithms (deprecated)
  Http/Controllers/  # Route controllers
  Models/         # Eloquent models (Player, TennisMatch, Court, League, etc.)
  Mail/           # Mailable classes
resources/
  js/Pages/       # Vue page components (Inertia)
  css/sass/       # SCSS styles
  views/          # Blade templates
routes/
  web.php         # Application routes
database/
  migrations/     # Database schema
  seeders/        # Seed data
```

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
