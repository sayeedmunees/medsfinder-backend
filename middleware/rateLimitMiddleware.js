const rateLimit = require('express-rate-limit');

// Generic limiter to prevent overall abuse
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: 429,
        message: "Too many requests from this IP, please try again after 15 minutes."
    }
});

// Stricter limiter for Auth routes (Signup/Signin)
const authLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Too many login/signup attempts. Please try again after a minute."
    }
});

// Search limiter to prevent scraping
const searchLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // Limit each IP to 50 searches per window
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        message: "Search limit reached. Please try again later."
    }
});

module.exports = {
    globalLimiter,
    authLimiter,
    searchLimiter
};
