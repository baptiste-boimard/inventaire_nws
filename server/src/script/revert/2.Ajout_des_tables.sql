-- Revert nwsinventory_sqitch:2.Ajout_des_tables from pg

BEGIN;

DROP TABLE IF EXISTS inventory, loan, study CASCADE;

COMMIT;
