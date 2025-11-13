const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// ✅ Protected route (requires valid JWT)
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});

module.exports = router;
