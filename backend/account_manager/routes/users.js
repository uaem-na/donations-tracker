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
    if (userOrg != 'yes' && userOrg != 'no') {
        errorMsg += 'A user either represents an organization or does not: userOrg must be yes or no.\n';
    }

    const postalCode = req.query.postalCode;
    if (postalCode == undefined || postalCode == "") {
        errorMsg += 'Postal code cannot be empty.\n';
    }

    const orgName = req.query.orgName;

    if (errorMsg != "") {
        res.status(400).send(`Error posting user.\n${errorMsg}`);
        return;
    }

    const newUser = new Users ({

        'firstName': firstName,
        'lastName': lastName,
        'email': email,
        'password': password,
        'userOrg': userOrg,
        'postCode': postalCode,
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
            result.status(400).send(`Error deleting user ${id}.\nUser does not exist.`);
        }
        else if (result.deletedCount == 0) {
            result.status(500).send(`Error deleting user ${id}.\n`);
        }
        else {
            res.send(result);
        }
    });
});
/*
router.put('/:id', (req, res) => {
    
    const id = req.params.id;


});
*/
// router.get('/:id')

module.exports = router;