import * as db from "./TranscriptManager.js";
import express from "express";
import cors from "cors";
const app = express();
const port = 4001;
app.use(cors());
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.initialize();
app.get("/transcripts", (req, res) => {
    console.log("Handling GET /transcripts");
    let data = db.getAll();
    console.log(data);
    res.status(200).send(data);
});
app.post("/transcripts", (req, res) => {
    const studentName = req.body.name;
    let studentID = db.addStudent(studentName);
    console.log(`Handling POST /transcripts name=${studentName}, id=${studentID}`);
    res.status(200).send({ studentID });
});
//post grades and course 
app.post('/transcripts/:id/:course', (req, res) => {
    const id = parseInt(req.params.id);
    const courseName = req.params.course;
    const grade = parseInt(req.body.grade);
    console.log(`Handling POST /transcripts/${id}/${courseName}, grade=${grade}`);
    try {
        db.addGrade(id, { CourseName: courseName }, grade);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(400).send(e.message);
    }
});
app.get("/transcripts/:id", (req, res) => {
    const id = req.params.id;
    console.log(`Handling GET /transcripts/:id id = ${id}`);
    const theTranscript = db.getTranscript(parseInt(id));
    if (theTranscript === undefined) {
        res.status(404).send(`No student with id = ${id}`);
    }
    else {
        res.status(200).send(theTranscript);
    }
});
app.get("/studentids", (req, res) => {
    const studentName = req.query.name;
    console.log(`Handling GET /studentids?name=${studentName}`);
    const ids = db.getStudentID(studentName);
    console.log(`ids = ${ids}`);
    res.status(200).send(ids);
});
// DELETE /transcripts/:id
app.delete("/transcripts/:id", (req, res) => {
    const id = parseInt(req.params.id);
    console.log(`Handling DELETE /transcripts, id = ${id}`);
    try {
        db.deleteStudent(id);
        res.sendStatus(200);
    }
    catch (e) {
        res.status(404).send(e.message ?? "Unknown error");
    }
});
// fallback 404 handler (covers all methods)
app.use((req, res) => {
    console.log(defaultErrorMessage(req.method, req.path));
    res.sendStatus(404);
});
function defaultErrorMessage(method, request) {
    return `unknown ${method} request "${request}"`;
}
function initializeServer() {
    console.log(`Express server now listening on localhost:${port}`);
}
app.listen(port, initializeServer);
//# sourceMappingURL=index.js.map