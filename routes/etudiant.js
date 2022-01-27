let Etudiant = require('../model/etudiant')

// commentaire
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