import { Request, Response, NextFunction } from 'express';
import dataMapperInventory from '../models/DataMappers/dataMapperInventory';
import CustomError from '../handlers/CustomError';
import { Inventory } from '~/types/inventory';

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
        const id: number = parseInt(req.params.inventory_id);

        const data: Inventory = {
            name: req.body.name,
            quantity: req.body.quantity,
            details: req.body.details,
        };        
        const inventory = await dataMapperInventory.patchInventory(id, data);
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            const err = new CustomError('Impossible de modifier cet artcle dans l\'inventaire');
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
    async getOneInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.inventory_id, 10);        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const inventory = await dataMapperInventory.getOneInventory(id);
        if(inventory) {
            res.status(200).send(inventory);
        } else {
            const err = new CustomError('Les informations sur ce matériel ne sont pas disponibe');
            next(err);
        }
    },
    async deleteOneInventory(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.inventory_id, 10);
        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const deleteInventory = await dataMapperInventory.deleteOneInventory(id);
        if(deleteInventory) {
            res.status(200).send(deleteInventory);
        } else {
            const err = new CustomError('Vous ne pouvez pas supprimer cet article');
        }
    },
};

export default inventoryController;
