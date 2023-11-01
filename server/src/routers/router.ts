// import { UserController } from "../controllers/userController";
import inventoryController from "../controllers/inventoryController";

const express = require('express');

const router = express.Router();

router.get('/',  inventoryController.getInventory.bind(inventoryController));
// router.get('/user/:id', UserController.getUser)

module.exports = router;