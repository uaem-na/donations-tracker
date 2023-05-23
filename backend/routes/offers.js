const express = require("express");
const router = express.Router();
const { Offer } = require("../models/offer");

function parseBodyProfiles(req) {
  let errorMsg = "";
  const ppeProfiles = req.body.ppeProfiles;

  if (ppeProfiles === undefined || ppeProfiles.length == 0) {
    errorMsg += "There should be at least one PPE.\n";
  }
  ppeProfiles.forEach((ppe, ind) => {
    if (ppe.category === undefined || ppe.category === "") {
      errorMsg += "PPE " + ind + ": category cannot be empty.\n";
    }
    if (ppe.description === undefined || ppe.description === "") {
      errorMsg += "PPE " + ind + ": description cannot be empty.\n";
    }
    if (ppe.quantity === undefined || ppe.quantity === "") {
      errorMsg += "PPE " + ind + ": quantity cannot be empty.\n";
    }
  });
  return errorMsg;
}

function postOffer(req, res) {
  var errorMsg = "";

  const userId = req.body.userId;
  if (userId === undefined || userId === "") {
    errorMsg += "User ID cannot be empty.\n";
  }

  const postalCode = req.body.postalCode;
  if (postalCode === undefined || postalCode === "") {
    errorMsg += "Postal code cannot be empty.\n";
  }

  errorMsg += parseBodyProfiles(req);

  if (errorMsg !== "") {
    res.status(400).send("Error posting offer.\n" + errorMsg);
    return;
  }

  const ppeProfiles = req.body.ppeProfiles;

  const newOffer = new Offer({
    userId: userId,
    ppeProfiles: ppeProfiles,
    reportIds: [],
    postalCode: postalCode,
  });
  newOffer
    .save()
    .then((offer) => res.send(offer))
    .catch((err) => res.status(500).send("Error posting offer.\n" + err));
}

router.post("/", postOffer);

router.get("/", (req, res) => {
  Offer.find()
    .then((offers) => res.send(offers))
    .catch((err) => res.status(500).send("Error getting offers.\n" + err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id === undefined || id === "") {
    res.status(400).send("Error getting offer.\nID cannot be empty.");
    return;
  }
  Offer.findOne({ _id: id })
    .then((offer) => {
      if (offer === null) {
        res
          .status(400)
          .send("Error getting offer " + id + ".\nOffer " + id + " not found.");
      } else {
        res.send(offer);
      }
    })
    .catch((err) =>
      res.status(500).send("Error getting offer " + id + ".\n" + err)
    );
});

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  if (userId === undefined || userId === "") {
    res
      .status(400)
      .send("Error getting offers by user.\nUser ID cannot be empty.");
    return;
  }
  Offer.find({ userId: req.params.userId })
    .then((offers) => res.send(offers))
    .catch((err) =>
      res
        .status(500)
        .send("Error getting offers by user " + userId + ".\n" + err)
    );
});

function updatePpes(req, res) {
  var errorMsg = "";
  const id = req.params.id;
  if (id === undefined || id === "") {
    errorMsg += "Offer ID cannot be empty.";
  }

  errorMsg += parseBodyProfiles(req);

  if (errorMsg !== "") {
    res
      .status(400)
      .send("Error updating PPEs in offer" + id + ".\n" + errorMsg);
    return;
  }

  Offer.updateOne({ _id: id }, { ppeProfiles: ppeProfiles })
    .then((ret) => {
      if (ret.n == 0) {
        res
          .status(400)
          .send(
            "Error updating PPEs in offer " +
              id +
              ".\nOffer " +
              id +
              " not found."
          );
      } else if (ret.nModified == 0) {
        res.status(500).send("Error updating PPEs in offer " + id + ".");
      }
      res.send(ret);
    })
    .catch((err) =>
      res.status(500).send("Error updating PPEs in offer " + id + ".\n" + err)
    );
}

router.put("/ppes/:id", updatePpes);

router.put("/report/:id", (req, res) => {
  var errorMsg = "";
  const id = req.params.id;
  if (id === undefined || id === "") {
    errorMsg += "Offer ID cannot be empty.\n";
  }
  const reportId = req.query.reportId;
  if (reportId === undefined || reportId === "") {
    errorMsg += "Report ID cannot be empty.\n";
  }
  if (errorMsg !== "") {
    res
      .status(400)
      .send("Error updating reports for offer " + id + ".\n" + errorMsg);
    return;
  }

  Offer.findOne({ _id: id })
    .then((offer) => {
      if (offer === null) {
        res
          .status(400)
          .send(
            "Error updating reports for offer " +
              id +
              ".\nOffer " +
              id +
              " not found."
          );
      } else {
        if (offer.reportIds == undefined) {
          offer.reportIds = [req.query.reportId];
        } else {
          offer.reportIds.push(req.query.reportId);
        }
        Offer.updateOne({ _id: req.params.id }, { reportIds: offer.reportIds })
          .then((ret) => {
            if (ret.n == 0) {
              res
                .status(400)
                .send(
                  "Error updating reports for offer " +
                    id +
                    ".\nOffer " +
                    id +
                    " not found."
                );
            } else if (ret.nModified == 0) {
              res
                .status(500)
                .send("Error updating reports for offer " + id + ".");
            }
            res.send(ret);
          })
          .catch((err) =>
            res
              .status(500)
              .send("Error updating reports for offer " + id + ".\n" + err)
          );
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send("Error updating reports for offer " + id + ".\n" + err)
    );
});

router.put("/postalCode/:id", (req, res) => {
  let errorMsg = "";
  const id = req.params.id;
  if (id == undefined || id == "") {
    errorMsg += "Error modifying postal code.\nOffer ID must be defined.\n";
  }

  const postalCode = req.query.postalCode;
  if (postalCode == undefined || postalCode == "") {
    errorMsg +=
      "Error modifying postal code.\nNew postal code must be specified.\n";
  }

  if (errorMsg != "") {
    res.status(400).send(errorMsg);
    return;
  }

  Offer.findByIdAndUpdate(id, { postalCode: postalCode }, (err, ret) => {
    if (ret == null) {
      errorMsg += `Error modifying postal code.\nOffer ${id} not found.\n`;
      res.status(400).send(errorMsg);
    } else if (err) {
      errorMsg += `Error modifying postal code for offer ${id}.\n`;
      res.status(500).send(errorMsg);
    } else {
      Offer.findById(id, (err, result) => {
        if (err) {
          errorMsg += `Error returning modifying postal code for offer ${id}.\n`;
          res.status(500).send(errorMsg);
        } else {
          res.send(result);
        }
      });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id === undefined || id === "") {
    res.status(400).send("Error deleting offer.\nOffer ID cannot be empty.");
    return;
  }
  Offer.deleteOne({ _id: id }, (err, ret) => {
    if (err) {
      res.status(500).send("Error deleting offer " + id + ".\n" + err);
    } else {
      if (ret.n == 0) {
        res
          .status(400)
          .send(
            "Error deleting offer " + id + ".\nOffer " + id + " not found."
          );
      } else if (ret.deletedCount == 0) {
        res.status(500).send("Error deleting offer " + id + ".");
      } else {
        res.send(ret);
      }
    }
  });
});

module.exports = router;
