import { Request, Response, NextFunction } from 'express';
import dataMapperInventory from '../models/DataMappers/dataMapperInventory';
import CustomError from '../handlers/CustomError';
import { Inventory } from '../types/inventory';

//Controller gérant les requetes concernat l'inventaire
const inventoryController = {
    //Enrengistre en BDD un nouvel article
    async postInventory(req: Request, res: Response, next: NextFunction): Promise<void> {        
        
        const quantity = parseInt(req.body.quantity, 10);
        
        if (
            typeof req.body.name !== 'string' ||
            typeof quantity !== 'number' ||
            typeof req.body.details !== 'string' ||
            Number.isInteger(quantity) !== true
        ) {
            res.status(400).send('Le format de données envoyé ne correpond pas')
            return next();
        } else {
        }
        const data: Inventory = {
            name: req.body.name,
            quantity: req.body.quantity,
            details: req.body.details,
        };        
        const inventory = await dataMapperInventory.postInventory(data);
        
        if(inventory) {
            res.status(201).send(inventory);
        } else {
            res.status(403).send('Impossible d\'ajouter cet artcle dans l\'inventaire');
            return next();
        }
    },
    //Modifie en BDD un article
    async patchInventory(req: Request, res: Response, next: NextFunction): Promise<void> {        
        const id: number = parseInt(req.params.inventory_id, 10);
        const quantity = parseInt(req.body.quantity, 10);

        if(typeof req.body.name !== 'string' || typeof req.body.quantity !== 'number' || typeof req.body.details !== 'string') {
            res.status(400).send('Le format de données envoyé ne correpond pas');
            return next();
        }

        const data: Inventory = {
            name: req.body.name,
            quantity: quantity,
            details: req.body.details,
        };   

        const inventory = await dataMapperInventory.patchInventory(id, data);
        
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            res.status(403).send('Impossible de modifier cet artcle dans l\'inventaire');
            return next();
        }
    },
    async getInventory(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const inventory = await dataMapperInventory.getInventory();
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            res.status(403).send('Impossible de récupérer les données de  l\'inventaire');
            return next();
        }
    },
    async getOneInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.inventory_id, 10);        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const inventory = await dataMapperInventory.getOneInventory(id);
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            res.status(403).send('Les informations sur ce matériel ne sont pas disponibe');
            return next();
        }
    },
    async deleteOneInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.inventory_id, 10);
        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const deleteInventory = await dataMapperInventory.deleteOneInventory(id);
        if(deleteInventory) {
            res.status(200).send(deleteInventory);
        } else {
            res.status(403).send('Vous ne pouvez pas supprimer cet article');
            return next();
        }
    },
};

export default inventoryController;
