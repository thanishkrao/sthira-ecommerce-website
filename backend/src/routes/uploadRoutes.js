// backend/src/routes/uploadRoutes.js
const express = require("express");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  res.status(200).json({
    message: "Image uploaded successfully",
    image: `/uploads/${req.file.filename}`,
  });
});

module.exports = router;
