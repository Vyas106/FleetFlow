# 🚛 FleetFlow - Centralized Logistics & Fleet Management

**FleetFlow** is a modern, enterprise-grade digital hub designed to optimize fleet operations, monitor driver safety, and track financial performance in real-time. Built with a premium "Glassmorphism" aesthetic and a high-performance tech stack, it provides fleet managers with a single source of truth for their entire logistics ecosystem.

![FleetFlow Dashboard](https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200)

## ✨ Key Features

### 🏢 Command Center (Dashboard)
- **Real-time KPIs**: Monitor Active Fleet, Maintenance Alerts, Pending Cargo, and Utilization Rates.
- **Ongoing Trips**: A live bird's-eye view of all dispatched vehicles and their current status.

### 🚜 Fleet Registry & Asset Management
- **Universal Registry**: Centralized database of all vehicles (Trucks, Vans, Trailers).
- **Status Lifecycle**: Track assets from `AVAILABLE` and `ON_TRIP` to `IN_SHOP` or `OUT_OF_SERVICE`.
- **Payload Tracking**: Manage max load capacities and current odometer readings.

### 🗺️ Intelligent Dispatcher
- **Smart Assignment**: Form validation prevents overloading by checking cargo weight against vehicle capacity.
- **Availability Guard**: Only shows available vehicles and on-duty drivers for new assignments.
- **Trip Lifecycle**: Manage trips from `DRAFT` and `DISPATCHED` to `COMPLETED`.

### 🔧 Maintenance & Service Logs
- **Integrated Repair Tracking**: Log issues and costs while automatically moving vehicles "In Shop".
- **Preventative Maintenance**: Keep a history of repairs to optimize vehicle lifespan.

### 💸 Financial & Expense Logging
- **Fuel & Misc Tracking**: Log every expense tied to specific trips, drivers, and vehicles.
- **Efficiency Analytics**: Calculate fuel efficiency (km/L) and maintenance-to-revenue ratios.

### 👤 Driver Performance & Safety
- **License Compliance**: Automatic flagging of expired or soon-to-expire driver licenses.
- **Duty Management**: Track driver status and safety scores.

### 📊 Operational Analytics
- **Dynamic Charting**: Visual trends of fuel efficiency and costliest vehicles using Recharts.
- **Financial Snapshots**: Monthly breakdowns of Revenue, Fuel Costs, and Net Profit.

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Framer Motion
- **UI Components**: Shadcn UI (Radix UI)
- **Database**: NeonDB (PostgreSQL)
- **ORM**: Prisma
- **Icons**: Lucide React
- **Charts**: Recharts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- A NeonDB (or any PostgreSQL) connection string.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/fleetflow.git
   cd fleetflow
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL="postgresql://user:password@your-neon-host/neondb?sslmode=require"
   ```

4. **Initialize Database**
   ```bash
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

## 📂 Project Structure

```text
├── app/                  # Next.js App Router Pages
│   ├── dashboard/        # Core System Pages
│   ├── login/            # Auth UI
│   └── register/         # Auth UI
├── components/           # UI Components
│   ├── ui/               # Shadcn UI Base
│   ├── vehicles/         # Feature-specific components
│   ├── dispatch/
│   └── ...
├── lib/                  # Utilities & Backend Logic
│   ├── actions.ts        # Next.js Server Actions (CRUD)
│   ├── prisma.ts         # Prisma Client Singleton
│   └── utils.ts
├── prisma/               # Database Schema
│   └── schema.prisma
└── public/               # Static Assets
```

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License.

---
*Built with ❤️ for the Logistics Industry.*
