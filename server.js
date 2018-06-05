
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
    const { project_id, description} = req.body;
    if(!description || !project_id ) {
        res.status(400);
        res.json({ message: "Please provide description, project_id "});
        return; 
    }

    actions 

        .insert({ project_id, description })
        .then(response => {
            console.log(response);
            res.status(201);
            res.json(response);
    })
        .catch(error => {
            console.log(error);
            res.status(500);
            res.json({message: "There is an error"});
            
    });


});



// GET projects *works* 
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

//Project POST

server.post('/api/projects', (req, res) => {
    const { name, description} = req.body;
    if(!description || !name ) {
        res.status(400);
        res.json({ message: "Please provide description, project_id "});
        return; 
    }
    projects
    .insert({name, description})
    .then(projects => {
        console.log(projects);
        res.json(projects);
        
    })
    .catch(err => {
        console.log(err);
        res.status(500);
        res.json({error: "error"});
    })
})

//Project DELETE

server.delete('/api/projects/:id', (req, res) => {
    const {id} = req.params;
    projects.remove(id)
        .then(response => {
            if (response === 0) {
                console.log(response);
                res.status(404);
                res.json({success: "id doesn't exist"});
                return;
        }
        res.json({success: 'Item deleted'});
        })
        .catch(error => {
            console.log(error);
            res.status(400);
            res.json({error: 'Error'});
        }
        )
})



server.listen(port, () => console.log(`Server running on port ${port}`));