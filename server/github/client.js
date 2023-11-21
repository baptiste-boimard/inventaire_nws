const { Client } = require('pg');

const pgclient = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
});

pgclient.connect();

const table = `CREATE TABLE IF NOT EXISTS public.inventory (
                "inventory_id" INT GENERATED ALWAYS AS IDENTITY,
                "name" TEXT NOT NULL UNIQUE,
                "quantity" INT,
                "details" TEXT,
                "created_at" TIMESTAMPTZ DEFAULT NOW(),
                "updated_at" TIMESTAMPTZ,
                CONSTRAINT inventory_id_pk PRIMARY KEY (inventory_id)
              );

              CREATE TABLE IF NOT EXISTS public.study (
                "study_id" INT GENERATED ALWAYS AS IDENTITY,
                "firstname" TEXT NOT NULL,
                "lastname" TEXT NOT NULL,
                "email" TEXT NOT NULL UNIQUE,
                "created_at" TIMESTAMPTZ DEFAULT NOW(),
                "updated_at" TIMESTAMPTZ,
                CONSTRAINT study_id_pk PRIMARY KEY (study_id)
              );
              
              CREATE TABLE IF NOT EXISTS public.loan (
                "loan_id" INT GENERATED ALWAYS AS IDENTITY,
                "inventory_id" INT NOT NULL, 
                "study_id" INT NOT NULL, 
                "loan_quantity" INT NOT NULL,
                "loaning_date" TEXT NOT NULL,
                "due_date" TEXT NOT NULL,
                "created_at" TIMESTAMPTZ DEFAULT NOW(),
                "updated_at" TIMESTAMPTZ,
                CONSTRAINT loan_id_pk PRIMARY KEY (loan_id),
                CONSTRAINT inventory_id_fk FOREIGN KEY (inventory_id)
                  REFERENCES public.inventory (inventory_id) MATCH SIMPLE
                  ON UPDATE NO ACTION
                  ON DELETE NO ACTION
                  NOT VALID,
                CONSTRAINT study_id_fk FOREIGN KEY (study_id)
                REFERENCES public.study (study_id) MATCH SIMPLE
                ON UPDATE NO ACTION
                ON DELETE NO ACTION
                NOT VALID
              );`

pgclient.query(table, (err, res) => {
    if (err) throw err
});

pgclient.query(`
                INSERT INTO inventory
                (name, quantity, details)
                VALUES($1,$2,$3) RETURNING *`, 
                ['coucou', 1, 'coucou'], (err, res) => {
  if (err) throw err
});


pgclient.query('SELECT * FROM inventory', (err, res) => {
    if (err) throw err
    console.log(err, res.rows) // Print the data in student table
    pgclient.end()
});
