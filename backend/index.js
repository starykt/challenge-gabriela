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
  const checkIdQuery = "SELECT COUNT(*) AS quantidade FROM results WHERE id = ?";
  const insertQuery = "INSERT INTO results (`id`, `grade`, `lesson`, `bimester`, `createdAt`, `updatedAt`) VALUES (?);"
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

  // Query para validar se ID já existe no banco
  db.query(checkIdQuery, [req.body.id], (errCheck, dataCheck) => {
    if (errCheck) {
      console.error("Error checking ID:", errCheck);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const idExists = dataCheck[0].quantidade > 0;

    if (idExists) {
      return res.status(400).json({ error: "Nota já cadastrada no sistema :)" });
    } else {
      db.query(insertQuery, [values], (errInsert, dataInsert) => {
        if (errInsert) {
          console.error("Error inserting data:", errInsert);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Grade was assigned!");
      });
    }

  });
});

app.delete("/api/v1/results/:id", (req, res) => {
  const resultId = req.params.id;
  const deleteQuery = "DELETE FROM results WHERE id = ?";
  db.query(deleteQuery, [resultId], (err, data) => {
    if(err) return res.json(err)
    return res.json("Grade was deleted!")
  });
})

app.listen(8080, () => {
  console.log("Conectado ao backend!")
})