# MedsFinder Backend Documentation

The backend service for MedsFinder is a robust API built on Node.js and Express, utilizing MongoDB for data persistence. It is designed to handle user authentication, medicine and pharmacy management, and specialized role-based access for system administrators.

---

## Technical Stack and Core Dependencies

The backend architecture prioritizes security, scalability, and predictable data modeling.

| Package | Purpose | Implementation Detail |
| :--- | :--- | :--- |
| **Express v5** | Web Framework | Manages routing, request handling, and overall server structure. |
| **Mongoose** | ODM for MongoDB | Enforces schema validation and provides a fluent API for database operations. |
| **Cloudinary** | Cloud Storage | Provides persistent, CDN-backed hosting for all application images. |
| **multer-storage-cloudinary** | Multer Storage | Seamlessly integrates Multer with Cloudinary for folder-organized uploads. |
| **jsonwebtoken** | Authentication | Issues and verifies stateless tokens for secure user sessions. |
| **bcryptjs** | Security | Handles salted hashing and verification of user passwords. |
| **google-auth-library** | Identity | Securely verifies Google OAuth tokens via backend identity provider interaction. |
| **express-rate-limit** | Resilience | Prevents brute-force attacks and abuse by limiting request volume per IP. |
| **cors** | Cross-Origin | Configures safe cross-origin resource sharing between the frontend and API. |
| **dotenv** | Configuration | Manages sensitive environment variables outside of the version-controlled codebase. |

---

## Directory Architecture

The backend follows a standard MVC (Model-View-Controller) structure for clear separation of logic and data.

```bash
backend/
├── controller/        # Business logic for each resource.
├── middleware/        # Authentication, security, and Cloudinary processing layers.
├── model/             # Mongoose schemas and database models.
├── uploads/           # Legacy local storage for existing multipart image uploads.
├── databaseConnection.js # Centralized Mongoose connection configuration.
├── index.js           # Server entry point and global middleware configuration.
├── routes.js          # Unified API routing map.
└── .env               # Environment-specific configuration and secrets.
```

---

## Cloud Storage Architecture

MedsFinder has migrated from local file storage to **Cloudinary** to ensure image persistence across deployments and server restarts.

### 1. **Automated Folder Organization**
Images are automatically categorized into four specialized cloud folders:
- `medsfinder/medicine`: Medicine product photography.
- `medsfinder/pharmacy`: Pharmacy location and storefront images.
- `medsfinder/advertisement`: Promotional product and advertisement assets.
- `medsfinder/profile`: User profile pictures and administrator avatars.

### 2. **Size Enforcement**
A strict **200KB** file size limit is enforced at the backend level via Multer middleware. Images exceeding this size are rejected to maintain platform performance.

---

## Data Models

1. **UserModel (`userModel.js`)**: Manages account identities, hashed credentials, user profiles (address, phone, avatar URL), and favorites (bookmarks).
2. **MedicineModel (`medicineModel.js`)**: Stores metadata for global medicine records including generic names, pricing, and Cloudinary image URLs.
3. **PharmacyModel (`phramacyModel.js`)**: Archives pharmacy partnership data such as geographic locations, ratings, and cloud-hosted storefront images.
4. **ProductModel (`productModel.js`)**: Manages supplemental health and hygiene products categorized within the marketplace with CDN-backed assets.

---

## Functional Controllers

- **UserController**: Orchestrates registration, bcrypt-hashed signin, Google identity verification, and profile/avatar management.
- **MedicineController**: Handles administrative operations for global medicine inventory, including specialized search logic and cloud asset linking.
- **PharmacyController**: Manages the lifecycle of pharmacy entity data and stock availability status.
- **ProductController**: Facilitates the management of specialized health products and platform-wide analytics (e.g., click tracking).

---

## Middleware and Security Layers

The application incorporates multiple defensive layers to ensure data integrity and user safety:

### 1. **Authentication and Authorization**
- **jwtMiddleware**: Validates active session tokens (24h expiration) for standard user actions.
- **roleMiddleware**: Implements hierarchical access control (`assistant`, `editor`, `admin`) to protect administrative endpoints.

### 2. **Request Security**
- **rateLimitMiddleware**: Implements tiered limiting strategies:
    - **Global**: Generic abuse prevention across all endpoints.
    - **Auth**: Strict limits on signup/signin attempts.
    - **Search**: Specialized limits to prevent automated data scraping.

### 3. **Infrastructure Security**
- **Environment Management**: Critical secrets (DB URI, JWT secrets, Client IDs, Cloudinary keys) are decoupled from source code.
- **CORS Configuration**: Restricted to authorized origins (Vercel production URLs) to prevent cross-domain exploitation.

---

## Environment Configuration

The backend requires the following environment variables for proper operation (referenced in `example.env`):

- `PORT`: Server port (defaults to 4000).
- `DATABASE`: MongoDB Connection String.
- `JWT_SECRET`: Symmetric key for token signing.
- `GOOGLE_CLIENT_ID`: Identifies the application for backend Google identity verification.
- `CLOUDINARY_CLOUD_NAME`: Cloudinary cloud account name.
- `CLOUDINARY_API_KEY`: API Key for cloud storage access.
- `CLOUDINARY_API_SECRET`: API Secret for secure storage operations.

---

This documentation provides a technical foundation for the MedsFinder API and serves as an architectural summary of the backend system.
