"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const cors_1 = __importDefault(require("cors"));
const mysql_1 = __importDefault(require("mysql"));
const dotenv_1 = __importDefault(require("dotenv"));
const resultRoutes_1 = __importDefault(require("./routes/resultRoutes"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
dotenv_1.default.config();
// Conexão com o banco de dados MYSQL
exports.db = mysql_1.default.createConnection({
    host: process.env.HOST,
    user: 'root',
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.get("/api/v1/", (req, res) => {
    res.json("Bem vindo ao backend.");
});
app.use("/api/v1/results", resultRoutes_1.default);
// app.get("/api/v1/results", (req: Request, res: Response) => {
//   const q = "SELECT * FROM results";
//   db.query(q, (err: any, data: IResult[]) => {
//     if(err) return res.json(err)
//     return res.json(data)
//   });
// })
// app.post("/api/v1/results", (req: Request, res: Response) => {
//   const checkIdQuery = "SELECT COUNT(*) AS quantidade FROM results WHERE id = ?";
//   const insertQuery = "INSERT INTO results (`id`, `grade`, `lesson`, `bimester`, `createdAt`, `updatedAt`) VALUES (?);"
//   const createdAt = new Date(req.body.createdAt);
//   const updatedAt = new Date(req.body.updatedAt);
//   const values: any[] = [
//     req.body.id,
//     req.body.grade,
//     req.body.lesson,
//     req.body.bimester,
//     createdAt.toISOString().split('T')[0],
//     updatedAt.toISOString().split('T')[0],
//   ];
//   // Query para validar se ID já existe no banco
//   db.query(checkIdQuery, [req.body.id], (errCheck: any, dataCheck: { quantidade: number }[]) => {
//     if (errCheck) {
//       console.error("Error checking ID:", errCheck);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }
//     const idExists = dataCheck[0].quantidade > 0;
//     if (idExists) {
//       return res.status(400).json({ error: "Nota já cadastrada no sistema :)" });
//     } else {
//       db.query(insertQuery, [values], (errInsert: any) => {
//         if (errInsert) {
//           console.error("Error inserting data:", errInsert);
//           return res.status(500).json({ error: "Internal Server Error" });
//         }
//         return res.json("Grade was assigned!");
//       });
//     }
//   });
// });
// app.delete("/api/v1/results/:id", (req: Request, res: Response) => {
//   const resultId = req.params.id;
//   const deleteQuery = "DELETE FROM results WHERE id = ?";
//   db.query(deleteQuery, [resultId], (err: any) => {
//     if(err) return res.json(err)
//     return res.json("Grade was deleted!")
//   });
// })
app.listen(8080, () => {
    console.log("Conectado ao backend!");
});
