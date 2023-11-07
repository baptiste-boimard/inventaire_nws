import { Request, Response, NextFunction } from 'express';
import dataMapperStudy from '../models/DataMappers/dataMapperStudy';
import CustomError from '../handlers/CustomError';
import { Study } from '../types/study';

//Controller gérant les requetes concernat les étudiants
const studyController = {
    //Enrengistre en BDD un nouvel étudiant
    async postStudy(req: Request, res: Response, next: NextFunction): Promise<void> {        
        
        if(typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string' || typeof req.body.email !== 'string') {
            throw new CustomError('Le format de données envoyé ne correpond pas');
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
            const err = new CustomError('Impossible d\'ajouter cet étudiant');
            next(err);
        }
    },
    //Modifie en BDD un étudiant
    async patchStudy(req: Request, res: Response, next: NextFunction): Promise<void> {        
        const id: number = parseInt(req.params.study_id);

        if(typeof req.body.firstname !== 'string' || typeof req.body.lastname !== 'string' || typeof req.body.email !== 'string') {
            throw new CustomError('Le format de données envoyé ne correpond pas');
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
            const err = new CustomError('Impossible de modifier cet étudiant');
            next(err);
        }
    },
    //Récupère tous les étudiants en BDD
    async getStudy(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const study = await dataMapperStudy.getStudy();
        if(study) {
            res.status(200).send(study);
        } else {
            const err = new CustomError('Impossible de récupérer les données des étudiant');
            next(err);
        }
    },
    //Récupère un étudiant en BDD
    async getOneStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.study_id, 10);        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const study = await dataMapperStudy.getOneStudy(id);
        if(study) {
            res.status(200).send(study);
        } else {
            const err = new CustomError('Les informations sur cet étudiant ne sont pas disponible');
            next(err);
        }
    },
    //Efface un étudiant en BDD
    async deleteOneStudy(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.study_id, 10);
        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const deleteStudy = await dataMapperStudy.deleteOneStudy(id);
        if(deleteStudy) {
            res.status(200).send(deleteStudy);
        } else {
            const err = new CustomError('Vous ne pouvez pas supprimer cet étudiant');
        }
    },
};

export default studyController;
