let Matiere = require('../model/matiere')

// recupération d'une matière en fonction de son id
function getMatiere(req, res) {
    let matiereId = req.params.id;
    Matiere.findOne({
        id: matiereId
    },(err, matiere) => {
        if(err){
            res.send(err)
        }
        res.send(matiere);
    });
}

// recupération de toutes les matières
function getMatieres(req, res) {
    Matiere.find({}, (err, matieres) => {
        if (err) {
            res.send(err)
        }
        res.json(matieres);
    })

}

module.exports = {
    getMatieres,
    getMatiere
};