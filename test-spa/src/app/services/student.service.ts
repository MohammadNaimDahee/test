import { Injectable } from "@angular/core";
import Axios from "axios";

@Injectable({
  providedIn: "root",
})
export class StudentService {
  baseUrl = "http://localhost:4000/";
  constructor() {}

  getStudents = () => {
    return Axios.get(this.baseUrl);
  };
}
