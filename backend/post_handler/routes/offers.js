const express = require('express');
const router = express.Router();
var { Offers } = require('../models/offers');


function postOffer(req, res) {
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
        res.status(400).send('Error posting offer.\n' + errorMsg);
        return;
    }

    const newOffer = new Offers({
        "userId": userId,
        "ppeProfiles": ppeProfiles,
        "reportIds": []
    });
    newOffer.save()
        .then(newOffer => res.send(newOffer))
        .catch(err => res.status(500).send('Error posting offer.\n' + err));
}

router.post('/', postOffer);

// For testing purposes only
router.post('/test/post', (req, res) => postOffer(
    { query: {
        "userId": req.query.userId,
        "ppeProfiles": [
            {"category": "Masks", "description": "N95", "quantity": "100"}, 
            {"category": "Gowns", "description": "Medical", "quantity": "50"}]
    }}, 
    res
));


router.get('/', (req, res) => {
    Offers.find()
        .then(offers => res.send(offers))
        .catch(err => res.status(500).send('Error getting offers.\n' + err));
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "") {
        res.status(400).send('Error getting offer.\nID cannot be empty.');
        return;
    }
    Offers.findOne({"_id": id})
        .then(offer => {
            if (offer === null) {
                res.status(400).send('Error getting offer ' + id + '.\nOffer ' + id + ' not found.');
            } else {
                res.send(offer);
            }
        })
        .catch(err => res.status(500).send('Error getting offer ' + id + '.\n' + err));
});

router.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    if (userId === undefined || userId === "") {
        res.status(400).send('Error getting offers by user.\nUser ID cannot be empty.');
        return;
    }
    Offers.find({"userId": req.params.userId})
        .then(offers => res.send(offers))
        .catch(err => res.status(500).send('Error getting offers by user ' + userId + '.\n' + err));
});


function updatePpes (req, res) {
    var errorMsg = "";
    const id = req.params.id;
    if (id === undefined || id === "") {
        errorMsg += 'Offer ID cannot be empty.';
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
        res.status(400).send('Error updating PPEs in offer' + id + '.\n' + errorMsg);
        return;
    }

    Offers.updateOne({"_id": id}, {"ppeProfiles": ppeProfiles})
        .then(ret => {
            if (ret.n == 0) {
                res.status(400).send('Error updating PPEs in offer ' + id + '.\nOffer ' + id + ' not found.');
            } else if (ret.nModified == 0) {
                res.status(500).send('Error updating PPEs in offer ' + id + '.');
            }
            res.send(ret)
        })
        .catch(err => res.status(500).send('Error updating PPEs in offer ' + id + '.\n' + err));
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

router.put('/report/:id', (req, res) => {
    var errorMsg = "";
    const id = req.params.id;
    if (id === undefined || id === "") {
        errorMsg += 'Offer ID cannot be empty.\n';
    }
    const reportId = req.query.reportId;
    if (reportId === undefined || reportId === "") {
        errorMsg += 'Report ID cannot be empty.\n';
    }
    if (errorMsg !== "") {
        res.status(400).send('Error updating reports for offer ' + id + '.\n' + errorMsg);
        return;
    }

    Offers.findOne({"_id": id})
        .then(offer => {
            if (offer === null) {
                res.status(400).send('Error updating reports for offer ' + id + '.\nOffer ' + id + ' not found.');
            } else {
                if (offer.reportIds == undefined) {
                    offer.reportIds = [req.query.reportId]; 
                } else {
                    offer.reportIds.push(req.query.reportId);
                }
                Offers.updateOne({"_id": req.params.id}, {"reportIds": offer.reportIds})
                    .then(ret => {
                        if (ret.n == 0) {
                            res.status(400).send('Error updating reports for offer ' + id + '.\nOffer ' + id + ' not found.');
                        } else if (ret.nModified == 0) {
                            res.status(500).send('Error updating reports for offer ' + id + '.');
                        }
                        res.send(ret)
                    })
                    .catch(err => res.status(500).send('Error updating reports for offer ' + id + '.\n' + err));
            }
        })
        .catch(err => res.status(500).send('Error updating reports for offer ' + id + '.\n' + err));
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    if (id === undefined || id === "") {
        res.status(400).send('Error deleting offer.\nOffer ID cannot be empty.');
        return;
    }
    Offers.deleteOne({"_id": id}, (err, ret) => { 
        if (err) {
            res.status(500).send('Error deleting offer ' + id + '.\n' + err);
        } else {
            if (ret.n == 0) {
                res.status(400).send('Error deleting offer ' + id + '.\nOffer ' + id + ' not found.');
            } else if (ret.deletedCount == 0) {
                res.status(500).send('Error deleting offer ' + id + '.');
            } else {
                res.send(ret);
            }
        }
    })
});

module.exports = router;
