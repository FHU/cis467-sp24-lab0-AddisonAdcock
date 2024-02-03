const facts = require('./facts.json')

const express = require('express')
const fs = require('fs');
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {
    res.render('pandorasbox', {title: "Home", message:"Good Job!"} )
})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)
    res.render('pandorasbox', {title: "Greet", message: `hey, ${req.query.name} \n You are  ${2023 - req.query.dob} or ${2024 - req.query.dob} years old`} )
})

app.get('/math/:num1/:op/:num2', (req, res)=> {
    console.log( req.params )
    const num1 = parseInt(req.params.num1)
    const num2 = parseInt(req.params.num2)
    const op = req.params.op
    let result = 0
    if (op == "times"){
        result = num1 * num2
    }
    if (op == "minus"){
        result = num1 - num2
    }
    if (op == "plus"){
        result = num1 + num2
    }
    if (op == "dividedby"){
        result = num1 / num2
    }
    if (op == "tothepowerof"){
        result = num1 ** num2
    }
    res.render('math', {title: "Math", message:result} )
    })

app.get('/pandorasbox', (req, res)=> {

    const random =  Math.floor( Math.random() * 2)

    if(random == 0 ){
    
    fetch("https://icanhazdadjoke.com/", { 
        headers: {
            "Accept": "application/json"
        }
        })
        .then( res => res.json() )
        .then( (data) => {
            console.log(data)
            res.render('pandorasbox', {title: "Pandora's Box", message: data.joke} )
        })
    }

    else {
        fs.readFile('facts.json', 'utf8', (err, data) => {
            data = JSON.parse(data);
            const length = data.length;
            const random = Math.floor(Math.random() * length);
            res.render('pandorasbox', {title: "Pandora's Box", message: data[random].fact});
        });
    }
})