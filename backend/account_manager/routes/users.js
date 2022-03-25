const e = require('express');
const express = require('express');
const router = express.Router();
let { Users } = require('../models/users');

function postUser(req, res) {
    let errorMsg = "";

    const firstName = req.query.firstName;
    if (firstName == undefined || firstName == "") {
        errorMsg += 'First name cannot be empty.\n';
    }

    const lastName = req.query.lastName;
    if (lastName == undefined || lastName == "") {
        errorMsg += 'Last name cannot be empty.\n';
    }

    const email = req.query.email;
    if (email == undefined || email == "") {
        errorMsg += 'Email cannot be empty.\n';
    }

    const password = req.query.password;
    if (password == undefined || password == "") {
        errorMsg += 'Password cannot be empty.\n';
    }

    const userOrg = req.query.userOrg;
    if (userOrg == undefined || userOrg == "") {
        errorMsg += "User organization status cannot be empty.\n";
    }
    else if (userOrg.toLowerCase() != 'yes' && userOrg.toLowerCase() != 'no') {
        errorMsg += 'A user either represents an organization or does not: userOrg must be yes or no.\n';
    }

    const orgName = req.query.orgName;
    if (userOrg.toLowerCase() == 'no' && orgName != undefined && orgName != "") {
        errorMsg += "Error posting user.\nUser does not represent an organization.\n";
    }
    else if (userOrg.toLowerCase() == 'yes' && (orgName == undefined || orgName == "")) {
        errorMsg += "Error posting user.\nPlease specify an organization.\n"
    }

    if (errorMsg != "") {
        res.status(400).send(errorMsg);
        return;
    }

    const newUser = new Users ({

        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'userOrg': userOrg.toLowerCase(),
        'orgName': orgName

    });
    newUser.save()
        .then(user => res.send(user))
        .catch(err => res.status(500).send(`Error posting user.\n${err}`));

}

router.post('/', postUser);

router.get('/', (req, res) => {
    Users.find()
    .then(users => res.send(users))
    .catch(err => res.status(500).send(`Error getting users.\n${err}`));
});

router.delete('/:id', (req, res)=> {

    const id = req.params.id;

    if(id == undefined || id == '') {
        res.status(400).send(`Error deleting user. User ID must be specified.\n`);
        return;
    }
    Users.deleteOne({"_id": id}, (err, result) => {
        if(err) {
            result.status(500).send(`Error deleting user ${id}.\n${err}`);
        }
        else if (result.n == 0) {
            result.status(400).send(`Error deleting user ${id}.\nUser does not exist.\n`);
        }
        else if (result.deletedCount == 0) {
            result.status(500).send(`Error deleting user ${id}.\n`);
        }
        else {
            res.send(result);
        }
    });
});

router.put('/name/:id', (req, res) => {
    let errorMsg = "";
    const id = req.params.id;

    if (id == undefined || id == "") {
        errorMsg += "Error updating name.\nUser ID must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;

    Users.findById(id, (err, result) => {
        if (id == null) {
            errorMsg += `Error updating name.\nUser ${id} not found.\n`;
            res.status(400).send(errorMsg);
        }
        else if (err) {
            errorMsg += `Error updating name for user ${id}.\n`;
            res.status(500).send(errorMsg);
        }
        else if ((firstName == undefined || firstName == "") && (lastName == undefined || lastName == "")) {
            errorMsg += `Error updating name for user ${id}.\nAt least one of firstName or lastName must be specified.\n`;
            res.status(400).send(errorMsg);
        }
        else if (firstName == undefined || firstName == "") {
            result.lastName = lastName;
            res.send(result);
        }
        else if (lastName == undefined || lastName == "") {
            result.firstName = firstName;
            res.send(result);
        }
        else {
            console.log("this endpoint fired");
            result.firstName = firstName;
            result.lastName = lastName;
            res.send(result);
        }

    });
    
});

router.put('/email/:id', (req, res) => {

    let errorMsg = "";
    const id = req.params.id;
    const email = req.query.email;

    if (id == undefined || id == "") {
        errorMsg += "Error updating email.\nUser ID must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }
    else if (email == undefined || email == "") {
        errorMsg += "Error updating email.\nNew email must be provided.\n";
        res.status(400).send(errorMsg);
        return;
    }

    Users.findByIdAndUpdate(id, { email: email }, (err, result) => {
        if (result == null) {
            errorMsg += `Error updating email.\nUser ${id} not found.\n`
            res.status(400).send(errorMsg);
        }
        else if (err) {
            errorMsg += `Error updating email for user ${id}.`;
            res.status(500).send(errorMsg);
        }
        else {
            Users.findById(id, (error, ret) => {
                if (error) {
                    errorMsg += `Error sending back user ${id}.`;
                    res.status(500).send(errorMsg);
                }
                else {
                    res.send(ret);
                }
            });
        }
    });

    
});

router.put('/password/:id', (req, res) => {

    let errorMsg = "";
    const id = req.params.id;
    const password = req.query.password;

    if (id == undefined || id == "") {
        errorMsg += "Error updating password.\nUser ID must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }
    else if (password == undefined || password == "") {
        errorMsg += "Error updating password.\nNew password must be provided.\n";
        res.status(400).send(errorMsg);
        return;
    }

    Users.findByIdAndUpdate(id, { password: password }, (err, result) => {
        if (result == null) {
            errorMsg += `Error updating password.\nUser ${id} not found.\n`
            res.status(400).send(errorMsg);
        }
        else if (err) {
            errorMsg += `Error updating password for user ${id}.`;
            res.status(500).send(errorMsg);
        }
        else {
            Users.findById(id, (error, ret) => {
                if (error) {
                    errorMsg += `Error sending back user ${id}.`;
                    res.status(500).send(errorMsg);
                }
                else {
                    res.send(ret);
                }
            });
        }
    });

    
});

router.put('/userOrg/:id', (req, res) => {

    let errorMsg = "";
    const id = req.params.id;
    const userOrg = req.query.userOrg;

    if (id == undefined || id == "") {
        errorMsg += "Error updating user organization.\nUser ID must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }
    
    if (userOrg == undefined || userOrg == "") {
        errorMsg += "Error updating user organization.\nNew user organization status must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }
    else if (userOrg.toLowerCase() != 'yes' && userOrg.toLowerCase() != 'no') {
        errorMsg += 'Error updating user organization.\nA user either represents an organization or does not: userOrg must be yes or no.\n';
        res.status(400).send(errorMsg);
        return;
    }

    Users.findByIdAndUpdate(id, { userOrg: userOrg.toLowerCase() }, (err, result) => {
        if (result == null) {
            errorMsg += `Error updating user organization.\nUser ${id} not found.\n`
            res.status(400).send(errorMsg);
        }
        else if (err) {
            errorMsg += `Error updating user organization for user ${id}.`;
            res.status(500).send(errorMsg);
        }
        else {
            Users.findById(id, (error, ret) => {
                if (error) {
                    errorMsg += `Error sending back user ${id}.`;
                    res.status(500).send(errorMsg);
                }
                else {
                    res.send(ret);
                }
            });
        }
    });

    
});

router.get('/:id', (req, res) => {

    let errorMsg = "";
    const id = req.params.id;

    if (id == undefined || id == "") {
        errorMsg += "Error fetching user.\nUser ID must be defined.\n";
        res.status(400).send(errorMsg);
        return;
    }


    Users.findById(id, (err, result) => {
        if (result == null) {
            errorMsg += "Error fetching user.\nUser not found.\n";
            res.status(400).send(errorMsg);
        }
        else if (err) {
            errorMsg += "Error fetching user.\n";
            res.status(500).send(errorMsg);
        }
        else {
            res.send(result);
        }
    });

});

module.exports = router;