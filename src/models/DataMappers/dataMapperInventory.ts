// import { Inventory } from '~/types/inventory';
import CustomError from '../../handlers/CustomError';
import client from '../dbClient';
import { Inventory } from '~/types/inventory';

const dataMapperInventory = {

  // POST un inventaire dans la table inventory
  async postInventory(inventory: Inventory) {
    console.log(inventory);
    
    const query = {
      text: `INSERT INTO inventory
            (name, quantity, details)
            VALUES ($1, $2, $3);`,
      values: [inventory.name, inventory.quantity, inventory.details],
    };
    const data = await client.query(query)!
    if (!data) {
      throw new CustomError('L\'ajout de l\'article dans l\'inventaire a rencontré un problème');
    }
    return data
  }

};

export default dataMapperInventory;