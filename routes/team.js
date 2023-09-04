const express = require('express')
const router = express.Router();
const { team } = require('../schema');

// Getting Pokemon Team Data
router.get('/', (req, res) => {
    console.log('Here')
    team.find({}, (error, doc) => {
        if(error) {
            console.log(error);
            res.status(500).send({msg: 'Error getting Team Data from Database'})
        } else {
            console.log('GET Successful');
            res.status(200).send(doc.map(element => {
                return {
                    id: element._id,
                    name: element.name,
                    modified: element.modified,
                    user: element.user,
                    pokemon: element.pokemon
                }
            }));
        }
    })
});


// Post Pokemon Team Data
router.post('/', (req, res) => {
    const data = req.body;
    console.log('Data', data)
    team.create({user: 'Thuta', name: data.name, pokemon: data.pokemon ? data.pokemon : [], modified: new Date().toLocaleString()}, (error, doc) => {
        if(error) {
            console.log(error);
            res.status(500).send({msg: 'Error adding Team Data to Database'})
        } else {
            console.log('POST Successful');
            console.log(doc);
            res.status(200).send({
                id: doc._id,
                name: doc.name,
                modified: doc.modified,
                user: doc.user,
                pokemon: doc.pokemon
            })
        }
    })
})


// Put Customer Data 
router.put('/', (req, res) => {
    console.log(req.body)
    team.findByIdAndUpdate(req.body.id, { ...req.body.data, modified: new Date().toLocaleString()}, {new: true}, (error, doc) => {
        if(error) {
            console.log(error);
            res.status(500).send({msg: 'Error updating Team Data to Database'})
        } else {
            console.log('PUT Successful');
            console.log(doc);
            res.status(200).send({
                id: doc._id,
                name: doc.name,
                modified: doc.modified,
                user: doc.user,
                pokemon: doc.pokemon
            })
        }
    })
})

// Delete Customer Data
router.delete('/', (req, res) => {
    console.log(req.body);
    team.findByIdAndDelete(req.body.id, (error, doc) => {
        if(error) {
            console.log(error);
            res.status(500).send({msg: 'Error deleting Team Data from Database'})
        } else {
            console.log('DELETE Successful');
            console.log(doc);
            res.status(200).send({
                id: doc._id,
                name: doc.name,
                modified: doc.modified,
                user: doc.user,
                pokemon: doc.pokemon
            })
        }
    })
})

module.exports = router;