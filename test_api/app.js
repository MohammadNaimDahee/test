const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
const cors = require("cors");

var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const app = express();
const server = http.createServer(app);
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
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

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // socket.on("addStudent", (data) => {
  //   students.push(data);
  // });
});

app.get("/", (_, res) => {
  res.send(students);
});

app.post("/", (req, res) => {
  const student = req.body;

  students.push(student);
  io.emit("studentAdded", student);
  res.send(student);
});

app.put("/:id", (req, res) => {
  const id = req.params.id;
  const student = req.body;
  const index = students.findIndex((s) => s.id == id);
  students[index] = student;
  res.send(student);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  const index = students.findIndex((s) => s.id == id);
  students.splice(index, 1);
  res.send({ message: "Deleted" });
});

app.listen(4000, () => console.log("Server ready"));
server.listen(5000, () => console.log("Socket is running on 5000"));
