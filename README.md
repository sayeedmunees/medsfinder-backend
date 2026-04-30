# MedsFinder Backend - Robust API Layer

MedsFinder is a secure, performance-driven backend API built on Node.js and Express, using MongoDB (Mongoose) for scalable data persistence. This API powers the search logic, pharmacy inventory management, role-based access control (RBAC), and persistent cloud asset delivery for the MedsFinder platform.

---

## Advanced Security Implementations

*   **Tiered Rate Limiting**: Implements specialized limits for (Global, Auth, and Search) requests to prevent brute-force attacks and scraping.
*   **Multi-Origin CORS**: Custom environment-aware CORS policy that strictly locks down the server in production while allowing seamless local development.
*   **Secure Authentication**: 
    *   **Google OAuth 2.0 Identity**: Backend verification of identity tokens for a secure SSO experience.
    *   **Credential Hashing**: Industry-standard bcryptjs salting and hashing for all administrative and user passwords.
    *   **JWT Sessions**: Stateless 24-hour token verification for identity management.

---

## Cloud Architecture & Assets

MedsFinder utilizes a decentralized asset storage pattern:
- **Cloudinary CDN**: Automated, folder-organized persistence (medsfinder/medicine, medsfinder/pharmacy, etc.) for all platform imagery.
- **CDN Pathing**: Efficient HTTPS delivery of assets with built-in format optimization.
- **Server Guardrails**: Strict 200KB hard limit for all uploads via Multer-Cloudinary middleware.

---

## Backend Architecture (MVC Pattern)

```bash
backend/
├── controller/        # Resource-specific business logic and CRUD operations.
├── middleware/        # Cloudinary processing, JWT validation, and Rate Limiting.
├── model/             # Advanced Mongoose schemas for Users, Medicines, and Pharmacies.
├── index.js           # Production-ready entry point with environment hardening.
└── routes.js          # Unified API routing table.
```

---

## Getting Started

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/sayeedmunees/medsfinder.git
    cd medsfinder/backend
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env` file with these keys:
    ```env
    DATABASE=mongodb_uri
    JWT_SECRET=your_jwt_secret
    GOOGLE_CLIENT_ID=your_google_id
    FRONTEND_URL=https://medsfinder.vercel.app
    CLOUDINARY_CLOUD_NAME=your_cloud_name
    CLOUDINARY_API_KEY=your_api_key
    CLOUDINARY_API_SECRET=your_api_secret
    ```

4.  **Run with Nodemon**:
    ```bash
    npm run dev
    ```

---

## License & Frontend

To see how this API is utilized in a modern React interface, please refer to the [Frontend Documentation](https://github.com/sayeedmunees/medsfinder/tree/main/frontend/README.md).

Developed by your portfolio visit in mind! 
