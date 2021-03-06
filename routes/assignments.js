let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {

    // expression regulière pour matcher avec le nom de l'assignment
    let nameMatch = new RegExp(req.query.nomAssignment)

    let valeur = (req.query.estRendu === 'true')
    let matiere = parseInt(req.query.matiere)
    let etudiant = parseInt(req.query.etudiant)
    
    // recupération des données en fonction des paramètres de la query (assignment rendu ou non ou les deux, la matière sélectionnée, l'étudiant sélectionné)
    var aggregateQuery
    if (req.query.estRendu === undefined && req.query.matiere !== 'undefined' && req.query.etudiant !== 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {matiere: { $eq: matiere},etudiant: { $eq: etudiant},nom: {$regex: nameMatch}}
        }]);
    } 
    else if(req.query.estRendu === undefined && req.query.matiere === 'undefined' && req.query.etudiant !== 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {etudiant: { $eq: etudiant},nom: {$regex: nameMatch}}
        }]);
    } 
    else if(req.query.estRendu === undefined && req.query.matiere !== 'undefined' && req.query.etudiant === 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {matiere: { $eq: matiere},nom: {$regex: nameMatch}}
        }]);
    }
    else if (req.query.estRendu === undefined && req.query.matiere === 'undefined' && req.query.etudiant === 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {nom: {$regex: nameMatch}}
        }]);
    }
    else if (req.query.estRendu !== undefined && req.query.matiere === 'undefined' && req.query.etudiant !== 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {rendu: { $eq: valeur},etudiant: { $eq: etudiant},nom: {$regex: nameMatch}}
        }]);
    } 
    else if (req.query.estRendu !== undefined && req.query.matiere !== 'undefined' && req.query.etudiant === 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {rendu: { $eq: valeur},matiere: { $eq: matiere},nom: {$regex: nameMatch}}
        }]);
    }
    else if (req.query.estRendu !== undefined && req.query.matiere === 'undefined' && req.query.etudiant === 'undefined') {
        aggregateQuery = Assignment.aggregate([{
            $match: {rendu: { $eq: valeur},nom: {$regex: nameMatch}}
        }]);
    }
    else if (req.query.estRendu !== undefined && req.query.matiere !== undefined && req.query.etudiant !== undefined) {
        aggregateQuery = Assignment.aggregate([{
            $match: {rendu: { $eq: valeur},matiere: { $eq: matiere},etudiant: { $eq: etudiant},nom: {$regex: nameMatch}}
        }]);
    }
    Assignment.aggregatePaginate(aggregateQuery, {
        page: parseInt(req.query.page) || 1,
     limit: parseInt(req.query.limit) || 10,
    },
        (err, assignments) => {
            console.log(assignments)
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}

// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({
        id: assignmentId
    }, (err, assignment) => {
        if (err) {
            res.send(err)
        }
        res.json(assignment);
    })

}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {
    let assignment = new Assignment();
    assignment.id = req.body.id;
    assignment.nom = req.body.nom;
    assignment.dateDeRendu = req.body.dateDeRendu;
    assignment.rendu = req.body.rendu;
    assignment.note = req.body.note;
    assignment.remarque = req.body.remarque;
    assignment.matiere = req.body.matiere;
    assignment.etudiant = req.body.etudiant;

    assignment.save((err) => {
        if (err) {
            res.send('cant post assignment ', err);
        }
        res.json({
            message: `${assignment.nom} saved!`
        })
    })
}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    Assignment.findByIdAndUpdate(req.body._id, req.body, {
        new: true
    }, (err, assignment) => {
        if (err) {
            console.log(err);
            res.send(err)
        } else {
            res.json({
                message: 'updated'
            })
        }
    });

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {
    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({
            message: `${assignment.nom} deleted`
        });
    })
}



module.exports = {
    getAssignments,
    postAssignment,
    getAssignment,
    updateAssignment,
    deleteAssignment
};