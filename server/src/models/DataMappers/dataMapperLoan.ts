import CustomError from '../../handlers/CustomError';
import client from '../dbClient';
import { Loan } from '../../types/loan';

const dataMapperLoan = {

  //Enrengistre un emprunt dans la table loan
  async postLoan(loan: Loan) { 
      
    const query = {
      text: `INSERT INTO loan
            (inventory_id, study_id, loan_quantity, loaning_date, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
      values: [loan.inventory_id, loan.study_id, loan.loan_quantity, loan.loaning_date, loan.due_date],
    };
    const data = await client.query(query);
    console.log('dataloan', data);
    
    if (!data) {
      throw new CustomError('L\'ajout de l\'emprunt a rencontré un problème', 403);
    }    
    return data;
  },

  //Récupére tous les étudiants dans la base study
  async getLoan() {
    const query = {
      text: `SELECT * FROM loan as l
            JOIN
            (SELECT inventory.inventory_id, inventory.name, inventory.quantity, inventory.details
            FROM inventory) as i
            ON l.inventory_id = i.inventory_id
            JOIN
            (SELECT study.study_id, study.firstname, study.lastname, study.email
            FROM study) as s
            ON l.study_id = s.study_id;`,
    };
    const data = await client.query(query)
    if (!data) {
      throw new CustomError('Impossible de récupérer les données de  l\'emprunt', 403);
    }   
    return data.rows;
  },
  //Récupére un étudiant dans la base study
  async getOneLoan(id: number) {
    const query = {
      text: `SELECT * FROM loan as l
            JOIN
            (SELECT inventory.inventory_id, inventory.name, inventory.quantity, inventory.details
            FROM inventory) as i
            ON l.inventory_id = i.inventory_id
            JOIN
            (SELECT study.study_id, study.firstname, study.lastname, study.email
            FROM study) as s
            ON l.study_id = s.study_id
            WHERE loan_id = $1;`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Impossible de récupérer les données de cet emprunt', 403);
    }
    return data.rows[0];
  },
  //Efface un étudiant dans la base study
  async deleteOneLoan(id: number) {
    
    const query = {
      text: `DELETE FROM loan
            WHERE loan_id = $1`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Vous ne pouvez pas supprimer cet emprunt', 403);
    }
    return data;
  }
};

export default dataMapperLoan;