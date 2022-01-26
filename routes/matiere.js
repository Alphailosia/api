let Matiere = require('../model/matiere')

// commentaire
function getMatieres(req, res) {
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

module.exports = {
    getMatieres
};