-- Verify nwsinventory_sqitch:2.Ajout_des_tables on pg

BEGIN;

SELECT "inventory_id", "name", "quantity", "details", "created_at","updated_at" FROM inventory;
SELECT "study_id", "firstname", "lastname", "email", "created_at", "updated_at" FROM loan;
SELECT "loan_id", "inventory_id", "study_id", "created_at", "updated_at" FROM study;


ROLLBACK;
