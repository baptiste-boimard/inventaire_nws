import { Request, Response, NextFunction } from 'express';
import dataMapperLoan from '../models/DataMappers/dataMapperLoan';
import CustomError from '../handlers/CustomError';
import { Loan } from '../types/loan';
import { MailData, RelaunchData, sendMail, sendMailRelaunch } from '../utils/sendMail';
import moment from 'moment';

//Controller gérant les requetes concernat les emprunts
const loanController = {
    //Enrengistre en BDD un nouvel emprunt
    async postLoan(req: Request, res: Response, next: NextFunction): Promise<void> {        
                
        const inventory_id: number = parseInt(req.params.inventory_id, 10);
        const study_id: number = parseInt(req.params.study_id, 10);
        const loan_quantity: number = parseInt(req.body.loan_quantity, 10);      

        const loaning_date = moment().format('DD/MM/YYYY');
        const due_date = moment().add(1, 'M').format('DD/MM/YYYY');
        
        const data: Loan = {
            inventory_id: inventory_id,
            study_id: study_id,
            loan_quantity: loan_quantity,
            loaning_date: loaning_date,
            due_date: due_date,
        };          
        const loan = await dataMapperLoan.postLoan(data);
        
        if(!loan) {
            res.status(403).send('Impossible d\'ajouter cet emprunt');
            return next();
        }

        const mailData: MailData = {
            name: req.body.name,
            loan_quantity: loan_quantity,
            email: req.body.email,
            loaning_date: loaning_date,
            due_date: due_date,
        };
        
        const sucessMailSend = await sendMail(mailData);
        
        
        if(!sucessMailSend) {
            res.status(421).send(`Le service d'envoi de mail est indisponible ou l'adresse mail n'est pas valide`)    
            return next();
        }

        res.status(200).send(loan);
    },

    //** Envoi un mail de relance à l'atudiant */
    async studyRelaunch(req: Request, res:Response, next: NextFunction): Promise<void> {
        const relaunchData: RelaunchData = {
            name: req.body.name,
            loan_quantity: req.body.loan_quantity,
            loaning_date: req.body.loaning_date,
            due_date: req.body.due_date,
            email: req.body.email,
        }
        
        
        const sucessMailRelaunch = await sendMailRelaunch(relaunchData);
        
        
        if(!sucessMailRelaunch) {
            res.status(421).send(`Le service d'envoi de mail est indisponible ou l'adresse mail n'est pas valide`)    
            return next();
        }

        res.status(200).send(sucessMailRelaunch);
    },
    
    //Récupère tous les étudants en BDD
    async getLoan(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const loan = await dataMapperLoan.getLoan();        
        
        if(loan) {
            res.status(200).send(loan);
        } else {
            res.status(403).send('Impossible de récupérer les données des emprunts');
            return next();
        }
    },
    //Récupère un étudiant en BDD
    async getOneLoan(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.loan_id, 10);        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const loan = await dataMapperLoan.getOneLoan(id);
        if(loan) {
            res.status(200).send(loan);
        } else {
            res.status(403).send('Les informations sur cet emprunt ne sont pas disponible');
            return next();
        }
    },
    //Efface un étudiant en BDD
    async deleteOneLoan(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.loan_id, 10);
        
        if(!id) {
            res.status(403).send('Une erreur est survenue lors de votre demande');
            return next();
        }
        const deleteStudy = await dataMapperLoan.deleteOneLoan(id);
        if(deleteStudy) {
            res.status(200).send(deleteStudy);
        } else {
            res.status(403).send('Vous ne pouvez pas supprimer cet emprunt');
            return next();
        }
    },
};

export default loanController;
