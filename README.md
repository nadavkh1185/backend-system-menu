# Fullstack Menu Tree System - Backend

Backend API for the **Fullstack Menu Tree System**, developed as part of the STK Fullstack Web Technical Test.

The application provides a RESTful API for managing hierarchical menus with unlimited nesting levels using a self-referencing tree structure.

---

## Tech Stack

- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- Swagger (OpenAPI)
- class-validator
- class-transformer

---

## Features

- Create menu items
- Retrieve menu tree structure
- Retrieve a single menu item
- Update menu items
- Delete menu items (including descendant nodes)
- Unlimited parent-child nesting
- Request validation
- Global error handling
- Swagger API documentation

---

## Architecture

The application follows a layered architecture:

```
Controller
    │
    ▼
Service
    │
    ▼
Prisma ORM
    │
    ▼
PostgreSQL
```

### Design Decisions

- Self-referencing database schema using `parentId`
- Business logic isolated inside the service layer
- DTO validation using `class-validator`
- Recursive tree generation performed in the service layer
- Clean separation between controllers, services, DTOs, and database access

---

## Project Structure

```
src
├── menus
│   ├── dto
│   │   ├── create-menu.dto.ts
│   │   └── update-menu.dto.ts
│   ├── menus.controller.ts
│   ├── menus.service.ts
│   └── menus.module.ts
├── prisma
├── app.module.ts
└── main.ts
```

---

## Database Schema

### Menu

| Column    | Type            | Description           |
| --------- | --------------- | --------------------- |
| id        | UUID            | Primary key           |
| name      | String          | Menu name             |
| parentId  | UUID (nullable) | Parent menu reference |
| createdAt | Timestamp       | Created timestamp     |
| updatedAt | Timestamp       | Updated timestamp     |

Relationship:

```
Menu
 ├── Menu
 │    ├── Menu
 │    └── Menu
 └── Menu
      └── Menu
```

This structure supports unlimited nesting depth.

---

## API Endpoints

| Method | Endpoint         | Description                     |
| ------ | ---------------- | ------------------------------- |
| GET    | `/api/menus`     | Retrieve menu tree              |
| GET    | `/api/menus/:id` | Retrieve menu by ID             |
| POST   | `/api/menus`     | Create menu                     |
| PUT    | `/api/menus/:id` | Update menu                     |
| DELETE | `/api/menus/:id` | Delete menu and its descendants |

---

## API Documentation

Swagger UI is available after the server starts:

```
http://localhost:3000/api/docs
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- PostgreSQL

---

### Installation

```bash
npm install
```

---

### Environment Variables

Create a `.env` file based on `.env.example`.

Example:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/menu_tree_db"
PORT=3000
```

---

### Database Migration

```bash
npx prisma migrate dev
```

Generate Prisma Client

```bash
npx prisma generate
```

---

### Run Development Server

```bash
npm run start:dev
```

---

### Production Build

```bash
npm run build
npm run start:prod
```

---

## Environment Example

```
DATABASE_URL=
PORT=3000
```

---

## Future Improvements

The following features can be added in future iterations:

- Drag and Drop menu reordering
- Move menu to another parent
- Menu ordering
- Search and filtering
- Docker & Docker Compose
- Unit and Integration Tests

---

## License

This project was developed for the STK Fullstack Web Technical Test.
