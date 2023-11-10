import loanController from "../controllers/loanController";
import inventoryController from "../controllers/inventoryController";
import studyController from "../controllers/studyControler";
import routerWrapper from "../handlers/routerWrapper";

const express = require('express');

const router = express.Router();

//Route pour la table Inventory
router.get('/inventory',  routerWrapper(inventoryController.getInventory));
router.get('/inventory/:inventory_id',  routerWrapper(inventoryController.getOneInventory));
router.post('/inventory',  routerWrapper(inventoryController.postInventory));
router.patch('/inventory/:inventory_id',  routerWrapper(inventoryController.patchInventory));
router.delete('/inventory/:inventory_id',  routerWrapper(inventoryController.deleteOneInventory));

//Route pour la table Study
router.get('/study',  routerWrapper(studyController.getStudy));
router.get('/study/:study_id',  routerWrapper(studyController.getOneStudy));
router.post('/study',  routerWrapper(studyController.postStudy));
router.patch('/study/:study_id',  routerWrapper(studyController.patchStudy));
router.delete('/study/:study_id',  routerWrapper(studyController.deleteOneStudy));

//Route pour la table Loan
router.post('/loan/:inventory_id/:study_id', routerWrapper(loanController.postLoan));
router.post('/loan/relaunch', routerWrapper(loanController.studyRelaunch));
router.get('/loan', routerWrapper(loanController.getLoan));
router.get('/loan/:loan_id', routerWrapper(loanController.getOneLoan));
router.delete('/loan/:loan_id', routerWrapper(loanController.deleteOneLoan));

module.exports = router;