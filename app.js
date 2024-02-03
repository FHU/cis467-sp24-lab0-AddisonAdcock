const facts = require('./facts.json')

const express = require('express')
const app = express()

const PORT = process.env.PORT || "3000"

app.set('view engine', 'ejs')

app.listen(PORT, ()=> {
    console.log( `App is running on http://localhost:${PORT}...`)
})

app.get("/", (req, res) => {

    res.send("Good Job!")

})

// http://localhost:3000/greet?name=kaylee&dob=2002
app.get('/greet', (req, res)=> {
    console.log(req.query)

    res.send(`hey, ${req.query.name} \n You are  ${2024 - req.query.dob} or ${2023 - req.query.dob} years old`)
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
    res.send(`${result}`)
})

app.get('/pandorasbox', (req, res)=> {

    // do the work

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

    //const message = "DAD JOKE"
    // const length = facts.length;
    // const random =  Math.floor( Math.random() * length)
    // const fact4 = facts[random].fact

    // res.render('pandorasbox', {title: "Pandora's Box", message:fact4} )

})