export PGUSER=nwsinventory
export PGDATABASE=nwsinventory
export PGPASSWORD=nwsinventory

sqitch revert db:pg:nwsinventory 1.Create_DB
# sqitch revert db:pg:mamairieV2 2.Ajout_des_tables
