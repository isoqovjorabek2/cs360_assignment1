import type { StudentID, Course, Transcript } from "./TranscriptManager.js";
import { remoteDelete, remoteGet, remotePost } from "./remoteService.js";

// POST /transcripts
export async function addStudent(studentName: string): Promise<{ studentID: number }> {
  return remotePost<{ name: string }, { studentID: number }>("/transcripts", { name: studentName });
}

// GET /studentids?name=string
export async function getStudentIDs(studentName: string): Promise<StudentID[]> {
  return remoteGet<StudentID[]>(`/studentids?name=${studentName}`);
}

// POST /transcripts/:studentID/:course
export async function addGrade(
  studentID: StudentID,
  course: Course,
  grade: number
): Promise<{ grade: number }> {
  return remotePost<{ grade: number }, { grade: number }>(`/transcripts/${studentID}/${course}`, { grade });
}

// DELETE /transcripts/:studentID/:course
export async function deleteGrade(studentID: StudentID, course: Course): Promise<void> {
  return remoteDelete<void>(`/transcripts/${studentID}/${course}`);
}

// GET /transcripts/:studentID
export async function getTranscript(studentID: StudentID): Promise<Transcript> {
  return remoteGet<Transcript>(`/transcripts/${studentID}`);
}
