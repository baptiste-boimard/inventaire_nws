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
            RETURNING *;`,
      values: [study.firstname, study.lastname, study.email],
    };
    const data = await client.query(query)
    
    if (!data) {
      throw new CustomError('L\'ajout de l\'étudiant a rencontré un problème', 403);
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
      throw new CustomError('La modification de l\'étudiant a rencontré un problème', 403);
    }
    return data;
  },
  //Récupére tous les étudiants dans la base study
  async getStudy() {

    const fetchData = await fetch('http://vps-a47222b1.vps.ovh.net:4242/Student')
    const data = await fetchData.json()
    console.log(data);

    return data;
      
    // Ancienne Request pour obtenir les étudiants en BDD

    // const query = {
    //   text: `SELECT *
    //         FROM study
    //         ORDER BY study_id`,
    // };
    // const data = await client.query(query)
    // if (!data) {
    //   throw new CustomError('Impossible de récupérer les données de  l\'étudiant', 403);
    // }   
    // return data.rows;
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
      throw new CustomError('Impossible de récupérer les données de cet étudiant', 403);
    }
    return data.rows[0];
  },
  //Efface un étudiant dans la base study
  async deleteOneStudy(id: number) {
    try {
      const query = {
        text: `DELETE FROM study
              WHERE study_id = $1`,
        values: [id],
      };
      const data = await client.query(query)
      return data;
      
    } catch (error: any) { 
      throw new CustomError(error.message, 403);
    }
  }
};

export default dataMapperStudy;