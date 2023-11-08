# 0. je prends l'identité de postgres
export PGUSER=mamairieV2

# 1. Création d'un utilisateur en BDD (with login)
createuser nwsinventory --login --password

# 2. Création d'une BDD ocolis dont le propriétaire est ocolis_admin
createdb nwsinventory --owner nwsinventory

# 3. Initialiser Sqitch
sqitch init nwsinventory_sqitch --engine pg # on indique qu'on travaille avec postgres (pg)

# 4. Je crèe une version 1 pour ma BDD
sqitch add 1.Create_DB -n "Create DB"
