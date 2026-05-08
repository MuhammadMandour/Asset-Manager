# AssetTrack

> A complete, production-ready full-stack hardware asset management system designed for software development teams to streamline asset tracking, allocation, and lifecycle management.

AssetTrack replaces manual spreadsheet-based processes with an intelligent, role-based web application that provides real-time visibility into hardware inventory, automated warranty alerts, and comprehensive asset allocation history.

##  Team Members

| ID | Group | Name |
|---|---|---|
| 36 | 4 | محمد خالد عبدالحميد |
| 39 | 4 | ملك سعد عبدالله |
| 46 | 4 | ياسمين بدر ضياء الدين |
| 11 | 4 | اماني عثمان |
| 14 | 4 | اوليفيا مرقص |

---
##  Overview

**AssetTrack** is an enterprise-grade asset management solution featuring:
- Centralized hardware inventory tracking
- Automated warranty and stock alerts
- Role-based access control
- Real-time analytics dashboards
- Complete audit trails for compliance
- Multi-user asset allocation system

Perfect for tech teams managing laptops, monitors, peripherals, and other IT assets across organizations.

---

##  Prerequisites

- **Java**: 17 or higher
- **Node.js**: 18+ with npm
- **Docker & Docker Compose**: For containerized PostgreSQL database
- **Git**: For version control

---

##  Quick Start

### 1. Start PostgreSQL Database
```bash
docker-compose up -d
```
**Services:**
- PostgreSQL: `localhost:5432`
- pgAdmin UI: `http://localhost:5050` 
  - Login: `admin@assettrack.com` / `admin`

### 2. Configure & Start Backend
```bash
cd backend
cp .env.example .env   # Configure JWT_SECRET, DB credentials, email settings
./mvnw spring-boot:run
```
**Backend Access:**
- API Base: `http://localhost:8080/api`
- Swagger API Docs: `http://localhost:8080/swagger-ui.html`
- Health Check: `http://localhost:8080/actuator/health`

### 3. Install & Start Frontend
```bash
cd frontend
npm install
npm run dev
```
**Frontend:**
- Application: `http://localhost:5173`

---

##  Environment Configuration

### Backend (.env file)

```env
# JWT Configuration - MUST be Base64-encoded 256-bit key (32 bytes)
# Generate with: openssl rand -base64 32
JWT_SECRET=q24GaOQvc7HDVDt0bmX18cFHHYxic1hb2zcJdZZqGmQ=

# Database Configuration
DB_URL=jdbc:postgresql://localhost:5432/assettrack
DB_USER=assettrack_user
DB_PASSWORD=assettrack_pass

# Email Configuration (optional - Mailtrap or MailHog)
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=587
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
```

**Generating JWT Secret:**
```bash
# Linux/macOS
openssl rand -base64 32

# PowerShell
$bytes = New-Object byte[] 32; (New-Object System.Security.Cryptography.RNGCryptoServiceProvider).GetBytes($bytes); [Convert]::ToBase64String($bytes)
```

**Important:** JWT_SECRET must be Base64-encoded. For production, always generate a new secret.

---

##  Default Test Credentials

| Role      | Email                    | Password     |
|-----------|--------------------------|--------------|
| Admin     | admin@assettrack.com     | Admin@1234   |
| Manager   | manager@assettrack.com   | Manager@1234 |
| Developer | dev@assettrack.com       | Dev@1234     |

---

##  Features

### Core Functionality
- **Role-Based Access Control**: Admin, Manager, and Developer roles with granular permissions
- **Asset Management**: Complete CRUD operations with categorization by type, status, and condition
- **Asset Allocation**: Intelligent assign/unassign system with full allocation history tracking
- **Condition Reporting**: User-initiated condition issue reporting for assigned assets
- **Warranty Tracking**: Automated alerts for expiring warranties with configurable thresholds
- **Stock Management**: Low stock alerts for unassigned inventory items
- **Dashboard & Analytics**: Real-time statistics, distribution visualizations, and comprehensive reports

### Advanced Features
- JWT-based authentication and authorization
- Email notifications for critical events
- Scheduler-based automated tasks
- RESTful API with comprehensive documentation
- Full audit trail for compliance

---

##  Architecture

### Technology Stack

**Backend:**
- **Framework**: Spring Boot 3 (Java 17)
- **Authentication**: Spring Security + JWT tokens
- **Database**: PostgreSQL with Spring Data JPA
- **Mapping**: MapStruct for DTO transformations
- **API Documentation**: Springdoc OpenAPI (Swagger)

**Frontend:**
- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Charts & Visualization**: Recharts
- **UI Components**: Headless UI, custom components
- **HTTP Client**: Axios with interceptors

### Project Structure
```
AssetTrack/
├── backend/              # Spring Boot API
│   ├── src/main/java    # Application code
│   └── pom.xml          # Maven configuration
├── frontend/            # React application
│   ├── src/components   # Reusable React components
│   ├── src/pages        # Page components
│   └── package.json     # NPM dependencies
└── docker-compose.yml   # Database setup
```

---

## Build & Deployment

### Development Builds
```bash
# Backend
cd backend
./mvnw clean install

# Frontend
cd frontend
npm install && npm run build
```

### Docker Build
```bash
# Build backend image
docker build -f backend/Dockerfile -t assettrack-backend:latest .

# Build frontend image
docker build -f frontend/Dockerfile -t assettrack-frontend:latest .
```

---

##  Testing

```bash
# Backend unit tests
cd backend
./mvnw test

# Frontend tests
cd frontend
npm run test
```

---

##  API Documentation

Once the backend is running, interactive API documentation is available at:
- **Swagger UI**: `http://localhost:8080/swagger-ui.html`
- **OpenAPI JSON**: `http://localhost:8080/v3/api-docs`
