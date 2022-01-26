let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EtudiantSchema = Schema({
    id: Number,
    nom: String,
    prenom: String,
    promo: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Etudiant', EtudiantSchema);