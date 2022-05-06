const express = require('express');

const notesRoutes =  require('./routes/notesRoutes');


const app = express();

//Extration de données du formulaire
app.use(express.urlencoded({ extended: false })); //Middleware urlencode

//set the view engine to ejs
app.set('view engine', 'ejs');
// Definir le dossier dans lequel se trouve les vues.
app.set('views', 'ihm');

//Definition de routes pour les note
app.use(notesRoutes);

//Autres pages
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