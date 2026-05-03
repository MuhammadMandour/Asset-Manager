# AssetTrack

AssetTrack is a complete, production-ready full-stack web application for hardware asset management, designed for software development teams to replace manual spreadsheet-based processes.

## Prerequisites
- Java 17+
- Node.js 18+ and npm
- Docker & Docker Compose

## Quick Start

### 1. Start PostgreSQL (and pgAdmin)
```bash
docker-compose up -d
```
- PostgreSQL: `localhost:5432`
- pgAdmin UI: `http://localhost:5050` (Login: admin@assettrack.com / admin)

### 2. Backend
```bash
cd backend
cp .env.example .env   # fill in MAIL_USERNAME, MAIL_PASSWORD, JWT_SECRET if needed
./mvnw spring-boot:run
```
- API base: `http://localhost:8080/api`
- Swagger UI: `http://localhost:8080/swagger-ui.html`

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
- App: `http://localhost:5173`

## Environment Variables (backend/.env)
```env
DB_URL=jdbc:postgresql://localhost:5432/assettrack
DB_USER=assettrack_user
DB_PASSWORD=assettrack_pass
JWT_SECRET=changeme_super_secret_256bit_key_here
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
```

## Default Test Credentials
| Role      | Email                    | Password     |
|-----------|--------------------------|--------------|
| Admin     | admin@assettrack.com     | Admin@1234   |
| Manager   | manager@assettrack.com   | Manager@1234 |
| Developer | dev@assettrack.com       | Dev@1234     |

## Features
- **Role-based Access Control**: Admin, Manager, and Developer roles.
- **Asset Management**: Full CRUD for assets, categorizing by type, status, and condition.
- **Asset Allocation**: Assign/unassign assets to users, keeping full allocation history.
- **Condition Reports**: Users can report condition issues for their assigned assets.
- **Warranty Tracking & Alerts**: Automated warnings for expiring warranties.
- **Low Stock Alerts**: Automated alerts when unassigned items fall below a threshold.
- **Dashboard & Analytics**: Real-time stats, distribution charts, and summary reports.

## Architecture
- **Backend**: Spring Boot 3 (Java 17), Spring Security + JWT, Spring Data JPA, PostgreSQL. MapStruct for DTO mappings.
- **Frontend**: React (Vite), Tailwind CSS, Recharts for visual analytics, headless UI components.
