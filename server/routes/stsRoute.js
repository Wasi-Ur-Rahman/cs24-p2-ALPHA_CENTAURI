const express = require('express');
const stsController = require("../controllers/stsController");
const router = express.Router();

router.get('/sts', stsController.getSts);
router.post('/sts', stsController.addSts);
router.delete('/sts/:stsId', stsController.deleteSts);
router.put("/:stsId/assign-truck", stsController.assignTruck);

module.exports = router;