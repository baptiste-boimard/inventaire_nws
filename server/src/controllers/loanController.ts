import { Request, Response, NextFunction } from 'express';
import dataMapperLoan from '../models/DataMappers/dataMapperLoan';
import CustomError from '../handlers/CustomError';
import { Loan } from '../types/loan';

//Fonction permettant de déterminer un date avec un mois de plus
function dateAddMonths(monthNbr: number, date: Date) {
  const testDate = (new Date(date.getFullYear(), date.getMonth() + 1 + monthNbr, 0)).getDate();
if (date.getDate() > testDate){
date.setDate(testDate);
}
date.setMonth(date.getMonth() + monthNbr);
return date;
};


//Controller gérant les requetes concernat les emprunts
const loanController = {
    //Enrengistre en BDD un nouvel emprunt
    async postLoan(req: Request, res: Response, next: NextFunction): Promise<void> {        
                
        const inventory_id: number = parseInt(req.params.inventory_id, 10);
        const study_id: number = parseInt(req.params.study_id, 10);
        const quantity: number = parseInt(req.body.quantity, 10)
        
        //Test si la date est conforme, si elle ne l'ai pas new Date donne l'année 1970
        // const testedDate = (new Date(req.body.loaning_date)).getFullYear();
        // if(testedDate === 1970) {
        //     throw new CustomError('La date n\'est pas conforme')
        // }
        

        const loaning_date: Date = new Date;
        
        // const loaning_date: Date = new Date(req.body.loaning_date) || new Date;
        const due_date: Date = dateAddMonths(1, new Date);


        const data: Loan = {
            inventory_id: inventory_id,
            study_id: study_id,
            quantity: quantity,
            loaning_date: loaning_date,
            due_date: due_date,
        };                
        
        const loan = await dataMapperLoan.postLoan(data);
        
        if(loan) {
            res.status(200).send(loan);
        } else {
            const err = new CustomError('Impossible d\'ajouter cet emprunt');
            next(err);
        }
    },
    // Modifie en BDD un étudiant
    async patchLoan(req: Request, res: Response, next: NextFunction): Promise<void> {        
        const id: number = parseInt(req.params.loan_id);
        
        //Test si la date est conforme, si elle ne l'ai pas new Date donne l'année 1970
        const testedDate = (new Date(req.body.loaning_date)).getFullYear();
        
        if(testedDate === 1970) {
          throw new CustomError('La date n\'est pas conforme')
        }

        const loaning_date: Date = new Date(req.body.loaning_date) || new Date;
        const due_date: Date = dateAddMonths(1, new Date(req.body.loaning_date) || new Date);

        const data: Loan = {
          inventory_id: parseInt(req.body.inventory_id, 10),
          study_id: parseInt(req.body.study_id, 10),
          quantity: parseInt(req.body.quantity, 10),
          loaning_date: loaning_date,
          due_date: due_date,
      };        
      
        const study = await dataMapperLoan.patchLoan(id, data);
        if(study) {
            res.status(200).send(study);
        } else {
            const err = new CustomError('Impossible de modifier cet emprunt');
            next(err);
        }
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
    // //Efface un étudiant en BDD
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
