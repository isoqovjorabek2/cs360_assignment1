import type { StudentID, Course, Transcript } from "./TranscriptManager.js";
export declare function addStudent(studentName: string): Promise<{
    studentID: number;
}>;
export declare function getStudentIDs(studentName: string): Promise<StudentID[]>;
export declare function addGrade(studentID: StudentID, course: Course, grade: number): Promise<{
    grade: number;
}>;
export declare function deleteGrade(studentID: StudentID, course: Course): Promise<void>;
export declare function getTranscript(studentID: StudentID): Promise<Transcript>;
//# sourceMappingURL=dataService.d.ts.map