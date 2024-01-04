"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const express_1 = require("express");
const resultsRouter = (0, express_1.Router)();
resultsRouter.get("/", (req, res) => {
    const q = "SELECT * FROM results";
    __1.db.query(q, (err, data) => {
        if (err)
            return res.json(err);
        return res.json(data);
    });
});
resultsRouter.post("/", (req, res) => {
    const checkIdQuery = "SELECT COUNT(*) AS quantidade FROM results WHERE id = ?";
    const insertQuery = "INSERT INTO results (`id`, `grade`, `lesson`, `bimester`, `createdAt`, `updatedAt`) VALUES (?);";
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
    __1.db.query(checkIdQuery, [req.body.id], (errCheck, dataCheck) => {
        if (errCheck) {
            console.error("Error checking ID:", errCheck);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        const idExists = dataCheck[0].quantidade > 0;
        if (idExists) {
            return res.status(400).json({ error: "Nota já cadastrada no sistema :)" });
        }
        else {
            __1.db.query(insertQuery, [values], (errInsert) => {
                if (errInsert) {
                    console.error("Error inserting data:", errInsert);
                    return res.status(500).json({ error: "Internal Server Error" });
                }
                return res.json("Grade was assigned!");
            });
        }
    });
});
resultsRouter.delete("/:id", (req, res) => {
    const resultId = req.params.id;
    const deleteQuery = "DELETE FROM results WHERE id = ?";
    __1.db.query(deleteQuery, [resultId], (err) => {
        if (err)
            return res.json(err);
        return res.json("Grade was deleted!");
    });
});
exports.default = resultsRouter;
