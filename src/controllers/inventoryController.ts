import { Request, Response, NextFunction } from 'express';
import dataMapperInventory from '../models/DataMappers/dataMapperInventory';
import CustomError from '../handlers/CustomError';
import { Inventory } from '~/types/inventory';
import { log } from 'console';

//Controller gérant les requetes concernat l'inventaire
const inventoryController = {
    async postInventory(req: Request, res: Response, next: NextFunction): Promise<void> {        
        
        const data: Inventory = {
            name: req.body.name,
            quantity: req.body.quantity,
            details: req.body.details,
        };        
        const inventory = await dataMapperInventory.postInventory(data);
        if(inventory) {
            res.status(200).send('L\'article a bien été rajouté à l\'invetaire');
        } else {
            const err = new CustomError('Impossible d\'ajouter cet artcle dans l\'inventaire');
            next(err);
        }
    },
    async patchInventory(req: Request, res: Response, next: NextFunction): Promise<void> {        
        
        const data: Inventory = {
            name: req.body.name,
            quantity: req.body.quantity,
            details: req.body.details,
        };        
        const inventory = await dataMapperInventory.patchInventory(data);
        if(inventory) {
            res.status(200).send('L\'article a bien été modifié');
        } else {
            const err = new CustomError('Impossible d\'ajouter cet artcle dans l\'inventaire');
            next(err);
        }
    },
    async getInventory(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const inventory = await dataMapperInventory.getInventory();
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            const err = new CustomError('Impossible de récupérer les données de  l\'inventaire');
            next(err);
        }
    },
};

export default inventoryController;
