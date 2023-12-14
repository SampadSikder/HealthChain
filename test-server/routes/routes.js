const express = require('express');
const router = express.Router();
const data_entry_controller = require('../controllers/data_entry_controller');



router.post("/", data_entry_controller.push_data);

module.exports = router;