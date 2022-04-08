import { Injectable } from "@angular/core";
import Axios from "axios";
import { Student } from "../models/Student";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  baseUrl = "http://localhost:4000/";
  constructor() {}

  getStudents = () => {
    return Axios.get(this.baseUrl);
  };

  addStudent = (student: Student) => {
    return Axios.post(this.baseUrl, student);
  };

  deleteStudent = (id: number) => {
    return Axios.delete(`${this.baseUrl}${id}`);
  };
}
