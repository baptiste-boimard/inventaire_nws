import CustomError from '../../handlers/CustomError';
import client from '../dbClient';
import { Loan } from '../../types/loan';

const dataMapperLoan = {

  //Enrengistre un emprunt dans la table loan
  async postLoan(loan: Loan) {   
    const query = {
      text: `INSERT INTO loan
            (inventory_id, study_id, quantity, loaning_date, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING loan_id;`,
      values: [loan.inventory_id, loan.study_id, loan.quantity, loan.loaning_date, loan.due_date],
    };
    const data = await client.query(query);
    
    if (!data) {
      throw new CustomError('L\'ajout de l\'emprunt a rencontré un problème');
    }
    return data;
  },
  //Modifie un étudiant dans la table study
  async patchLoan(id: number, loan: Loan) {
    const query = {
      text: `UPDATE loan
            SET inventory_id =$1, study_id=$2, loaning_date=$3, due_date=$4
            WHERE loan_id = $5`,
      values: [loan.inventory_id, loan.study_id, loan.loaning_date, loan.due_date, id],
    };
    const data = await client.query(query)
    
    if (!data) {
      throw new CustomError('La modification de l\'emprunt a rencontré un problème');
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
      throw new CustomError('Impossible de récupérer les données de  l\'emprunt');
    }   
    return data.rows[0];
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
      throw new CustomError('Impossible de récupérer les données de cet emprunt');
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
      throw new CustomError('Vous ne pouvez pas supprimer cet emprunt');
    }
    return data;
  }
};

export default dataMapperLoan;