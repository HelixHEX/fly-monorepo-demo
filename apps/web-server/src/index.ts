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

app.use('/error', (_req, res) => {
  return res.status(500).json({error: "Internal Server Error"})
});

app.use('/:path', (req: Request, res: Response) => {
  const {path} = req.params
  return res.json({path})
})

app.listen(process.env.PORT, () => {
  console.log(`🚀 API Gateway is running on port ${port}`);
});