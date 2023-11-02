import inventoryController from "../controllers/inventoryController";
import routerWrapper from "../handlers/routerWrapper";

const express = require('express');

const router = express.Router();

router.get('/inventory',  routerWrapper(inventoryController.getInventory));
router.post('/inventory',  routerWrapper(inventoryController.postInventory));
router.patch('/inventory',  routerWrapper(inventoryController.patchInventory));


// router.get('/user/:id', UserController.getUser)

module.exports = router;