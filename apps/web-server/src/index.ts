import "dotenv-safe/config";
import express, { Request, Response } from "express";
import morgan from "morgan";

const port = parseInt(process.env.PORT!) || 5001;

const app = express();

morgan.token("body", (req: express.Request) => JSON.stringify(req.body));

app.use(
  morgan(
    ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
  )
);

app.get("/error", (_req, res) => {
  return res
    .status(500)
    .json({ code: "500", message: "Internal Server Error" });
});

app.get("/:path", (req: Request, res: Response) => {
  const { path } = req.params;
  return res.json({ path });
});

app.post("/:path", (req: Request, res: Response) => {
  const { path } = req.params;
  const { body } = req.body;
  return res.json({ path, body });
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Web Server is running on port ${port}`);
});
