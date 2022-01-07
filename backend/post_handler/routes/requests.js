const express = require('express');
const router = express.Router();
var { Requests } = require('../models/requests');


function postRequest(req, res) {
    var errorMsg = "";

    const userId = req.query.userId;
    if (userId === undefined || userId === "") {
        errorMsg += 'User ID cannot be empty.\n';
    }

    const ppeProfiles = req.query.ppeProfiles;
    if (ppeProfiles === undefined || ppeProfiles.length == 0) {
        errorMsg += 'There should be at least one PPE.\n';
    }
    ppeProfiles.forEach((ppe, ind) => {
        if (ppe.category === undefined || ppe.category === "") {
            errorMsg += 'PPE ' + ind + ': category cannot be empty.\n';
        }
        if (ppe.description === undefined || ppe.description === "") {
            errorMsg += 'PPE ' + ind + ': description cannot be empty.\n';
        }
        if (ppe.quantity === undefined || ppe.quantity === "") {
            errorMsg += 'PPE ' + ind + ': quantity cannot be empty.\n';
        }
    });

    if (errorMsg !== "") {
        res.status(400).send('Error posting request.\n' + errorMsg);
        return;
    }

    const newRequest = new Requests({
        "userId": userId,
        "ppeProfiles": ppeProfiles,
        "status": "Posted",
        "reportIds": []
    });
    newRequest.save()
        .then(newRequest => res.send(newRequest))
        .catch(err => res.status(500).send('Error posting request.\n' + err));
}

router.post('/', postRequest);

// For testing purposes only
router.post('/test/post', (req, res) => postRequest(
    { query: {
        "userId": req.query.userId,
        "ppeProfiles": [
            {"category": "Masks", "description": "N95", "quantity": "100"}, 
            {"category": "Gowns", "description": "Medical", "quantity": "50"}]
    }},
    res
));

router.get('/', (req, res) => {
    Requests.find()
        .then(requests => res.send(requests))
        .catch(err => res.status(500).send('Error getting requests.\n' + err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "") {
        res.status(400).send('Error getting request.\nID cannot be empty.');
        return;
    }
    Requests.findOne({"_id": id})
        .then(request => {
            if (request === null) {
                res.status(400).send('Error getting request ' + id + '.\nRequest ' + id + ' not found.');
            } else {
                res.send(request);
            }
        })
        .catch(err => res.status(500).send('Error getting request ' + id + '.\n' + err));
});

router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    if (userId === undefined || userId === "") {
        res.status(400).send('Error getting requests by user.\nUser ID cannot be empty.');
        return;
    }
    Requests.find({"userId": req.params.userId})
        .then(requests => res.send(requests))
        .catch(err => res.status(500).send('Error getting requests by user ' + userId + '.\n' + err));
});

function updatePpes (req, res) {
    var errorMsg = "";
    const id = req.params.id;
    if (id === undefined || id === "") {
        errorMsg += 'Request ID cannot be empty.';
    }
    const ppeProfiles = req.query.ppeProfiles;
    if (ppeProfiles === undefined || ppeProfiles.length == 0) {
        errorMsg += 'There should be at least one PPE.';
    }
    ppeProfiles.forEach((ppe, ind) => {
        if (ppe.category === undefined || ppe.category === "") {
            errorMsg += 'PPE ' + ind + ': category cannot be empty.\n';
        }
        if (ppe.description === undefined || ppe.description === "") {
            errorMsg += 'PPE ' + ind + ': description cannot be empty.\n';
        }
        if (ppe.quantity === undefined || ppe.quantity === "") {
            errorMsg += 'PPE ' + ind + ': quantity cannot be empty.\n';
        }
    });

    if (errorMsg !== "") {
        res.status(400).send('Error updating PPEs in request' + id + '.\n' + errorMsg);
        return;
    }

    Requests.updateOne({"_id": id}, {"ppeProfiles": ppeProfiles})
        .then(ret => {
            if (ret.n == 0) {
                res.status(400).send('Error updating PPEs in request ' + id + '.\nRequest ' + id + ' not found.');
            } else if (ret.nModified == 0) {
                res.status(500).send('Error updating PPEs in request ' + id + '.');
            }
            res.send(ret)
        })
        .catch(err => res.status(500).send('Error updating PPEs in request ' + id + '.\n' + err));
}

router.put('/ppes/:id', updatePpes);

// For testing purposes only
router.put('/test/ppes/:id', (req, res) => { updatePpes(
    {
        params: {"id": req.params.id},
        query: { "ppeProfiles": [
            {"category": "Masks", "description": "KN95", "quantity": "500"}, 
            {"category": "Gowns", "description": "Medical", "quantity": "70"}
        ]}
    },
    res
)});

router.put('/status/:id', (req, res) => {
    var errorMsg = "";
    const id = req.params.id;
    if (id === undefined || id === "") {
        errorMsg += "Request ID cannot be empty.\n";
    }
    const status = req.query.status;
    if (status === undefined || status === "") {
        errorMsg += "Status cannot be empty.\n";
    }
    if (errorMsg !== "") {
        res.status(400).send("Error updating status for request " + id + '.\n' + errorMsg);
        return;
    }

    Requests.updateOne({"_id": id}, {"status": status})
        .then(ret => {
            if (ret.n == 0) {
                res.status(400).send('Error updating status of request ' + id + '.\nRequest ' + id + ' not found.');
            } else if (ret.nModified == 0) {
                res.status(500).send('Error updating status of request ' + id + '.');
            }
            res.send(ret)
        })
        .catch(err => res.status(500).send('Error updating status of request ' + id + '.\n' + err));
});

router.put('/report/:id', (req, res) => {
    var errorMsg = "";
    const id = req.params.id;
    if (id === undefined || id === "") {
        errorMsg += 'Request ID cannot be empty.\n';
    }
    const reportId = req.query.reportId;
    if (reportId === undefined || reportId === "") {
        errorMsg += 'Report ID cannot be empty.\n';
    }
    if (errorMsg !== "") {
        res.status(400).send('Error updating reports for request ' + id + '.\n' + errorMsg);
        return;
    }

    Requests.findOne({"_id": id})
        .then(request => {
            if (request === null) {
                res.status(400).send('Error updating reports for request ' + id + '.\nRequest ' + id + ' not found.');
            } else {
                if (request.reportIds == undefined) {
                    request.reportIds = [req.query.reportId]; 
                } else {
                    request.reportIds.push(req.query.reportId);
                }
                Requests.updateOne({"_id": req.params.id}, {"reportIds": request.reportIds})
                    .then(ret => {
                        if (ret.n == 0) {
                            res.status(400).send('Error updating reports for request ' + id + '.\nRequest ' + id + ' not found.');
                        } else if (ret.nModified == 0) {
                            res.status(500).send('Error updating reports for request ' + id + '.');
                        }
                        res.send(ret)
                    })
                    .catch(err => res.status(500).send('Error updating reports for request ' + id + '.\n' + err));
            }
        })
        .catch(err => res.status(500).send('Error updating reports for request ' + id + '.\n' + err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "") {
        res.status(400).send('Error deleting request.\nRequest ID cannot be empty.');
        return;
    }
    Requests.deleteOne({"_id": id}, (err, ret) => { 
        if (err) {
            res.status(500).send('Error deleting request ' + id + '.\n' + err);
        } else {
            if (ret.n == 0) {
                res.status(400).send('Error deleting request ' + id + '.\nRequest ' + id + ' not found.');
            } else if (ret.deletedCount == 0) {
                res.status(500).send('Error deleting request ' + id + '.');
            } else {
                res.send(ret);
            }
        }
    })
});

module.exports = router;
