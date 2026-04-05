# 🚗 AutoBazaar - Premium Used Car Marketplace

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-11+-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**AutoBazaar** is a high-performance, full-stack marketplace for premium used cars. Built with a modern tech stack focused on speed, scalability, and extreme visual excellence, it provides a seamless experience for both buyers and sellers.

---

## ✨ Key Features

- **🏎️ Comprehensive Car Listings**: Browse and search through a wide variety of premium used cars with advanced filtering systems (Year, Fuel Type, Transmission, Owner Type, etc.).
- **💎 Visual Comparisons**: Interactive car comparison tool to help buyers make informed decisions between multiple vehicles.
- **⭐ Personalized Wishlist**: Save favorite listings to a persistent wishlist for later review.
- **📤 Seller Dashboard & Listings**: Unified dashboard for sellers to manage their listings, upload images via Firebase Storage, and track their inventory.
- **🔐 Secure Authentication**: Robust user authentication and role-based access control powered by **Firebase Auth**.
- **💾 Real-time Backend**: Instant data synchronization and persistence using **Firestore**.
- **⚡ Domain-Driven Architecture**: Modular, scalable project structure designed for long-term maintainability.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | [Next.js](https://nextjs.org/) (App Router) |
| **UI Library** | [React 19](https://react.org/) |
| **Styling** | [Tailwind CSS 4.0](https://tailwindcss.com/) |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) |
| **Backend / Database** | [Firebase Firestore](https://firebase.google.com/docs/firestore) |
| **Authentication** | [Firebase Auth](https://firebase.google.com/docs/auth) |
| **Media Storage** | [Firebase Storage](https://firebase.google.com/docs/storage) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |

---

## 📂 Project Structure

The project follows a **Domain-Driven Design (DDD)** approach combined with Next.js paradigms for maximum scalability:

```text
src/
├── app/                  # Next.js App Router: Pages, Layouts, API routes
├── components/           # Reusable UI Components
│   ├── ui/               # Base UI elements (buttons, inputs, modals)
│   ├── common/           # Shared complex components (Navbar, Footer)
│   └── layouts/          # Reusable layout wrappers
├── modules/              # Domain-Driven Modules (Core Logic)
│   └── items/            # Marketplace items/cars domain (hooks, components)
├── services/             # External Integrations & API Clients
├── store/                # Global State Management (Zustand)
├── config/               # App Configuration & Field Definitions
├── lib/                  # Third-party SDK initializations (Firebase)
└── types/                # Global TypeScript declarations
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm / yarn / pnpm**
- **Firebase Project**: A configured Firebase project with Firestore, Auth, and Storage enabled.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/DhanushG78/car-sale.git
   cd car-sale
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase configuration:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🏗️ Architecture Design

- **Modular Modules**: Instead of a monolithic `components` folder, feature-specific logic is encapsulated within `src/modules`. For example, all car-related UI and hooks are located in `src/modules/items`.
- **State Partitioning**: Global state is managed through lightweight, targeted Zustand stores (e.g., Auth, Wishlist, Compare) to prevent unnecessary re-renders.
- **Firebase Abstraction**: All Firebase interactions are centralized in `src/services` and `src/lib`, allowing for easy backend swaps or mocks during testing.
- **Dynamic Config**: The `src/config/appConfig.ts` file allows for easy modification of car attributes (fields, labels, types) without updating the entire UI logic.

---
