/**
 * @fileoverview // managing students data 
 * @version 1.0.1
 */
//data types
export type StudentID = number;
export type Student = { StudentID: StudentID, Studentname: string };
export type Course = { CourseName: string };
export type CourseGrade = { course: Course, grade: number };
export type Transcript = { student: Student, grades: CourseGrade[] };

let students: Student[] = [];
let transcripts: Transcript[] = [];

export function initialize(): void {
    students = [
        { StudentID: 1, Studentname: "Alex" },
        { StudentID: 2, Studentname: "Bobur" },
        { StudentID: 3, Studentname: "Ahmad" },
        { StudentID: 4, Studentname: "Adam" }
    ];
    transcripts = [];
    for (let student of students) {
        transcripts.push({ student: student, grades: [] });
    }
    console.log(transcripts);
}

// returns a list of all the transcripts.
// handy for debugging
export function getAll(): Transcript[] {
    return transcripts;
}

// creates an empty transcript for a student with this name,
// and returns a fresh ID number
export function addStudent(name: string): StudentID {
    const newID = students.length > 0 ? Math.max(...students.map(s => s.StudentID)) + 1 : 1;
    const newStudent: Student = { StudentID: newID, Studentname: name };
    students.push(newStudent);
    transcripts.push({ student: newStudent, grades: [] });
    return newID;
}

// gets transcript for given ID.  Returns undefined if missing
export function getTranscript(StudentID: number): Transcript | undefined {
    return transcripts.find(t => t.student.StudentID === StudentID);
}

// returns list of studentIDs matching a given name
export function getStudentID(Studentname: string): StudentID[] {
    return students
        .filter(s => s.Studentname === Studentname)
        .map(t => t.StudentID);
}

// deletes student with the given ID from the database.
// throws exception if no such student. 
export function deleteStudent(studentID: StudentID): void {
    const studentIndex = students.findIndex(s => s.StudentID === studentID);
    if (studentIndex === -1) {
        throw new Error(`No student with id = ${studentID}`);
    }
    students.splice(studentIndex, 1);
    transcripts = transcripts.filter(t => t.student.StudentID !== studentID);
}

// adds a grade for the given student in the given course.
// throws error if student already has a grade in that course
export function addGrade(studentID: StudentID, course: Course, grade: number): void {
    let tr = transcripts.find(t => t.student.StudentID === studentID);
    if (!tr) {
        throw new Error("no such transcript does exist");
    }
    if (tr.grades.some(s => s.course.CourseName === course.CourseName)) {
        throw new Error("Grade for the course have already been added");
    }
    tr.grades.push({ course, grade });
}

// returns the grade for the given student in the given course
// throws an error if no such student or no such grade
export function getGrade(studentID: StudentID, course: Course): number {
    const tr = transcripts.find(t => t.student.StudentID === studentID);
    if (!tr) {
        throw new Error(`No transcript for student id = ${studentID}`);
    }
    const gr = tr.grades.find(s => s.course.CourseName === course.CourseName);
    if (!gr) {
        throw new Error(`No grade found for course ${course.CourseName}`);
    }
    return gr.grade;
}
