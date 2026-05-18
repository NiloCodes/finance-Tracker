const express = require("express");
const router = express.Router();

const controller = require("../controllers/transactionController");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, controller.getTransactions);
router.post("/", auth, controller.addTransaction);
router.delete("/:id", auth, controller.deleteTransaction);

module.exports = router;
