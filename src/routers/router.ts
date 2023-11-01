import inventoryController from "../controllers/inventoryController";
import routerWrapper from "../handlers/routerWrapper";

const express = require('express');

const router = express.Router();

router.post('/inventory',  routerWrapper(inventoryController.postInventory));


// router.get('/user/:id', UserController.getUser)

module.exports = router;