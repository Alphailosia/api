let Matiere = require('../model/matiere')

// commentaire
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