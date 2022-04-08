import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Student } from "src/app/models/Student";
import { StudentService } from "src/app/services/student.service";
import { FormGroup, Validators, FormBuilder, FormArray } from "@angular/forms";
import { io } from "socket.io-client";

@Component({
  selector: "app-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.css"],
})
export class AddStudentComponent implements OnInit {
  student: Student = {
    grades: [],
  };

  addForm: FormGroup;
  get grades(): FormArray {
    return this.addForm.get("grades") as FormArray;
  }

  constructor(
    private studentService: StudentService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      name: ["", [Validators.required]],
      email: ["", [Validators.required]],
      grades: this.formBuilder.array([]),
    });
  }

  addGrade = () => {
    this.student.grades.push({ subject: "", marks: 0 });
    const gradeGroup = this.formBuilder.group({
      subject: ["", [Validators.required]],
      marks: ["", [Validators.required]],
    });

    this.grades.push(gradeGroup);
  };

  removeGrade = (index: number) => {
    this.student.grades.splice(index, 1);
    this.grades.removeAt(index);
  };

  onSubmit = () => {
    this.student = this.addForm.value as Student;

    this.studentService
      .addStudent(this.student)
      .then((data) => {
        this.addForm.reset();
        console.log(data);
      })
      .catch((error) => console.log(error));
    // const socket = io("http://localhost:5000/");
    // socket.emit("addStudent", this.student);
  };
}
