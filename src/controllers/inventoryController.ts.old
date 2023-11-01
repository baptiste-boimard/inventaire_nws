import { Request, Response, NextFunction, RequestHandler } from 'express';

class InventoryController
{
    public services: any = {
        inventory: {
            cable: 1,
            mug: 12,
            laptop: 0,
        }
    }

    getInventory(req: Request, res: Response, next: NextFunction)
     {
        console.log('controlelr');

        console.log(this.services.inventory)
        const inventory = this.services.inventory;
        res.status(200).send(inventory);


  }
};

export default new InventoryController;