# MedsFinder Backend Documentation

The backend service for MedsFinder is a robust API built on Node.js and Express, utilizing MongoDB for data persistence. It is designed to handle user authentication, medicine and pharmacy management, and specialized role-based access for system administrators.

---

## Technical Stack and Core Dependencies

The backend architecture prioritizes security, scalability, and predictable data modeling.

| Package | Purpose | Implementation Detail |
| :--- | :--- | :--- |
| **Express v5** | Web Framework | Manages routing, request handling, and overall server structure. |
| **Mongoose** | ODM for MongoDB | Enforces schema validation and provides a fluent API for database operations. |
| **jsonwebtoken** | Authentication | Issues and verifies stateless tokens for secure user sessions. |
| **bcryptjs** | Security | Handles salted hashing and verification of user passwords. |
| **google-auth-library** | Identity | Securely verifies Google OAuth tokens via backend identity provider interaction. |
| **express-rate-limit** | Resilience | Prevents brute-force attacks and abuse by limiting request volume per IP. |
| **multer** | File Handling | Manages multipart/form-data for medicine, pharmacy, and profile image uploads. |
| **cors** | Cross-Origin | Configures safe cross-origin resource sharing between the frontend and API. |
| **dotenv** | Configuration | Manages sensitive environment variables outside of the version-controlled codebase. |

---

## Directory Architecture

The backend follows a standard MVC (Model-View-Controller) structure for clear separation of logic and data.

```bash
backend/
├── controller/        # Business logic for each resource.
├── middleware/        # Authentication, security, and file-processing layers.
├── model/             # Mongoose schemas and database models.
├── uploads/           # Static storage for multipart image uploads.
├── databaseConnection.js # Centralized Mongoose connection configuration.
├── index.js           # Server entry point and global middleware configuration.
├── routes.js          # Unified API routing map.
└── .env               # Environment-specific configuration and secrets.
```

---

## Data Models

1. **UserModel (`userModel.js`)**: Manages account identities, hashed credentials, user profiles (address, phone), and favorites (bookmarks).
2. **MedicineModel (`medicineModel.js`)**: Stores metadata for global medicine records including generic names, pricing, and categories.
3. **PharmacyModel (`phramacyModel.js`)**: Archives pharmacy partnership data such as geographic locations, operational hours, and ratings.
4. **ProductModel (`productModel.js`)**: Manages supplemental health and hygiene products categorized within the marketplace.

---

## Functional Controllers

- **UserController**: Orchestrates registration, credential-based signin, Google identity verification, and profile management.
- **MedicineController**: Handles administrative operations for global medicine inventory, including specialized search logic.
- **PharmacyController**: Manages the lifecycle of pharmacy entity data and stock availability status.
- **ProductController**: Facilitates the management of specialized health products and platform-wide analytics (e.g., click tracking).

---

## Middleware and Security Layers

The application incorporates multiple defensive layers to ensure data integrity and user safety:

### 1. **Authentication and Authorization**
- **jwtMiddleware**: Validates active session tokens for standard user actions.
- **roleMiddleware**: Implements hierarchical access control (`assistant`, `editor`, `admin`) to protect administrative endpoints.
*Note: We recently standardized these to utilize 'process.env.JWT_SECRET' and implement token expiration.*

### 2. **Request Security**
- **rateLimitMiddleware**: Implements tiered limiting strategies:
    - **Global**: Generic abuse prevention across all endpoints.
    - **Auth**: Strict limits on signup/signin attempts.
    - **Search**: Specialized limits to prevent automated data scraping.

### 3. **Infrastructure Security**
- **Environment Management**: Critical secrets (DB URI, JWT secrets, Client IDs) are decoupled from the source code via `.env`.
- **CORS Configuration**: Restricted to authorized origins (frontend dev/prod URLs) to prevent cross-domain exploitation.

---

## Environment Configuration

The backend requires the following environment variables for proper operation (referenced in `example.env`):

- `PORT`: Server port (defaults to 4000).
- `DATABASE`: MongoDB Connection String.
- `JWT_SECRET`: Symmetric key for token signing.
- `GOOGLE_CLIENT_ID`: Identifies the application for backend Google identity verification.

---

This documentation provides a technical foundation for the MedsFinder API and serves as an architectural summary of the backend system.
