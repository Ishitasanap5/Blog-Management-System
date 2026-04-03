import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: { message: "Too many requests from this IP, try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});