const express = require('express');
const router = express.Router();
const data_entry_controller = require('../controllers/data_entry_controller');
const blockchain_data_entry_controller = require('../controllers/blockchain_data_entry_controller');



router.post("/", data_entry_controller.push_data);
router.post("/bchain", blockchain_data_entry_controller.push_data);
router.get("/bchain", blockchain_data_entry_controller.read_data);

module.exports = router;