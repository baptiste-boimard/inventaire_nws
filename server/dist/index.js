"use strict";
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/handlers/CustomError.ts
var CustomError;
var init_CustomError = __esm({
  "src/handlers/CustomError.ts"() {
    "use strict";
    CustomError = class _CustomError extends Error {
      constructor(message) {
        super(message);
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
            (inventory_id, study_id, loaning_date, due_date)
            VALUES ($1, $2, $3, $4)
            RETURNING loan_id;`,
          values: [loan.inventory_id, loan.study_id, loan.loaning_date, loan.due_date]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'emprunt a rencontr\xE9 un probl\xE8me");
        }
        return data;
      },
      //Modifie un étudiant dans la table study
      async patchLoan(id, loan) {
        const query = {
          text: `UPDATE loan
            SET inventory_id =$1, study_id=$2, loaning_date=$3, due_date=$4
            WHERE loan_id = $5`,
          values: [loan.inventory_id, loan.study_id, loan.loaning_date, loan.due_date, id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("La modification de l'emprunt a rencontr\xE9 un probl\xE8me");
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'emprunt");
        }
        return data.rows[0];
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet emprunt");
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
          throw new CustomError("Vous ne pouvez pas supprimer cet emprunt");
        }
        return data;
      }
    };
    dataMapperLoan_default = dataMapperLoan;
  }
});

// src/controllers/loanController.ts
function dateAddMonths(monthNbr, date) {
  const testDate = new Date(date.getFullYear(), date.getMonth() + 1 + monthNbr, 0).getDate();
  if (date.getDate() > testDate) {
    date.setDate(testDate);
  }
  date.setMonth(date.getMonth() + monthNbr);
  return date;
}
var loanController, loanController_default;
var init_loanController = __esm({
  "src/controllers/loanController.ts"() {
    "use strict";
    init_dataMapperLoan();
    init_CustomError();
    loanController = {
      //Enrengistre en BDD un nouvel emprunt
      async postLoan(req, res, next) {
        const inventory_id = parseInt(req.params.inventory_id);
        const study_id = parseInt(req.params.study_id);
        const testedDate = new Date(req.body.loaning_date).getFullYear();
        if (testedDate === 1970) {
          throw new CustomError("La date n'est pas conforme");
        }
        const loaning_date = new Date(req.body.loaning_date) || /* @__PURE__ */ new Date();
        const due_date = dateAddMonths(1, new Date(req.body.loaning_date) || /* @__PURE__ */ new Date());
        const data = {
          inventory_id,
          study_id,
          loaning_date,
          due_date
        };
        const loan = await dataMapperLoan_default.postLoan(data);
        if (loan) {
          res.status(200).send(loan);
        } else {
          const err = new CustomError("Impossible d'ajouter cet emprunt");
          next(err);
        }
      },
      // Modifie en BDD un étudiant
      async patchLoan(req, res, next) {
        const id = parseInt(req.params.loan_id);
        const testedDate = new Date(req.body.loaning_date).getFullYear();
        if (testedDate === 1970) {
          throw new CustomError("La date n'est pas conforme");
        }
        const loaning_date = new Date(req.body.loaning_date) || /* @__PURE__ */ new Date();
        const due_date = dateAddMonths(1, new Date(req.body.loaning_date) || /* @__PURE__ */ new Date());
        const data = {
          inventory_id: parseInt(req.body.inventory_id, 10),
          study_id: parseInt(req.body.study_id),
          loaning_date,
          due_date
        };
        const study = await dataMapperLoan_default.patchLoan(id, data);
        if (study) {
          res.status(200).send(study);
        } else {
          const err = new CustomError("Impossible de modifier cet emprunt");
          next(err);
        }
      },
      //Récupère tous les étudants en BDD
      async getLoan(req, res, next) {
        const loan = await dataMapperLoan_default.getLoan();
        if (loan) {
          res.status(200).send(loan);
        } else {
          const err = new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es des emprunts");
          next(err);
        }
      },
      //Récupère un étudiant en BDD
      async getOneLoan(req, res, next) {
        const id = parseInt(req.params.loan_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const loan = await dataMapperLoan_default.getOneLoan(id);
        if (loan) {
          res.status(200).send(loan);
        } else {
          const err = new CustomError("Les informations sur cet emprunt ne sont pas disponible");
          next(err);
        }
      },
      // //Efface un étudiant en BDD
      async deleteOneLoan(req, res, next) {
        const id = parseInt(req.params.loan_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const deleteStudy = await dataMapperLoan_default.deleteOneLoan(id);
        if (deleteStudy) {
          res.status(200).send(deleteStudy);
        } else {
          const err = new CustomError("Vous ne pouvez pas supprimer cet emprunt");
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
            RETURNING inventory_id;`,
          values: [inventory.name, inventory.quantity, inventory.details]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'article dans l'inventaire a rencontr\xE9 un probl\xE8me");
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
          throw new CustomError("La modification de l'article dans l'inventaire a rencontr\xE9 un probl\xE8me");
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'inventaire");
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet article");
        }
        return data.rows[0];
      },
      async deleteOneInventory(id) {
        const query = {
          text: `DELETE FROM inventory
            WHERE inventory_id = $1`,
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Vous ne pouvez pas supprimer cet article");
        }
        return data;
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
    init_CustomError();
    inventoryController = {
      //Enrengistre en BDD un nouvel article
      async postInventory(req, res, next) {
        const quantity = parseInt(req.body.quantity, 10);
        if (typeof req.body.name !== "string" || typeof quantity !== "number" || typeof req.body.details !== "string" || Number.isInteger(quantity) !== true) {
          throw new CustomError("Le format de donn\xE9es envoy\xE9 ne correpond pas");
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
          const err = new CustomError("Impossible d'ajouter cet artcle dans l'inventaire");
          next(err);
        }
      },
      //Modifie en BDD un article
      async patchInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        const quantity = parseInt(req.body.quantity, 10);
        if (typeof req.body.name !== "string" || typeof req.body.quantity !== "number" || typeof req.body.details !== "string") {
          const err = new CustomError("Le format de donn\xE9es envoy\xE9 ne correpond pas");
          next(err);
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
          const err = new CustomError("Impossible de modifier cet artcle dans l'inventaire");
          next(err);
        }
      },
      async getInventory(req, res, next) {
        const inventory = await dataMapperInventory_default.getInventory();
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          const err = new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'inventaire");
          next(err);
        }
      },
      async getOneInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const inventory = await dataMapperInventory_default.getOneInventory(id);
        if (inventory) {
          res.status(200).send(inventory);
        } else {
          const err = new CustomError("Les informations sur ce mat\xE9riel ne sont pas disponibe");
          next(err);
        }
      },
      async deleteOneInventory(req, res, next) {
        const id = parseInt(req.params.inventory_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const deleteInventory = await dataMapperInventory_default.deleteOneInventory(id);
        if (deleteInventory) {
          res.status(200).send(deleteInventory);
        } else {
          const err = new CustomError("Vous ne pouvez pas supprimer cet article");
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
            RETURNING study_id;`,
          values: [study.firstname, study.lastname, study.email]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("L'ajout de l'\xE9tudiant a rencontr\xE9 un probl\xE8me");
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
          throw new CustomError("La modification de l'\xE9tudiant a rencontr\xE9 un probl\xE8me");
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de  l'\xE9tudiant");
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
          throw new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es de cet \xE9tudiant");
        }
        return data.rows[0];
      },
      //Efface un étudiant dans la base study
      async deleteOneStudy(id) {
        const query = {
          text: `DELETE FROM study
            WHERE study_id = $1`,
          values: [id]
        };
        const data = await dbClient_default.query(query);
        if (!data) {
          throw new CustomError("Vous ne pouvez pas supprimer cet \xE9tudiant");
        }
        return data;
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
    init_CustomError();
    studyController = {
      //Enrengistre en BDD un nouvel étudiant
      async postStudy(req, res, next) {
        if (typeof req.body.firstname !== "string" || typeof req.body.lastname !== "string" || typeof req.body.email !== "string") {
          throw new CustomError("Le format de donn\xE9es envoy\xE9 ne correpond pas");
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
          const err = new CustomError("Impossible d'ajouter cet \xE9tudiant");
          next(err);
        }
      },
      //Modifie en BDD un étudiant
      async patchStudy(req, res, next) {
        const id = parseInt(req.params.study_id);
        if (typeof req.body.firstname !== "string" || typeof req.body.lastname !== "string" || typeof req.body.email !== "string") {
          throw new CustomError("Le format de donn\xE9es envoy\xE9 ne correpond pas");
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
          const err = new CustomError("Impossible de modifier cet \xE9tudiant");
          next(err);
        }
      },
      //Récupère tous les étudiants en BDD
      async getStudy(req, res, next) {
        const study = await dataMapperStudy_default.getStudy();
        if (study) {
          res.status(200).send(study);
        } else {
          const err = new CustomError("Impossible de r\xE9cup\xE9rer les donn\xE9es des \xE9tudiant");
          next(err);
        }
      },
      //Récupère un étudiant en BDD
      async getOneStudy(req, res, next) {
        const id = parseInt(req.params.study_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const study = await dataMapperStudy_default.getOneStudy(id);
        if (study) {
          res.status(200).send(study);
        } else {
          const err = new CustomError("Les informations sur cet \xE9tudiant ne sont pas disponible");
          next(err);
        }
      },
      //Efface un étudiant en BDD
      async deleteOneStudy(req, res, next) {
        const id = parseInt(req.params.study_id, 10);
        if (!id) {
          const err = new CustomError("Une erreur est survenue lors de votre demande");
          next(err);
        }
        const deleteStudy = await dataMapperStudy_default.deleteOneStudy(id);
        if (deleteStudy) {
          res.status(200).send(deleteStudy);
        } else {
          const err = new CustomError("Vous ne pouvez pas supprimer cet \xE9tudiant");
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
    router2.get("/loan", routerWrapper_default(loanController_default.getLoan));
    router2.get("/loan/:loan_id", routerWrapper_default(loanController_default.getOneLoan));
    router2.patch("/loan/:loan_id", routerWrapper_default(loanController_default.patchLoan));
    router2.delete("/loan/:loan_id", routerWrapper_default(loanController_default.deleteOneLoan));
    module2.exports = router2;
  }
});

// src/index.ts
var import_config = require("dotenv/config");

// src/handlers/handleError.ts
var debug = require("debug")("HANDLEERROR");
var handleError = async (error, req, res, next) => {
  debug(error.message, error.status);
  res.status(error.status || 500);
  res.send({
    error: {
      message: error.message,
      status: error.status
    }
  });
  console.log(error);
};
var handleError_default = handleError;

// src/index.ts
var express = require("express");
var app = express();
var router = require_router();
var PORT = parseInt(process.env.PORT);
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
