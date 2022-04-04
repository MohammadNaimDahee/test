import { Component, OnInit } from "@angular/core";
import { Student } from "src/app/models/Student";
import { StudentService } from "src/app/services/student.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  students: Student[] = [];
  constructor(private studentService: StudentService) {}

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
}
