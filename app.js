const express = require('express');

const myConnection = require('express-myconnection');
const res = require('express/lib/response');
const mysql = require('mysql');// 

const app = express();

// const dbConfig = [
//     {
//         host: "localhost",
//         user: "erick",
//         password: "erick",
//         port:3306,
//         database: "nodejs_note_db"
//     }
// ];

const connection = mysql.createConnection({
    host: "localhost",
    user: "erick",
    password: "erick",
    port:3306,
    database: "nodejs_note_db"
});
  

//Definition de la base de données
    // app.use(myConnection(mysql, dbConfig, 'pool'));
//Définir le moteur de template EJS
//set the view engine to ejs
app.set('view engine', 'ejs');
// Definir le dossier dans lequel se trouve les vues.
app.set('views', 'ihm')
//Chargement des fichiers, l'extension doit des fichiers être .ejs
app.get('/', (req, res)=>{
    connection.query("SELECT * FROM notes", [], (error, result) => {
        if (error) {
            console.log(error);
        } else {
            res.status(200).render('index', { result })
        }
    })
});

// app.get('/', (req, res) => {
//     connection.connect((error) => {
//         if (error) {
//             console.log(error);
//         } else {
//             connection.query("SELECT * FROM notes", [], (error, result) => {
//                 if (error) {
//                     console.log(error);
//                 } else {
//                     res.status(200).render('index', { result })
//                 }
//             })
//             connection.end();
//         }
//     });

// });

const students = [
    {
        nom: "Erick",
        postNom: "Banze",
        age: 25,
    },
    {
        nom: "Ketsia",
        postNom: "Ntumba",
        age: 17,
    },
    {
        nom: "Nestor",
        postNom: "Banze",
        age: 19,
    },
    {
        nom: "Sen",
        postNom: "Set",
        age: 17,
    },

];
app.get('/about', (req, res) => {
    res.status(200).render('about', { students });// Passer les données dans les vues
})

app.use((req, res) => {
    res.status(404).render('404')
})


app.listen(3003)
console.log('attente des requete au port 3001');