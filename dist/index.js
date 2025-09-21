// index.ts
import express from "express";
import cors from "cors";
import * as db from "./TranscriptManager.js";
import * as ds from "./dataService.js";
// Express Server Setup
const app = express();
const port = 4001;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.initialize();
// REST Endpoints
// GET /transcripts
app.get("/transcripts", (req, res) => {
    console.log("Handling GET /transcripts");
    let data = db.getAll();
    console.log(data);
    res.status(200).send(data);
});
// POST /transcripts
app.post("/transcripts", (req, res) => {
    const studentName = req.body.name;
    let studentID = db.addStudent(studentName);
    console.log(`Handling POST /transcripts name=${studentName}, id=${studentID}`);
    res.status(200).send({ studentID });
});
// POST /transcripts/:id/:course
app.post("/transcripts/:id/:course", (req, res) => {
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
// GET /transcripts/:id
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
// GET /studentids?name=string
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
// fallback 404
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
// Client-side Script Part
console.log("starting index.ts");
// Example script: add a student, then fetch their transcript
async function script1() {
    const student = await ds.addStudent("Jasur");
    console.log("Added student:", student);
    const ids = await ds.getStudentIDs("Jasur");
    console.log("Student IDs:", ids);
    const firstId = ids[0];
    if (firstId !== undefined) {
        const transcript = await ds.getTranscript(firstId);
        console.log("Transcript for Jasur:", transcript);
    }
}
async function getTranscriptsByName(studentName) {
    const ids = await ds.getStudentIDs(studentName);
    const transcripts = [];
    for (const id of ids) {
        const transcript = await ds.getTranscript(id);
        transcripts.push(transcript);
    }
    return transcripts;
}
// Kick off the scripts
script1();
console.log(getTranscriptsByName("Jasur")); // prints Promise<pending>
console.log("index.ts done");
//# sourceMappingURL=index.js.map