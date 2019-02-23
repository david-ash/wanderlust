//Importing database
const db = require('../database/db');


const register = (req, res) => {
    const {name, email, password, age} = req.body;
    //Creating the new user
    const newUser = {
        id: db.length + 1,
        name: name,
        age: age,
        email: email,
        password: password
    };
    //Checking the length before pushing the new user
    const old = db.length;
    //Pushing the new user in the dummy database
    db.push(newUser);
    //Checking if the user have registered or not
    if (db.length - old === 1) {
        res.status(200).json(`${newUser.id} ${newUser.name} -: Successfully Registerd`);   
    } else {
        res.status(404).json('Not Registerd');
    }
}

module.exports = register;