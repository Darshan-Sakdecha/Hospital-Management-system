import express from "express";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerValidator, loginValidator, validate, } from "../validators/auth.validator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", registerValidator, validate, registerUser);
router.post("/login", loginValidator, validate, loginUser);

// Protected route (only admin)
router.get(
    "/admin",
    isAuthenticated,
    authorizeRoles("admin"),
    (req, res) => {
        res.json({ message: "Welcome Admin" });
    }
);

export default router;