require('dotenv').config();
const uri = process.env.DB_URL;
const mongoose = require('mongoose');

mongoose.connect(uri, {useNewURLParser: true, useUnifiedTopology: true})
.then(() => {
    console.log('Successfully Connected ...')
})
.catch(error => console.log('Connection Error', error))


// Schema Declaration
const PokemonSchema = new mongoose.Schema({
    name: String,
    moves: [String]
});

const TeamSchema = new mongoose.Schema({
    user: String,
    name: String,
    modified: String,
    pokemon: [PokemonSchema]
});

// Models
const Team = mongoose.model('Team', TeamSchema);


module.exports = {
    team: Team
}