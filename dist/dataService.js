import { remoteDelete, remoteGet, remotePost } from "./remoteService.js";
// POST /transcripts
export async function addStudent(studentName) {
    return remotePost("/transcripts", { name: studentName });
}
// GET /studentids?name=string
export async function getStudentIDs(studentName) {
    return remoteGet(`/studentids?name=${studentName}`);
}
// POST /transcripts/:studentID/:course
export async function addGrade(studentID, course, grade) {
    return remotePost(`/transcripts/${studentID}/${course}`, { grade });
}
// DELETE /transcripts/:studentID/:course
export async function deleteGrade(studentID, course) {
    return remoteDelete(`/transcripts/${studentID}/${course}`);
}
// GET /transcripts/:studentID
export async function getTranscript(studentID) {
    return remoteGet(`/transcripts/${studentID}`);
}
//# sourceMappingURL=dataService.js.map