import { Request, Response, NextFunction } from 'express';
import dataMapperStudy from '../models/DataMappers/dataMapperStudy';
import client from '../models/dbClient';
import { Study } from '../types/study';

//Controller gérant les requetes concernat les étudiants
const studyController = {
    //Enrengistre en BDD un nouvel étudiant
    async postStudy(req: Request, res: Response, next: NextFunction): Promise<void> {        
        
        if(typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string' || typeof req.body.email !== 'string') {
            res.status(400).send('Le format de données envoyé ne correpond pas');
            return next();
        }

        if(req.body.firstname === '' || req.body.lastname === '' || req.body.email === '') {
            res.status(400).send('Le format de données envoyé ne correpond pas');
            return next();
        }

        const existingEmail = await client.query({
            text: `SELECT * FROM study
                    WHERE study.email = $1`,
            values: [req.body.email],
        });

        
        if(existingEmail.rowCount) {
            res.status(403).send('Un étudiant avec cet email existe dèjà')
            return next();
        }
        
        const data: Study = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
        };        
        
        const study = await dataMapperStudy.postStudy(data);
        if(study) {
            res.status(200).send(study);
        } else {
            res.status(403).send('Impossible d\'ajouter cet étudiant');
            return next();
        }
    },
    //Modifie en BDD un étudiant
    async patchStudy(req: Request, res: Response, next: NextFunction): Promise<void> {        
        const id: number = parseInt(req.params.study_id);

        if(typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string' || typeof req.body.email !== 'string') {
            res.status(400).send('Le format de données envoyé ne correpond pas');
            return next();
        }

        const data: Study = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
        };        
        const study = await dataMapperStudy.patchStudy(id, data);
        if(study) {
            res.status(200).send(study);
        } else {
            res.status(403).send('Impossible de modifier cet étudiant');
            return next();
        }
    },
    //Récupère tous les étudiants en BDD
    async getStudy(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const study = await dataMapperStudy.getStudy();
        if(study) {
            res.status(200).send(study);
        } else {
            res.status(403).send('Impossible de récupérer les données des étudiant');
            return next();
        }
    },
    //Récupère un étudiant en BDD
    async getOneStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.study_id, 10);        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const study = await dataMapperStudy.getOneStudy(id);
        if(study) {
            res.status(200).send(study);
        } else {
            res.status(403).send('Les informations sur cet étudiant ne sont pas disponible');
            return next();
        }
    },
    //Efface un étudiant en BDD
    async deleteOneStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.study_id, 10);
        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const deleteStudy = await dataMapperStudy.deleteOneStudy(id);
        if(deleteStudy) {
            res.status(200).send(deleteStudy);
        } else {
            res.status(403).send('Vous ne pouvez pas supprimer cet étudiant');
            return next();
        }
    },
};

export default studyController;
