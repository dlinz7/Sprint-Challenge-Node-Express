
const express = require('express');
const cors = require('cors');
const actions = require('./data/helpers/actionModel.js');
const projects = require('./data/helpers/projectModel.js');

const port = 5555;
const server = express();
server.use(express.json());
server.use(cors({origin: 'http:localhost:3000'}));


server.get('/', (req,res) => {
    res.send("hello from express");
})


// get the actions *works*

server.get('/api/actions', (req, res) => {
    actions
    .get()
    .then(actions => {
            res.json({actions});
    })
    .catch(error => {
        res.json({ message: "Info not found"})
    })
});

server.post('/api/actions', (req, res) => {
    const { description, notes} = req.body;
    if(!description || !notes ) {
        res.status(400);
        res.json({ message: "Please provide description, notes "});
        
    }

    actions 

        .insert({ description, notes})
        .then(response => {
            res.status(201);
            res.json({ response });
    })
        .catch(error => {
            console.log(error);
            res.status(500);
            res.json({message: "There is an error"});
            return;
    });


});

// get projects *works* 
server.get('/api/projects', (req, res) => {
    projects
    .get()
    .then(projects => {
            res.json({projects});
    })
    .catch(error => {
        res.json({ message: "Info not found"})
    })
});




server.listen(port, () => console.log(`Server running on port ${port}`));