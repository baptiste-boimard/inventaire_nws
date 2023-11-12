"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/handlers/CustomError.ts
var CustomError;
var init_CustomError = __esm({
  "src/handlers/CustomError.ts"() {
    "use strict";
    CustomError = class _CustomError extends Error {
      constructor(message, status) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, _CustomError.prototype);
      }
    };
  }
});

// src/models/dbClient.ts
var Pool, client, dbClient_default;
var init_dbClient = __esm({
  "src/models/dbClient.ts"() {
    "use strict";
    require("dotenv").config();
    ({ Pool } = require("pg"));
    client = new Pool({
      connectionString: process.env.URL_DATABASE,
      ssl: {
        rejectUnauthorized: false
      }
    });
    client.connect();
    dbClient_default = client;
  }
});

// src/models/DataMappers/dataMapperLoan.ts
var dataMapperLoan, dataMapperLoan_default;
var init_dataMapperLoan = __esm({
  "src/models/DataMappers/dataMapperLoan.ts"() {
    "use strict";
    init_CustomError();
    init_dbClient();
    dataMapperLoan = {
      //Enrengistre un emprunt dans la table loan
      async postLoan(loan) {
        const query = {
          text: `INSERT INTO loan
            (inventory_id, study_id, loan_quantity, loaning_date, due_date)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`,
          values: [loan.inventory_id, loan.study_id, loan.loan_quantity, loan.loaning_date, loan.due_date]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'emprunt a rencontr\xE9 un probl\xE8me", 403);
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
            ON l.study_id = s.study_id;`
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'emprunt", 403);
        }
        return data.rows;
      },
      //Récupére un étudiant dans la base study
      async getOneLoan(id) {
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
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet emprunt", 403);
        }
        return data.rows[0];
      },
      //Efface un étudiant dans la base study
      async deleteOneLoan(id) {
        const query = {
          text: `DELETE FROM loan
            WHERE loan_id = $1`,
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Vous ne pouvez pas supprimer cet emprunt", 403);
        }
        return data;
      }
    };
    dataMapperLoan_default = dataMapperLoan;
  }
});

// src/utils/createMailTransporter.ts
var nodemailer, createMailTransporter, createMailTransporter_default;
var init_createMailTransporter = __esm({
  "src/utils/createMailTransporter.ts"() {
    "use strict";
    nodemailer = require("nodemailer");
    createMailTransporter = () => {
      const transporter = nodemailer.createTransport({
        // si SMTP ou autre consulter la doc de nodemailer
        service: "hotmail",
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS
        }
      });
      return transporter;
    };
    createMailTransporter_default = createMailTransporter;
  }
});

// src/utils/sendMail.ts
async function sendMail(mailData) {
  return new Promise((resolve) => {
    const transporter = createMailTransporter_default();
    const mailOptions = {
      from: '"Bureau des emprunts de la NWS" <inv_bb_nws@outlook.fr>',
      to: mailData.email,
      subject: "Confirmation de votre pr\xEAt",
      html: `<p>Bonjour, je vous confirme le pr\xEAt de la part de la NWS de ${mailData.loan_quantity} ${mailData.name} \xE0 la date du ${mailData.loaning_date}</p>
      <p>Ce mat\xE9riel sera \xE0 rendre avant la date du ${mailData.due_date}</p>
      <p>Cordialement, bonne journ\xE9e.</p>`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}
async function sendMailRelaunch(relaunchData) {
  const transporter = nodemailer2.createTransport({
    // si SMTP ou autre consulter la doc de nodemailer
    service: "hotmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  });
  const mailOptions = {
    from: '"Bureau des emprunts de la NWS" <inv_bb_nws@outlook.fr>',
    to: relaunchData.email,
    subject: "Rappel vous avez un mat\xE9riel \xE0 ramener \xE0 la NWS",
    html: `<p>Bonjour, je vous rappel le pr\xEAt de la part de la NWS de ${relaunchData.loan_quantity} ${relaunchData.name} \xE0 la date du ${relaunchData.loaning_date}</p>
      <p>Ce mat\xE9riel est \xE0 rendre avant la date du ${relaunchData.due_date}</p>
      <p>N'oubliez pas !!</p>
      <p>Cordialement, bonne journ\xE9e.</p>`
  };
  return transporter.sendMail(mailOptions);
}
var nodemailer2;
var init_sendMail = __esm({
  "src/utils/sendMail.ts"() {
    "use strict";
    init_createMailTransporter();
    nodemailer2 = require("nodemailer");
  }
});

// src/controllers/loanController.ts
var import_moment, loanController, loanController_default;
var init_loanController = __esm({
  "src/controllers/loanController.ts"() {
    "use strict";
    init_dataMapperLoan();
    init_sendMail();
    import_moment = __toESM(require("moment"));
    loanController = {
      //Enrengistre en BDD un nouvel emprunt
      async postLoan(req, res, next) {
        const inventory_id = parseInt(req.params.inventory_id, 10);
        const study_id = parseInt(req.params.study_id, 10);
        const loan_quantity = parseInt(req.body.loan_quantity, 10);
        if (typeof loan_quantity !== "number" || Number.isInteger(loan_quantity) !== true) {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        }
        const loaning_date = (0, import_moment.default)().format("DD/MM/YYYY");
        const due_date = (0, import_moment.default)().add(1, "M").format("DD/MM/YYYY");
        const data = {
          inventory_id,
          study_id,
          loan_quantity,
          loaning_date,
          due_date
        };
        const loan = await dataMapperLoan_default.postLoan(data);
        if (!loan) {
          res.status(403).send("Impossible d'ajouter cet emprunt");
          return next();
        }
        const mailData = {
          name: req.body.name,
          loan_quantity,
          email: req.body.email,
          loaning_date,
          due_date
        };
        const sucessMailSend = await sendMail(mailData);
        if (!sucessMailSend) {
          res.status(421).send(`Le service d'envoi de mail est indisponible ou l'adresse mail n'est pas valide`);
          return next();
        }
        res.status(200).send(loan);
      },
      //** Envoi un mail de relance à l'atudiant */
      async studyRelaunch(req, res, next) {
        const relaunchData = {
          name: req.body.name,
          loan_quantity: req.body.loan_quantity,
          loaning_date: req.body.loaning_date,
          due_date: req.body.due_date,
          email: req.body.email
        };
        const sucessMailRelaunch = await sendMailRelaunch(relaunchData);
        if (!sucessMailRelaunch) {
          res.status(421).send(`Le service d'envoi de mail est indisponible ou l'adresse mail n'est pas valide`);
          return next();
        }
        res.status(200).send(sucessMailRelaunch);
      },
      //Récupère tous les étudants en BDD
      async getLoan(req, res, next) {
        const loan = await dataMapperLoan_default.getLoan();
        if (loan) {
          res.status(200).send(loan);
        } else {
          res.status(403).send("Impossible de r\xE9cup\xE9rer les donn\xE9es des emprunts");
          return next();
        }
      },
      //Récupère un étudiant en BDD
      async getOneLoan(req, res, next) {
        const id = parseInt(req.params.loan_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const loan = await dataMapperLoan_default.getOneLoan(id);
        if (loan) {
          res.status(200).send(loan);
        } else {
          res.status(403).send("Les informations sur cet emprunt ne sont pas disponible");
          return next();
        }
      },
      //Efface un étudiant en BDD
      async deleteOneLoan(req, res, next) {
        const id = parseInt(req.params.loan_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const deleteStudy = await dataMapperLoan_default.deleteOneLoan(id);
        if (deleteStudy) {
          res.status(200).send(deleteStudy);
        } else {
          res.status(403).send("Vous ne pouvez pas supprimer cet emprunt");
          return next();
        }
      }
    };
    loanController_default = loanController;
  }
});

// src/models/DataMappers/dataMapperInventory.ts
var dataMapperInventory, dataMapperInventory_default;
var init_dataMapperInventory = __esm({
  "src/models/DataMappers/dataMapperInventory.ts"() {
    "use strict";
    init_CustomError();
    init_dbClient();
    dataMapperInventory = {
      // POST un inventaire dans la table inventory
      async postInventory(inventory) {
        const query = {
          text: `INSERT INTO inventory
            (name, quantity, details)
            VALUES ($1, $2, $3)
            RETURNING *;`,
          values: [inventory.name, inventory.quantity, inventory.details]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'article dans l'inventaire a rencontr\xE9 un probl\xE8me", 403);
        }
        return data;
      },
      async patchInventory(id, inventory) {
        const query = {
          text: `UPDATE inventory
            SET name =$1, quantity=$2, details=$3
            WHERE inventory_id = $4`,
          values: [inventory.name, inventory.quantity, inventory.details, id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("La modification de l'article dans l'inventaire a rencontr\xE9 un probl\xE8me", 403);
        }
        return data;
      },
      async getInventory() {
        const query = {
          text: `SELECT *
            FROM inventory
            ORDER BY inventory_id ASC`
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'inventaire", 403);
        }
        return data.rows;
      },
      async getOneInventory(id) {
        const query = {
          text: `SELECT * FROM inventory
            WHERE inventory_id = $1`,
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet article", 403);
        }
        return data.rows[0];
      },
      async deleteOneInventory(id) {
        try {
          const query = {
            text: `DELETE FROM inventory
              WHERE inventory_id = $1`,
            values: [id]
          };
          const data = await dbClient_default.query(query);
          return data;
        } catch (error) {
          throw new CustomError(error.message, 403);
        }
      }
    };
    dataMapperInventory_default = dataMapperInventory;
  }
});

// src/controllers/inventoryController.ts
var inventoryController, inventoryController_default;
var init_inventoryController = __esm({
  "src/controllers/inventoryController.ts"() {
    "use strict";
    init_dataMapperInventory();
    inventoryController = {
      //Enrengistre en BDD un nouvel article
      async postInventory(req, res, next) {
        const quantity = parseInt(req.body.quantity, 10);
        if (typeof req.body.name !== "string" || typeof quantity !== "number" || typeof req.body.details !== "string" || Number.isInteger(quantity) !== true) {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        } else {
        }
        const data = {
          name: req.body.name,
          quantity: req.body.quantity,
          details: req.body.details
        };
        const inventory = await dataMapperInventory_default.postInventory(data);
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          res.status(403).send("Impossible d'ajouter cet artcle dans l'inventaire");
          return next();
        }
      },
      //Modifie en BDD un article
      async patchInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        const quantity = parseInt(req.body.quantity, 10);
        if (typeof req.body.name !== "string" || typeof req.body.quantity !== "number" || typeof req.body.details !== "string") {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        }
        const data = {
          name: req.body.name,
          quantity,
          details: req.body.details
        };
        const inventory = await dataMapperInventory_default.patchInventory(id, data);
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          res.status(403).send("Impossible de modifier cet artcle dans l'inventaire");
          return next();
        }
      },
      async getInventory(req, res, next) {
        const inventory = await dataMapperInventory_default.getInventory();
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          res.status(403).send("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'inventaire");
          return next();
        }
      },
      async getOneInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const inventory = await dataMapperInventory_default.getOneInventory(id);
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          res.status(403).send("Les informations sur ce mat\xE9riel ne sont pas disponibe");
          return next();
        }
      },
      async deleteOneInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const deleteInventory = await dataMapperInventory_default.deleteOneInventory(id);
        if (deleteInventory) {
          res.status(200).send(deleteInventory);
        } else {
          res.status(403).send("Vous ne pouvez pas supprimer cet article");
          return next();
        }
      }
    };
    inventoryController_default = inventoryController;
  }
});

// src/models/DataMappers/dataMapperStudy.ts
var dataMapperStudy, dataMapperStudy_default;
var init_dataMapperStudy = __esm({
  "src/models/DataMappers/dataMapperStudy.ts"() {
    "use strict";
    init_CustomError();
    init_dbClient();
    dataMapperStudy = {
      //Enrengistre un étudiant dans la table study
      async postStudy(study) {
        const query = {
          text: `INSERT INTO study
            (firstname, lastname, email)
            VALUES ($1, $2, $3)
            RETURNING *;`,
          values: [study.firstname, study.lastname, study.email]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'\xE9tudiant a rencontr\xE9 un probl\xE8me", 403);
        }
        return data;
      },
      //Modifie un étudiant dans la table study
      async patchStudy(id, study) {
        const query = {
          text: `UPDATE study
            SET firstname =$1, lastname=$2, email=$3
            WHERE study_id = $4`,
          values: [study.firstname, study.lastname, study.email, id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("La modification de l'\xE9tudiant a rencontr\xE9 un probl\xE8me", 403);
        }
        return data;
      },
      //Récupére tous les étudiants dans la base study
      async getStudy() {
        const query = {
          text: `SELECT *
            FROM study
            ORDER BY study_id`
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'\xE9tudiant", 403);
        }
        return data.rows;
      },
      //Récupére un étudiant dans la base study
      async getOneStudy(id) {
        const query = {
          text: `SELECT * FROM study
            WHERE study_id = $1`,
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet \xE9tudiant", 403);
        }
        return data.rows[0];
      },
      //Efface un étudiant dans la base study
      async deleteOneStudy(id) {
        try {
          const query = {
            text: `DELETE FROM study
              WHERE study_id = $1`,
            values: [id]
          };
          const data = await dbClient_default.query(query);
          return data;
        } catch (error) {
          throw new CustomError(error.message, 403);
        }
      }
    };
    dataMapperStudy_default = dataMapperStudy;
  }
});

// src/controllers/studyControler.ts
var studyController, studyControler_default;
var init_studyControler = __esm({
  "src/controllers/studyControler.ts"() {
    "use strict";
    init_dataMapperStudy();
    init_dbClient();
    studyController = {
      //Enrengistre en BDD un nouvel étudiant
      async postStudy(req, res, next) {
        console.log(req.body);
        if (typeof req.body.firstname !== "string" || typeof req.body.lastname !== "string" || typeof req.body.email !== "string") {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        }
        if (req.body.firstname === "" || req.body.lastname === "" || req.body.email === "") {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        }
        const existingEmail = await dbClient_default.query({
          text: `SELECT * FROM study
                    WHERE study.email = $1`,
          values: [req.body.email]
        });
        console.log(existingEmail.rowCount);
        if (existingEmail.rowCount) {
          res.status(403).send("Un \xE9tudiant avec cet email existe d\xE8j\xE0");
          return next();
        }
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email
        };
        const study = await dataMapperStudy_default.postStudy(data);
        if (study) {
          res.status(200).send(study);
        } else {
          res.status(403).send("Impossible d'ajouter cet \xE9tudiant");
          return next();
        }
      },
      //Modifie en BDD un étudiant
      async patchStudy(req, res, next) {
        const id = parseInt(req.params.study_id);
        if (typeof req.body.firstname !== "string" || typeof req.body.lastname !== "string" || typeof req.body.email !== "string") {
          res.status(400).send("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          return next();
        }
        const data = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email
        };
        const study = await dataMapperStudy_default.patchStudy(id, data);
        if (study) {
          res.status(200).send(study);
        } else {
          res.status(403).send("Impossible de modifier cet \xE9tudiant");
          return next();
        }
      },
      //Récupère tous les étudiants en BDD
      async getStudy(req, res, next) {
        const study = await dataMapperStudy_default.getStudy();
        if (study) {
          res.status(200).send(study);
        } else {
          res.status(403).send("Impossible de r\xE9cup\xE9rer les donn\xE9es des \xE9tudiant");
          return next();
        }
      },
      //Récupère un étudiant en BDD
      async getOneStudy(req, res, next) {
        const id = parseInt(req.params.study_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const study = await dataMapperStudy_default.getOneStudy(id);
        if (study) {
          res.status(200).send(study);
        } else {
          res.status(403).send("Les informations sur cet \xE9tudiant ne sont pas disponible");
          return next();
        }
      },
      //Efface un étudiant en BDD
      async deleteOneStudy(req, res, next) {
        const id = parseInt(req.params.study_id, 10);
        if (!id) {
          res.status(403).send("Une erreur est survenue lors de votre demande");
          return next();
        }
        const deleteStudy = await dataMapperStudy_default.deleteOneStudy(id);
        if (deleteStudy) {
          res.status(200).send(deleteStudy);
        } else {
          res.status(403).send("Vous ne pouvez pas supprimer cet \xE9tudiant");
          return next();
        }
      }
    };
    studyControler_default = studyController;
  }
});

// src/handlers/routerWrapper.ts
var routerWrapper, routerWrapper_default;
var init_routerWrapper = __esm({
  "src/handlers/routerWrapper.ts"() {
    "use strict";
    routerWrapper = (method) => async (req, res, next) => {
      try {
        await method(req, res, next);
      } catch (error) {
        next(error);
      }
      ;
    };
    routerWrapper_default = routerWrapper;
  }
});

// src/routers/router.ts
var require_router = __commonJS({
  "src/routers/router.ts"(exports, module2) {
    "use strict";
    init_loanController();
    init_inventoryController();
    init_studyControler();
    init_routerWrapper();
    var express2 = require("express");
    var router2 = express2.Router();
    router2.get("/inventory", routerWrapper_default(inventoryController_default.getInventory));
    router2.get("/inventory/:inventory_id", routerWrapper_default(inventoryController_default.getOneInventory));
    router2.post("/inventory", routerWrapper_default(inventoryController_default.postInventory));
    router2.patch("/inventory/:inventory_id", routerWrapper_default(inventoryController_default.patchInventory));
    router2.delete("/inventory/:inventory_id", routerWrapper_default(inventoryController_default.deleteOneInventory));
    router2.get("/study", routerWrapper_default(studyControler_default.getStudy));
    router2.get("/study/:study_id", routerWrapper_default(studyControler_default.getOneStudy));
    router2.post("/study", routerWrapper_default(studyControler_default.postStudy));
    router2.patch("/study/:study_id", routerWrapper_default(studyControler_default.patchStudy));
    router2.delete("/study/:study_id", routerWrapper_default(studyControler_default.deleteOneStudy));
    router2.post("/loan/:inventory_id/:study_id", routerWrapper_default(loanController_default.postLoan));
    router2.post("/loan/relaunch", routerWrapper_default(loanController_default.studyRelaunch));
    router2.get("/loan", routerWrapper_default(loanController_default.getLoan));
    router2.get("/loan/:loan_id", routerWrapper_default(loanController_default.getOneLoan));
    router2.delete("/loan/:loan_id", routerWrapper_default(loanController_default.deleteOneLoan));
    module2.exports = router2;
  }
});

// src/handlers/handleError.ts
var debug = require("debug")("HANDLEERROR");
var handleError = async (error, req, res, next) => {
  debug(`${error.message} | status : ${error.status}`);
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
      status: error.status
    }
  });
};
var handleError_default = handleError;

// src/index.ts
require("dotenv").config();
var express = require("express");
var app = express();
var router = require_router();
var PORT = parseInt(process.env.PORT, 10);
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(`Access-Control-Allow-Methods`, `GET, PATCH, PUT, POST, DELETE, OPTIONS, HEAD`);
  res.header(`Access-Control-Allow-Headers`, `Origin, X-Requested-With,Content-Type,Authorization, Accept`);
  res.header(`Access-Control-Allow-Credentials`, "true");
  next();
});
app.use(router);
app.use(express.static("docs"));
app.use(handleError_default);
app.listen(PORT, process.env.URL_SERVER, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
