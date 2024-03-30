const express = require('express');
const landfillController = require("../controllers/landfillController");

const router = express.Router();

router.get('/landfill', landfillController.getLandfill);
router.post("/landfill", landfillController.addLandfill);
router.delete("/landfill/:landfillId", landfillController.deleteLandfill);

module.exports = router;