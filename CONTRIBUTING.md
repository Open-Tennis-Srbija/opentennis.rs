# Contributing to Open Tennis Srbija

Thanks for your interest in contributing! This guide will help you get started.

## Getting Started

1. Fork the repository and clone your fork
2. Install dependencies:

```bash
composer install
npm install
```

3. Copy the environment file and generate a key:

```bash
cp .env.example .env
php artisan key:generate
```

4. Run migrations and seed the database:

```bash
php artisan migrate --seed
```

5. Start the development servers:

```bash
# In one terminal
php artisan serve

# In another terminal
npm run dev
```

## Development Workflow

1. Create a branch from `main`:

```bash
git checkout -b feature/my-feature
```

2. Make your changes
3. Run tests:

```bash
php artisan test
```

4. Commit with a clear message:

```bash
git commit -m "Add player search filter"
```

5. Push and open a Pull Request against `main`

## Project Structure

- **Backend:** Laravel controllers in `app/Http/Controllers/`, models in `app/Models/`
- **Frontend:** Vue 3 pages in `resources/js/Pages/`, SCSS in `resources/css/sass/`
- **Routes:** `routes/web.php`
- **Database:** Migrations in `database/migrations/`, seeders in `database/seeders/`

## Code Style

- **PHP:** Follow PSR-12. Use Laravel conventions for controllers, models, and routes.
- **Vue:** Single-file components with `<script setup>`. Use Composition API.
- **CSS:** SCSS with BEM-like naming. Global page styles go in `resources/css/sass/pages/`. Component-scoped styles use `<style scoped>`.
- **Naming:** Serbian Latin for user-facing text, English for code (variables, functions, classes).

## What to Work On

- Check [open issues](https://github.com/Open-Tennis-Srbija/opentennis.rs/issues) for tasks labeled `good first issue` or `help wanted`
- Bug fixes and test coverage improvements are always welcome
- For larger features, open an issue first to discuss the approach

## Pull Request Guidelines

- Keep PRs focused — one feature or fix per PR
- Include a short description of what changed and why
- Make sure tests pass before requesting review
- Add tests for new functionality when possible

## Reporting Bugs

Open an issue with:

- Steps to reproduce
- Expected vs actual behavior
- Browser/OS if it's a frontend issue

## Questions

If something is unclear, feel free to open an issue or start a discussion. We're happy to help.
