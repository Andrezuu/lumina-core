# back-lumina

Backend API for the **Lumina** project, built with **Express.js** and **TypeScript**.

## 📁 Project Structure

```
back-lumina/
├── src/
│   ├── config/
│   │   └── env.ts              # Environment variables
│   ├── controllers/
│   │   └── health.controller.ts
│   ├── middlewares/
│   │   └── errorHandler.ts     # 404 + global error handler
│   ├── routes/
│   │   └── index.ts            # Main router
│   ├── app.ts                  # Express app setup
│   └── server.ts               # HTTP server entry point
├── .env                        # Local env vars (not committed)
├── .env.example
├── nodemon.json
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
npm start
```
