let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    id: Number,
    nom: String,
    photoMatiere: String,
    photoProf: String,
    nomProf: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Matiere', MatiereSchema);