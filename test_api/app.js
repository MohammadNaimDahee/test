const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//
const students = [
  {
    grades: [
      {
        subject: "Math",
        marks: 100,
      },
      {
        subject: "Physics",
        marks: 90,
      },
    ],
    id: 1,
    name: "Mohammad",
    email: "dahee.naim@gmail.com",
  },

  {
    grades: [
      {
        subject: "Math",
        marks: 90,
      },
      {
        subject: "Physics",
        marks: 100,
      },
    ],
    id: 2,
    name: "Mujtaba",
    email: "mujtaba@gmail.com",
  },
];

app.get("/", (_, res) => {
  res.send(students);
});

app.post("/", (req, res) => {
  const student = req.body;

  students.push(student);

  res.send(students);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const index = students.findIndex((s) => s.id == id);
  students[index] = student;
  res.send(students);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex((s) => s.id == id);
  students.splice(index, 1);
  res.send({ message: "Deleted" });
});

app.listen(4000, () => console.log("Server ready"));
