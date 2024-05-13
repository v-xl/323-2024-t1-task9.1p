//We require the 'express' library, which is the webserver
const express = require("express");
const res = require("express/lib/response");
const app = express();

var MongoClient = require('mongodb').MongoClient;
var dbuser = process.env.DB_USER.trim();
var dbpass = process.env.DB_PASS.trim();
var dbhost = process.env.DB_HOST.trim();
var dbport = process.env.DB_PORT.trim();
var url = "mongodb://"+dbuser+":"+dbpass+"@"+dbhost+":"+dbport;

//Functions
const isValidNumber = (num) => {
    var isValid = false;

    //Check if data is a type of number
    if(!isNaN(num)){
        isValid = true;
    }

    return isValid;
};

const saveHistory = (result) => {
    return new Promise((resolve, reject) => {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        client.connect()
            .then(() => {
                const db = client.db("mydb");
                const myobj = { result: result, timestamp: Date.now() };
                return db.collection("history").insertOne(myobj);
            })
            .catch((err) => {
                console.error(err);
                reject(err);
            })
            .finally(() => {
                client.close();
            });
    });
};

//Addition
const add = (n1, n2) => {
    return n1+n2;
}
app.get("/add", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = add(n1, n2); //Call the add function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
    
});

//Subtraction
const subtract = (n1, n2) => {
    return n1-n2;
}
app.get("/subtract", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }    
    const result = subtract(n1, n2); //Call the subtract function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});

//Multiplication
const multiply = (n1, n2) => {
    return n1*n2;
}
app.get("/multiply", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = multiply(n1, n2); //Call the multiply function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});

//Division
const divide = (n1, n2) => {
    return n1/n2;
}
app.get("/divide", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = divide(n1, n2); //Call the divide function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});

//Exponent
const exponent = (n1, n2) => {
    return n1**n2;
}
app.get("/exponent", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = exponent(n1, n2); //Call the exponent function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});

//squareRoot
const squareRoot = (n1) => {
    return Math.sqrt(n1);
}
app.get("/squareRoot", (req, res) => {
    const n1 = parseInt(req.query.n1);
    //check whether provided value for n1 is an actual number, otherwise return 400 error
    if (!isValidNumber(n1)) {
        res.status(400).json({ error: "The input provided for n1 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = squareRoot(n1); //Call the squareRoot function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});

//Modulo
const modulo = (n1, n2) => {
    return n1%n2;
}
app.get("/modulo", (req, res) => {
    const n1 = parseInt(req.query.n1);
    const n2 = parseInt(req.query.n2);
    //check whether provided values for n1 and n2 are actual numbers, otherwise return 400 error
    if (!isValidNumber(n1) || !isValidNumber(n2)) {
        res.status(400).json({ error: "The input provided for either n1 or n2 was invalid. Please provide only valid numbers." });
        return;
    }        
    const result = modulo(n1, n2); //Call the modulo function and store the result in a variable
    saveHistory(result); //Save result to our database
    res.json({statuscode:200, data: result});
});


//Serving data at root of the website
app.get('/', function (req, res){
    res.send('hello world');
});

//Start listening on the specified port.
const port = 3000;
app.listen(port, () => {
    console.log("Listening on port: " + port);
});
