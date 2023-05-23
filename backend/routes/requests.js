const express = require("express");
const router = express.Router();
var { Request } = require("../models/request");

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

function postRequest(req, res) {
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
    res.status(400).send("Error posting request.\n" + errorMsg);
    return;
  }
  const ppeProfiles = req.body.ppeProfiles;

  const newRequest = new Request({
    userId: userId,
    ppeProfiles: ppeProfiles,
    status: "Posted",
    postalCode: postalCode,
    reportIds: [],
  });
  newRequest
    .save()
    .then((newRequest) => res.send(newRequest))
    .catch((err) => res.status(500).send("Error posting request.\n" + err));
}

router.post("/", postRequest);

router.get("/", (req, res) => {
  Request.find()
    .then((requests) => res.send(requests))
    .catch((err) => res.status(500).send("Error getting requests.\n" + err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id === undefined || id === "") {
    res.status(400).send("Error getting request.\nID cannot be empty.");
    return;
  }
  Request.findOne({ _id: id })
    .then((request) => {
      if (request === null) {
        res
          .status(400)
          .send(
            "Error getting request " + id + ".\nRequest " + id + " not found."
          );
      } else {
        res.send(request);
      }
    })
    .catch((err) =>
      res.status(500).send("Error getting request " + id + ".\n" + err)
    );
});

router.get("/user/:userId", (req, res) => {
  const userId = req.params.userId;
  if (userId === undefined || userId === "") {
    res
      .status(400)
      .send("Error getting requests by user.\nUser ID cannot be empty.");
    return;
  }
  Request.find({ userId: req.params.userId })
    .then((requests) => res.send(requests))
    .catch((err) =>
      res
        .status(500)
        .send("Error getting requests by user " + userId + ".\n" + err)
    );
});

function updatePpes(req, res) {
  var errorMsg = "";
  const id = req.params.id;
  if (id === undefined || id === "") {
    errorMsg += "Request ID cannot be empty.";
  }
  errorMsg += parseBodyProfiles(req);

  if (errorMsg !== "") {
    res
      .status(400)
      .send("Error updating PPEs in request" + id + ".\n" + errorMsg);
    return;
  }

  Request.updateOne({ _id: id }, { ppeProfiles: ppeProfiles })
    .then((ret) => {
      if (ret.n == 0) {
        res
          .status(400)
          .send(
            "Error updating PPEs in request " +
              id +
              ".\nRequest " +
              id +
              " not found."
          );
      } else if (ret.nModified == 0) {
        res.status(500).send("Error updating PPEs in request " + id + ".");
      }
      res.send(ret);
    })
    .catch((err) =>
      res.status(500).send("Error updating PPEs in request " + id + ".\n" + err)
    );
}

router.put("/ppes/:id", updatePpes);

router.put("/status/:id", (req, res) => {
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
    res
      .status(400)
      .send("Error updating status for request " + id + ".\n" + errorMsg);
    return;
  }

  Request.updateOne({ _id: id }, { status: status })
    .then((ret) => {
      if (ret.n == 0) {
        res
          .status(400)
          .send(
            "Error updating status of request " +
              id +
              ".\nRequest " +
              id +
              " not found."
          );
      } else if (ret.nModified == 0) {
        res.status(500).send("Error updating status of request " + id + ".");
      }
      res.send(ret);
    })
    .catch((err) =>
      res
        .status(500)
        .send("Error updating status of request " + id + ".\n" + err)
    );
});

router.put("/report/:id", (req, res) => {
  var errorMsg = "";
  const id = req.params.id;
  if (id === undefined || id === "") {
    errorMsg += "Request ID cannot be empty.\n";
  }
  const reportId = req.query.reportId;
  if (reportId === undefined || reportId === "") {
    errorMsg += "Report ID cannot be empty.\n";
  }
  if (errorMsg !== "") {
    res
      .status(400)
      .send("Error updating reports for request " + id + ".\n" + errorMsg);
    return;
  }

  Request.findOne({ _id: id })
    .then((request) => {
      if (request === null) {
        res
          .status(400)
          .send(
            "Error updating reports for request " +
              id +
              ".\nRequest " +
              id +
              " not found."
          );
      } else {
        if (request.reportIds == undefined) {
          request.reportIds = [req.query.reportId];
        } else {
          request.reportIds.push(req.query.reportId);
        }
        Request.updateOne(
          { _id: req.params.id },
          { reportIds: request.reportIds }
        )
          .then((ret) => {
            if (ret.n == 0) {
              res
                .status(400)
                .send(
                  "Error updating reports for request " +
                    id +
                    ".\nRequest " +
                    id +
                    " not found."
                );
            } else if (ret.nModified == 0) {
              res
                .status(500)
                .send("Error updating reports for request " + id + ".");
            }
            res.send(ret);
          })
          .catch((err) =>
            res
              .status(500)
              .send("Error updating reports for request " + id + ".\n" + err)
          );
      }
    })
    .catch((err) =>
      res
        .status(500)
        .send("Error updating reports for request " + id + ".\n" + err)
    );
});

router.put("/postalCode/:id", (req, res) => {
  let errorMsg = "";
  const id = req.params.id;
  if (id == undefined || id == "") {
    errorMsg += "Error modifying postal code.\nRequest ID must be defined.\n";
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

  Request.findByIdAndUpdate(id, { postalCode: postalCode }, (err, ret) => {
    if (ret == null) {
      errorMsg += `Error modifying postal code.\nRequest ${id} not found.\n`;
      res.status(400).send(errorMsg);
    } else if (err) {
      errorMsg += `Error modifying postal code for request ${id}.\n`;
      res.status(500).send(errorMsg);
    } else {
      Request.findById(id, (err, result) => {
        if (err) {
          errorMsg += `Error returning modifying postal code for request ${id}.\n`;
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
    res
      .status(400)
      .send("Error deleting request.\nRequest ID cannot be empty.");
    return;
  }
  Request.deleteOne({ _id: id }, (err, ret) => {
    if (err) {
      res.status(500).send("Error deleting request " + id + ".\n" + err);
    } else {
      if (ret.n == 0) {
        res
          .status(400)
          .send(
            "Error deleting request " + id + ".\nRequest " + id + " not found."
          );
      } else if (ret.deletedCount == 0) {
        res.status(500).send("Error deleting request " + id + ".");
      } else {
        res.send(ret);
      }
    }
  });
});

module.exports = router;
