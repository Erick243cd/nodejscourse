const express = require('express');
const router = express.Router();

const mysql = require('mysql');// 

const connection = mysql.createConnection({
    host: "localhost",
    user: "erick",
    password: "erick",
    port: 3306,
    database: "nodejs_note_db"
});

connection.connect((err)=>  {
    if(err){
        res.status(500).render('501', { error })
    }
});

//Afficher les données de la table
router.get('/', (req, res) => {
    connection.query("SELECT * FROM notes", [], (error, result) => {
        if (error) {
            res.status(500).render('501', { error })
        } else {
            res.status(200).render('index', { result })
        }
    })
});


//Insertion de données ET Modifications du formulaire dans la DB

router.post("/notes", (req, res) => {
    let id = req.body.id === "" ? null : req.body.id;
    let titre = req.body.title
    let description = req.body.description

    let sqlQuery = id === null
        ? "INSERT INTO notes(title, description) VALUES (?,?)"
        : "UPDATE notes SET title = ?, description = ? WHERE id = ?";
    let donnees = id === null ? [titre, description] : [titre, description, id];

    connection.query(sqlQuery, donnees, (error, result) => {
        if (error) {
            res.status(500).render('501', { error })
        } else {
            res.status(300).redirect('/');
        }
    })
});


//Suppression de données

router.delete("/notes/:id", (req, res)=>{
    let id = req.params.id
    console.log(id);
    connection.query("DELETE FROM notes WHERE id = ?", [id], (error, result)=>{
        if(error){
            res.status(500).render('501', { error })
        }else{
            res.status(200).json({routeRacine : '/'});
        }
    })
});

//Pour rendre accessible l'object router dans les autres fichiers on fait
module.exports = router;