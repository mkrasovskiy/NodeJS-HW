const express = require('express');

const app = express();

app.use(express.json());

const users = {};

const fs = require("fs");

function readUsers() {
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
            console.log("Ошибка чтения файла: ", err);
        return;
        }
        try {
            users = JSON.parse(data); 
        } catch (e) {
            console.log("Некорректный формат данных в файле: ", e);
            users = {};
        }
    });
}

function saveUsers() {
    const data = JSON.stringify(users, null, 4);
    fs.writeFile("users.json", data, (err) => {
        if (err) throw err;
    });
}

app.post("/users", (req, res) => {
    const body = req.body;
    if (!body || typeof body !== 'object') {
        return res.status(400).send({ message: 'Invalid request body format' });
    }
    
    const { name, email, password } = body;
    
    if (users[name] || users[email]) {
        return res.status(409).send({ message: `User with ${name} or ${email} already exists `});
    }
    const hash = bcrypt.hashSync(password, 10);
    users[name] = {
        name,
        email,
        password: hash,
    };
    saveUsers();
    res.send({
        message: "User created successfully",
    });
});

app.listen(3000);