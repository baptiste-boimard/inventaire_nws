# Projet nws_inventaire

Inventaire du matériel que possède l'école
=> Etablir une liste de matériel possible (cable, chargeur, laptop, ...)

Ajouter / supprimer du matériel pour l'école
=> INSERT /DELETE en base de données sur une table style "inventaire"
    -> possiblité de créer un nouveau matériel 
=> PATCH pour modifier les infos ou les qtt

Pas d'authentification

Fonctionnalité pour emprunter
=> Création d'une table "emprunt"
    -> Liste déroulante des étudiants deja emprunteur
    -> Champs libre pour INSERT un nouvel étudiant
    -> Date d'emprunt et date de rendu
    -> Envoi d'un mail lors de l'emprunt qui inclut la date de l'emprunt, le
    matériel et la date de rendu

Fonctionalité manuel pour envoi de mail à l'etudiant pour lui rappeler
=> ajout d'un rappel sur l'interface à J-3 par exemple
    -> pour l'étudiant (auto)
    -> pour les utilisateurs (manuel)

Fonctionalité pour le rendu
=> permet de notifier que le matériel est rendu

Site déployer sur vps et fonctionel

Mise en place du TDD sur chaque commande du CRUD

Visuel sympa et ergo

Projet rendu sur github avec commit, branche et README

LE SERVICE NE RENVOIE PAS UNE ERREUR 500
PAS D'ERREUR NON DOCUMENTEE
