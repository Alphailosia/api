# Partie serveur de notre projet

### Groupe :  
Stéphane Désiré  
Sabrina Mercuri  

### Lien heroku :  
https://angular-intense-app.herokuapp.com/   

### Lancer la partie serveur en local :  
- penser à faire `npm i`  
- lancer avec : `node serveur.js`   

### Fonctionnalités :  

- Gestion login/password (connexion et inscription avec authentification à l'aide de Json Web Tokens)   
- Ajout de contenu pour les assignments : ajout de "matière" et "étudiant" via des collections mongoDb   
- Affichage des assignments dans une table angular material  
- Ajout des filtres (On peut choisir l'état de l'assignment (rendu ou non), l'étudiant et la matière et coupler les 3 à la fois)   
- Ajout d'un champ de recherche (sur le nom de l'assignment uniquement et écrit en respectant les majuscules et minuscules)   


### Fonctionnalités supplémentaires : 
- Ajout d'un formulaire stepper (pour l'ajout d'assignment)
- Pouvoir éditer un assignment sur le nom, la date de rendu, la note, remarque   
- Ajout d'un mot de passe pour pouvoir éditer et supprimer un assignment `(mot de passe = admin)`   
- Ajout de snack bar pour la connexion, l'inscription, l'ajout, l'édition et la suppression    
