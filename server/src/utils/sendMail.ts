import createMailTransporter from './createMailTransporter';

export interface MailData {
  name: string,
  loan_quantity:number,
  email:string,
  loaning_date: string,
  due_date: string,
};

export interface RelaunchData {
  name: string,
  loan_quantity: number,
  loaning_date: string,
  due_date: string,
  email: string,
};

// Fonction d'envoi du mail de vérification qui retourne une promesse
// permet de rendre l'envoi du mail asynchrone
async function sendMail(mailData: MailData) {
  return new Promise((resolve) => {
    
    const transporter = createMailTransporter();

    const mailOptions = {
      from: '"Bureau des emprunts de la NWS" <quest_bb_nws@outlook.fr>',
      to: mailData.email,
      subject: 'Confirmation de votre prêt',
      html: `<p>Bonjour, je vous confirme le prêt de la part de la NWS de ${mailData.loan_quantity} ${mailData.name} à la date du ${mailData.loaning_date}</p>
      <p>Ce matériel sera à rendre avant la date du ${mailData.due_date}</p>
      <p>Cordialement, bonne journée.</p>`
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error) {                
        resolve(false);
      } else  {        
          resolve(true);
      }
    });
  })
};

async function sendMailRelaunch(relaunchData: RelaunchData) {
  return new Promise((resolve) => {
    
    const transporter = createMailTransporter();

    const mailOptions = {
      from: '"Bureau des emprunts de la NWS" <quest_bb_nws@outlook.fr>',
      to: relaunchData.email,
      subject: 'Rappel vous avez un matériel à ramener à la NWS',
      html: `<p>Bonjour, je vous rappel le prêt de la part de la NWS de ${relaunchData.loan_quantity} ${relaunchData.name} à la date du ${relaunchData.loaning_date}</p>
      <p>Ce matériel est à rendre avant la date du ${relaunchData.due_date}</p>
      <p>N'oubliez pas !!</p>
      <p>Cordialement, bonne journée.</p>`
    };

    transporter.sendMail(mailOptions, (error: any, info: any) => {
      if(error) {                
        resolve(false);
      } else  {        
          resolve(true);
      }
    });
  })
};

export { sendMail, sendMailRelaunch };

