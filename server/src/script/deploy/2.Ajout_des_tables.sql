-- Deploy nwsinventory_sqitch:2.Ajout_des_tables to pg

BEGIN;

CREATE TABLE IF NOT EXISTS public.inventory (
  "inventory_id" INT GENERATED ALWAYS AS IDENTITY,
  "name" TEXT NOT NULL UNIQUE,
  "quantity" INT,
  "details" TEXT,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT inventory_id_pk PRIMARY KEY (inventory_id)
);

ALTER TABLE IF EXISTS public.inventory
    OWNER to "nwsinventory";


CREATE TABLE IF NOT EXISTS public.study (
  "study_id" INT GENERATED ALWAYS AS IDENTITY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT study_id_pk PRIMARY KEY (study_id)
);

ALTER TABLE IF EXISTS public.inventory
    OWNER to "nwsinventory";


CREATE TABLE IF NOT EXISTS public.loan (
  "loan_id" INT GENERATED ALWAYS AS IDENTITY,
  "inventory_id" INT NOT NULL, 
  "study_id" INT NOT NULL, 
  "loaning_date" DATE NOT NULL,
  "due_date" DATE NOT NULL,
  "created_at" TIMESTAMPTZ DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ,
  CONSTRAINT loan_id_pk PRIMARY KEY (loan_id),
  CONSTRAINT inventory_id_fk FOREIGN KEY (inventory_id)
    REFERENCES public.inventory (inventory_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE CASCADE
    NOT VALID,
  CONSTRAINT study_id_fk FOREIGN KEY (study_id)
  REFERENCES public.study (study_id) MATCH SIMPLE
  ON UPDATE NO ACTION
  ON DELETE CASCADE
  NOT VALID
);

ALTER TABLE IF EXISTS public.loan
    OWNER to "nwsinventory";


COMMIT;
