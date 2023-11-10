import createMailTransporter from './createMailTransporter';

export interface MailData {
  name: string,
  quantity:number,
  email:string,
  loaning_date: Date,
  due_date: Date,
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
      html: `<p>Bonjour, je vous confirme le prêt de la part de la NWS de ${mailData.quantity} ${mailData.name} à la date du ${mailData.loaning_date}</p>
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

export default sendMail;

