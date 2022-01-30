let Etudiant = require('../model/etudiant')

// recupération d'un étudiant en fonction de son id
function getEtudiant(req, res) {
    let etudiantId = req.params.id;
    Etudiant.findOne({
        id: etudiantId
    },(err, etudiant) => {
        if(err){
            res.send(err)
        }
        res.send(etudiant);
    });
}

// récupération de tous les étudiants de la base de données
function getEtudiants(req, res) {
    Etudiant.find({}, (err, etudiants) => {
        if (err) {
            res.send(err)
        }
        res.json(etudiants);
    })
}

module.exports = {
    getEtudiant,
    getEtudiants
};