# 🛡️ Mathematical Defense Dashboard

A premium, full-stack optimization platform for generating **Steiner Triple Systems** and **Projective Planes**. This tool uses advanced mathematical properties to create "Vertical Locks" for distributed data or lottery systems (Fano Guard, Nano Armor, Steiner Net).

## 🚀 Key Features
- **Mathematical Engines**: Supports S(2,3,7), S(2,3,9), S(2,4,13), and S(2,3,15) systems.
- **Minimum Rank Analysis**: Exact integer rank calculation using `SymPy` to ensure "Golden Lock" compliance.
- **Interactive UI**: A Vercel/Shadcn-inspired dashboard with "The Glow" (Neon highlighting) for visualizing vertical dependencies.
- **Secure Blocks**: Automated triple generation with verification badges.

## 🛠️ Tech Stack
- **Backend**: FastAPI (Python), SymPy, NumPy.
- **Frontend**: Next.js 15, Tailwind CSS, Framer Motion, Lucide React.

## 🏁 Getting Started

### 1. Backend Setup
```bash
cd backend
pip install -r ../requirements.txt
uvicorn main:app --port 8000 --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The application will be available at `http://localhost:3000`.

## 📜 Mathematical Theory
This project is based on the **Minimum Rank Theorem** for finite incidence structures. It ensures that any selection of numbers is protected by a "Steiner Shield," maintaining a precise balance between coverage and resilience.

---
*Created with ❤️ by Antigravity*
