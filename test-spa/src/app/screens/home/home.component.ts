import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/Student";
import { StudentService } from "src/app/services/student.service";
import { io } from "socket.io-client";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  showAddStudent = false;
  constructor(private studentService: StudentService) {
    const socket = io("http://localhost:5000/");
    socket.on("studentAdded", (student) => {
      console.log("Student:::", student);
      this.students.push(student);
    });
  }

  ngOnInit() {
    this.getStudents();
  }

  getStudents = () => {
    this.studentService
      .getStudents()
      .then(({ data }) => {
        this.students = data;
        console.log(this.students);
      })
      .catch((error) => console.log(error));
  };

  deleteStudent = (id: number) => {
    this.studentService
      .deleteStudent(id)
      .then(({ data }) => {
        alert(data.message);
        const index = this.students.findIndex((s) => s.id == id);
        this.students.splice(index, 1);
      })
      .catch((error) => console.log(error));
  };
}
