const express = require("express");
const {
  createPlan,
  getPlanById,
  listPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/plan.controller");

const router = express.Router();
// Routes for Plan CRUD operations
router.post("/plan", createPlan); // Create a new plan
router.get("/plan/:id", getPlanById); // Get a plan by ID
router.get("/plan", listPlans); // List all plans
router.put("/plan/:id", updatePlan); // Update a plan by ID
router.delete("/plan/:id", deletePlan); // Delete a plan by ID

module.exports = router;
