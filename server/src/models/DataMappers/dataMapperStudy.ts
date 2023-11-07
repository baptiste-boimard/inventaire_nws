import CustomError from '../../handlers/CustomError';
import client from '../dbClient';
import { Study } from '../../types/study';

const dataMapperStudy = {

  //Enrengistre un étudiant dans la table study
  async postStudy(study: Study) {    
    const query = {
      text: `INSERT INTO study
            (firstname, lastname, email)
            VALUES ($1, $2, $3)
            RETURNING study_id;`,
      values: [study.firstname, study.lastname, study.email],
    };
    const data = await client.query(query)
    
    if (!data) {
      throw new CustomError('L\'ajout de l\'étudiant a rencontré un problème');
    }
    return data;
  },
  //Modifie un étudiant dans la table study
  async patchStudy(id: number, study: Study) {
    const query = {
      text: `UPDATE study
            SET firstname =$1, lastname=$2, email=$3
            WHERE study_id = $4`,
      values: [study.firstname, study.lastname, study.email, id],
    };
    const data = await client.query(query)
    
    if (!data) {
      throw new CustomError('La modification de l\'étudiant a rencontré un problème');
    }
    return data;
  },
  //Récupére tous les étudiants dans la base study
  async getStudy() {
    const query = {
      text: `SELECT *
            FROM study
            ORDER BY study_id`,
    };
    const data = await client.query(query)
    if (!data) {
      throw new CustomError('Impossible de récupérer les données de  l\'étudiant');
    }   
    return data.rows;
  },
  //Récupére un étudiant dans la base study
  async getOneStudy(id: number) {
    const query = {
      text: `SELECT * FROM study
            WHERE study_id = $1`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Impossible de récupérer les données de cet étudiant');
    }
    return data.rows[0];
  },
  //Efface un étudiant dans la base study
  async deleteOneStudy(id: number) {
    
    const query = {
      text: `DELETE FROM study
            WHERE study_id = $1`,
      values: [id],
    };
    const data = await client.query(query)
    if(!data) {
      throw new CustomError('Vous ne pouvez pas supprimer cet étudiant');
    }
    return data;
  }
};

export default dataMapperStudy;