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
        const loan_quantity: number = parseInt(req.body.loan_quantity, 10)      
        console.log('controller',req.body);
        

        const loaning_date = moment().format('DD/MM/YYYY');
        const due_date = moment().add(1, 'M').format('DD/MM/YYYY');
        
        const data: Loan = {
            inventory_id: inventory_id,
            study_id: study_id,
            loan_quantity: loan_quantity,
            loaning_date: loaning_date,
            due_date: due_date,
        };                
        console.log('datacontroller', data);
        
        const loan = await dataMapperLoan.postLoan(data);
        
        if(!loan) {
            throw new CustomError('Impossible d\'ajouter cet emprunt');
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
            throw new CustomError('Une erreur s\'est produite durant l\'envoi du mail')    
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
            throw new CustomError('Une erreur s\'est produite durant l\'envoi du mail')    
        }

        res.status(200)
    },
    
    //Récupère tous les étudants en BDD
    async getLoan(req: Request, res: Response, next: NextFunction): Promise<void> {           
        const loan = await dataMapperLoan.getLoan();        
        
        if(loan) {
            res.status(200).send(loan);
        } else {
            const err = new CustomError('Impossible de récupérer les données des emprunts');
            next(err);
        }
    },
    //Récupère un étudiant en BDD
    async getOneLoan(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.loan_id, 10);        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const loan = await dataMapperLoan.getOneLoan(id);
        if(loan) {
            res.status(200).send(loan);
        } else {
            const err = new CustomError('Les informations sur cet emprunt ne sont pas disponible');
            next(err);
        }
    },
    //Efface un étudiant en BDD
    async deleteOneLoan(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.loan_id, 10);
        
        if(!id) {
            const err = new CustomError('Une erreur est survenue lors de votre demande');
            next(err);
        }
        const deleteStudy = await dataMapperLoan.deleteOneLoan(id);
        if(deleteStudy) {
            res.status(200).send(deleteStudy);
        } else {
            const err = new CustomError('Vous ne pouvez pas supprimer cet emprunt');
        }
    },
};

export default loanController;
