const express = require('express')
const path = require('path')

const app = express();
// const team = require('./routes/team');

const PORT = process.env.PORT || 5000

// Recognize Request Object as JSON & Array/String
app.use(express.json())
app.use(express.urlencoded({extended: false}))
// app.use('/team', team)
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, error => {
    if(error) {
        console.log(error)
        throw error
    }
    console.log(`Server is listening on port:${PORT}`)
})