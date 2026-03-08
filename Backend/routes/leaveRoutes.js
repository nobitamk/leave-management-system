const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  approveLeave,
  rejectLeave
} = require("../controllers/leaveController");

// Employee routes
router.post("/apply", authMiddleware, applyLeave);
router.get("/my", authMiddleware, getMyLeaves);

// Employer routes
router.get("/all", authMiddleware, roleMiddleware("employer"), getAllLeaves);
router.put("/approve/:id", authMiddleware, roleMiddleware("employer"), approveLeave);
router.put("/reject/:id", authMiddleware, roleMiddleware("employer"), rejectLeave);

module.exports = router;