import { Router } from "express";
const router = Router();
let { Report } = require("../models/report");

function postReport(req, res) {
  let errorMsg = "";

  const userId = req.query.userId;
  if (userId === undefined || userId === "") {
    errorMsg += "User ID cannot be empty.\n";
  }

  const reportedPostId = req.query.reportedPostId;
  if (reportedPostId === undefined || reportedPostId === "") {
    errorMsg += "Reported Post ID cannot be empty.\n";
  }

  const status = req.query.status;
  if (status != "resolved" && status != "unresolved") {
    errorMsg += "Report status must be either resolved or unresolved.\n";
  }

  const notes = req.query.notes;
  if (notes === undefined || notes === "") {
    errorMsg += "Must give a reason for reporting post.\n";
  }

  if (errorMsg != "") {
    res.status(400).send(`Error posting report.\n ${errorMsg}`);
    return;
  }

  const newReport = new Report({
    userId: userId,
    reportedPostId: reportedPostId,
    status: status,
    notes: notes,
  });

  newReport
    .save()
    .then((report) => res.send(report))
    .catch((err) => res.status(500).send(`Error posting report.\n ${err}`));
}

router.post("/", postReport);

router.get("/", (req, res) => {
  Report.find()
    .then((reports) => res.send(reports))
    .catch((err) => res.status(500).send("Error getting reports.\n" + err));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  if (id === "" || id === undefined) {
    res.status(400).send("Error finding report.\nReport ID cannot be empty.");
  } else {
    Report.findOne({ _id: id })
      .then((report) => {
        if (report === null) {
          res
            .status(400)
            .send(`Error finding report ${id}.\nReport ${id} does not exist.`);
        } else {
          res.send(report);
        }
      })
      .catch((err) => {
        res.status(500).send(`Error retrieving report ${id}.\n${err}`);
      });
  }
});

router.get("/user/:userId", (req, res) => {
  const userID = req.params.userId;
  if (userID === undefined || userID === "") {
    res.status(400).send("Cannot find user.\nMust include a user ID.");
  } else {
    Report.countDocuments({ userId: userID }).exec((err, count) => {
      if (err) {
        res
          .status(500)
          .send(`Error finding reports filed by user ${userID}.\n${err}`);
      } else if (count === 0) {
        res
          .status(400)
          .send(
            `Error finding reports filed by user ${userID}.\nUser ${userID} has not filed any reports.`
          );
      } else {
        Report.find({ userId: userID })
          .then((reports) => res.send(reports))
          .catch((error) =>
            res
              .status(500)
              .send(`Error finding reports filed by user ${userID}.\n${error}`)
          );
      }
    });
  }
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  if (id === undefined || id === "") {
    res.status(400).send("Could not delete report.\nMust include a report ID.");
    return;
  }
  Report.deleteOne({ _id: id }, (err, result) => {
    if (err) {
      res.status(500).send(`Error deleting report ${id}.\n${err}`);
    } else if (result.n == 0) {
      res
        .status(400)
        .send(`Could not delete report ${id}.\nReport ${id} not found.`);
    } else if (result.deletedCount == 0) {
      res.status(500).send(`Error deleting report ${id}.\n`);
    } else {
      res.send(result);
    }
  });
});

router.put("/status/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.query.status;

  if (id === undefined || id === "") {
    res
      .status(400)
      .send("Could not update report.\nReport ID must be provided.");
    return;
  } else if (newStatus !== "resolved" && newStatus !== "unresolved") {
    res
      .status(400)
      .send(
        `Could not update report ${id}.\nStatus must be "resolved" or "unresolved."`
      );
    return;
  }
  Report.findOne({ _id: id })
    .then((report) => {
      if (report === null) {
        res
          .status(400)
          .send(`Could not update report ${id}.\nReport ${id} not found.`);
      } else {
        report.status = newStatus;
        Report.updateOne({ _id: id }, { status: report.status })
          .then((result) => {
            if (result.n == 0) {
              res
                .status(400)
                .send(`Error updating report ${id}.\nReport ${id} not found.`);
            } else if (result.nModified == 0) {
              res.status(500).send(`Could not update report ${id}.\n`);
            }
            res.send(result);
          })
          .catch((err) =>
            res.status(500).send(`Could not update report ${id}.\n${err}`)
          );
      }
    })
    .catch((err) =>
      res.status(500).send(`Could not update report ${id}.\n${err}`)
    );
});

module.exports = router;
