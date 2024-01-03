import cors from "cors";
import mysql from "mysql";
import express from "express";

const app = express();

// Conexão com o banco de dados MYSQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret123",
  database: "schools"
})

app.use(express.json());
app.use(cors());

app.get("/api/v1/", (req, res) => {
  res.json("Bem vindo ao backend.")
})

app.get("/api/v1/results", (req, res) => {
  const q = "SELECT * FROM results";
  db.query(q, (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  });
})

app.post("/api/v1/results", (req, res) => {
  const q = "INSERT INTO results (`id`, `grade`, `lesson`, `bimester`, `createdAt`, `updatedAt`) VALUES (?);"
  const createdAt = new Date(req.body.createdAt);
  const updatedAt = new Date(req.body.updatedAt);

  const values = [
    req.body.id,
    req.body.grade,
    req.body.lesson,
    req.body.bimester,
    createdAt.toISOString().split('T')[0],
    updatedAt.toISOString().split('T')[0],
  ];

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json("Grade was assigned!")
  });
})

app.listen(8080, () => {
  console.log("Conectado ao backend!")
})