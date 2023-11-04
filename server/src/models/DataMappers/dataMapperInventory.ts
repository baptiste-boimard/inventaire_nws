// import { Inventory } from '~/types/inventory';
import CustomError from '../../handlers/CustomError';
import client from '../dbClient';
import { Inventory } from '../../types/inventory';

const dataMapperInventory = {

  // POST un inventaire dans la table inventory
  async postInventory(inventory: Inventory) {    
    const query = {
      text: `INSERT INTO inventory
            (name, quantity, details)
            VALUES ($1, $2, $3)
            RETURNING inventory_id;`,
      values: [inventory.name, inventory.quantity, inventory.details],
    };
    const data = await client.query(query)!
    if (!data) {
      throw new CustomError('L\'ajout de l\'article dans l\'inventaire a rencontré un problème');
    }
    return data;
  },
  async patchInventory(id: number, inventory: Inventory) {
    const query = {
      text: `UPDATE inventory
            SET name =$1, quantity=$2, details=$3
            WHERE inventory_id = $4`,
      values: [inventory.name, inventory.quantity, inventory.details, id],
    };
    const data = await client.query(query)
    
    if (!data) {
      throw new CustomError('La modification de l\'article dans l\'inventaire a rencontré un problème');
    }
    return data;
  },
  async getInventory() {
    const query = {
      text: `SELECT *
            FROM inventory;`,
    };
    const data = await client.query(query)
    if (!data) {
      throw new CustomError('Impossible de récupérer les données de  l\'inventaire');
    }   
    return data.rows;
  },
  async getOneInventory(id: number) {
    const query = {
      text: `SELECT * FROM inventory
            WHERE inventory_id = $1`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Impossible de récupérer les données de cet article');
    }
    return data.rows[0];
  },
  async deleteOneInventory(id: number) {
    
    const query = {
      text: `DELETE FROM inventory
            WHERE inventory_id = $1`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Vous ne pouvez pas supprimer cet article');
    }
    return data;
  }
};

export default dataMapperInventory;