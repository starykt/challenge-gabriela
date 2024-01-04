import { db } from "..";
import { IResult } from "../interfaces/result";
import express, { Router, Request, Response } from "express";

const resultsRouter = Router();

resultsRouter.get("/", (req: Request, res: Response) => {
  const q = "SELECT * FROM results";
  db.query(q, (err: any, data: IResult[]) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

resultsRouter.post("/", (req: Request, res: Response) => {
  const checkIdQuery = "SELECT COUNT(*) AS quantidade FROM results WHERE id = ?";
  const insertQuery = "INSERT INTO results (`id`, `grade`, `lesson`, `bimester`, `createdAt`, `updatedAt`) VALUES (?);"
  const createdAt = new Date(req.body.createdAt);
  const updatedAt = new Date(req.body.updatedAt);

  const values: any[] = [
    req.body.id,
    req.body.grade,
    req.body.lesson,
    req.body.bimester,
    createdAt.toISOString().split('T')[0],
    updatedAt.toISOString().split('T')[0],
  ];

  // Query para validar se ID já existe no banco
  db.query(checkIdQuery, [req.body.id], (errCheck: any, dataCheck: { quantidade: number }[]) => {
    if (errCheck) {
      console.error("Error checking ID:", errCheck);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    const idExists = dataCheck[0].quantidade > 0;

    if (idExists) {
      return res.status(400).json({ error: "Nota já cadastrada no sistema :)" });
    } else {
      db.query(insertQuery, [values], (errInsert: any) => {
        if (errInsert) {
          console.error("Error inserting data:", errInsert);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json("Grade was assigned!");
      });
    }

  });
});

resultsRouter.delete("/:id", (req: Request, res: Response) => {
  const resultId = req.params.id;
  const deleteQuery = "DELETE FROM results WHERE id = ?";
  db.query(deleteQuery, [resultId], (err: any) => {
    if(err) return res.json(err)
    return res.json("Grade was deleted!")
  });
});

export default resultsRouter;