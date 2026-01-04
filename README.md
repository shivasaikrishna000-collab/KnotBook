# KnotBook 👰🤵 
### *Your Ultimate Wedding Planning Companion*

KnotBook is a high-end, **hybrid platform** designed to simplify the complexities of wedding planning. Built as a dual-purpose application, it runs flawlessly in a **web browser** while also delivering a **native Android experience**. By consolidating service bookings, profile management, and real-time history tracking into one sleek interface, KnotBook ensures that your special day is planned to perfection.

---

## 📱 Project Overview

KnotBook leverages modern web technologies to deliver a native-like experience on Android. Built with a "Serverless First" mindset, it utilizes **Firebase** for all backend operations, ensuring low latency, high availability, and real-time synchronization across devices.

### Key Pillars:
1.  **Excellence in Design**: A modern, glassmorphic UI with support for both Dark and Light modes.
2.  **Reliability**: Real-time data persistence using Cloud Firestore.
3.  **Simplicity**: A frictionless onboarding process and intuitive service discovery.

---

## ✨ Features in Detail

### 🍽️ Gourmet Catering (New!)
Delight your guests with a curated selection of fine dining options. The catering module allows users to:
*   Browse gourmet menus.
*   Book professional catering services with specific guest counts and dates.
*   Add custom notes for dietary requirements or special requests.

### 🎭 Service Grid
KnotBook offers a comprehensive suite of wedding services:
*   **Exquisite Costumes**: Find the perfect attire for the bride, groom, and wedding party.
*   **Dream Decoration**: Connect with top-tier decorators to transform your venue.
*   **Stylish Vehicles**: Book luxury cars and vintage carriages for the grand entrance.
*   **Professional Photography**: Capture every moment with the best in the business.

### 👤 Profile & Personalization
*   **Real-time Auth**: Secure login and registration powered by Firebase Authentication.
*   **Preference Management**: Instantly toggle between Dark and Light mode themes.

### � Booking History
A dedicated dashboard to keep track of every confirmation:
*   View status of all pending and confirmed bookings.
*   Detailed breakdown of service category, date, and price.
*   Real-time updates—as soon as you book, it appears here.

---

## 🚀 Native Performance & Mobile Optimization

The app is specifically tuned for mobile hardware:
*   **Safe Area Support**: Navigation and headers are dynamically adjusted to fit "hole-punch" cameras and "notches" (env safe-area-inset).
*   **Splash Screen Safeguard**: Prevents infinite loading loops with a 2-second intelligent timeout system.
*   **Fixed Navigation**: Headers stay pinned for easy access to the back button and menu, even while scrolling through long menus.

---

## �️ Technical Architecture

### Tech Stack:
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Runtime**: [Node.js](https://nodejs.org/)
- **Mobile Wrapper**: [Capacitor 6](https://capacitorjs.com/)
- **Styling**: Tailwind CSS & [Shadcn UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Backend-as-a-Service**: [Google Firebase](https://firebase.google.com/)

### Project Structure:
```text
studio/
├── src/
│   ├── app/           # Next.js Pages & Routes
│   ├── components/    # Reusable UI Components
│   ├── hooks/         # Custom React Hooks (useAuth, useBookings)
│   ├── lib/           # Logic, Types, & Firebase Config
│   └── components/ui/ # Base UI library (shadcn)
├── android/           # Native Android Project Files
└── public/            # Static Assets
```

---

## 📦 Distribution & Installation

### For Users (APK Installation)
The easiest way to install the app on an Android device:
1.  Download the **`KnotBook_Latest.apk`** located in the root of this project.
2.  Transfer it to your phone.
3.  Open the file on your device and follow the prompts to install (Enable "Unknown Sources" if required).

### For Developers (Local Setup)

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Build Web Assets**:
    ```bash
    npm run build
    ```
3.  **Sync with Android**:
    ```bash
    npx cap sync
    ```
4.  **Run in Desktop Browser**:
    ```bash
    npm run dev
    ```

---

## ⚠️ Maintenance & Troubleshooting

*   **Firebase Connectivity**: The app requires an active internet connection to authenticate and save data. If the app is stuck, check your Wi-Fi/Mobile Data.
*   **Updating Assets**: Every time you change the React code, you MUST run `npm run mobile:build` before running in Android Studio to see the changes.
*   **Legacy Backend**: The `backend/` folder and `server.js` are now deprecated and can be safely ignored. The app is fully serverless.

---

## 🔮 Roadmap
- [ ] Push Notifications for booking confirmations.
- [ ] In-app chat with service providers.
- [ ] Integrated payment gateway (Stripe/Razorpay).
- [ ] Gallery for user-uploaded wedding photos.

---
Created with ❤️ for a perfect Wedding Day.
