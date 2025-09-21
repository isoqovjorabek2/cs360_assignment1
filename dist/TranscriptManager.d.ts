/**
 * @fileoverview // managing students data
 * @version 1.0.1
 */
export type StudentID = number;
export type Student = {
    StudentID: StudentID;
    Studentname: string;
};
export type Course = {
    CourseName: string;
};
export type CourseGrade = {
    course: Course;
    grade: number;
};
export type Transcript = {
    student: Student;
    grades: CourseGrade[];
};
export declare function initialize(): void;
export declare function getAll(): Transcript[];
export declare function addStudent(name: string): StudentID;
export declare function getTranscript(StudentID: number): Transcript | undefined;
export declare function getStudentID(Studentname: string): StudentID[];
export declare function deleteStudent(studentID: StudentID): void;
export declare function addGrade(studentID: StudentID, course: Course, grade: number): void;
export declare function getGrade(studentID: StudentID, course: Course): number;
//# sourceMappingURL=TranscriptManager.d.ts.map