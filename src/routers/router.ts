import inventoryController from "../controllers/inventoryController";
import routerWrapper from "../handlers/routerWrapper";

const express = require('express');

const router = express.Router();

router.get('/inventory',  routerWrapper(inventoryController.getInventory));
router.get('/inventory/:inventory_id',  routerWrapper(inventoryController.getOneInventory));
router.post('/inventory',  routerWrapper(inventoryController.postInventory));
router.patch('/inventory/:inventory_id',  routerWrapper(inventoryController.patchInventory));
router.delete('/inventory/:inventory_id',  routerWrapper(inventoryController.deleteOneInventory));


// router.get('/user/:id', UserController.getUser)

module.exports = router;