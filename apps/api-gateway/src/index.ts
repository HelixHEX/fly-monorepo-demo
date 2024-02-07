import "dotenv-safe/config";
import toml from "toml";
import fs from "fs";
import path from "path";
import express from "express";
import morgan from "morgan";
import proxy from "express-http-proxy";

const port = parseInt(process.env.PORT!) || 5000;
const environment = process.env.NODE_ENV || "development";

let config: any;
let services: any;

try {
  config = toml.parse(
    fs.readFileSync(path.join(__dirname, "../config.toml"), "utf-8")
  );
  console.log(config)
  services = config.services.map((service: any) => {
    return {
      ...service,
      environments: service.environments.filter(
        (env: any) => env.environment === environment
      ),
    };
  });
  console.log(services[0])
} catch (e) {
  console.log(e);
  config = null;
}

const main = () => {
  const app = express();

  morgan.token("body", (req: express.Request) => JSON.stringify(req.body));
  app.use(
    morgan(
      ":date[iso] :remote-addr :method :url :status :res[content-length] - :response-time ms"
    )
  );

  try {
    services.forEach((service: any) => {
      if (!service.environments) {
        throw new Error(
          `Unable to find environments config for ${service.name} service. Please check your config.toml file`
        );
      }
      if (service.environments.length === 0) return;
      const env = service.environments[0];
      if (!env)
        throw new Error(
          `Unable to find environments for ${service.name} serivice`
        );
      const url = env.url;
      if (!url) throw new Error('"url" param not found');
      app.use(service.prefix, proxy(url));
    });
  } catch (e) {
    console.log(e);
    console.log("Unable to start api gateway. Please address the above issue");
    return;
  }

  app.listen(process.env.PORT, () => {
    console.log(`🚀 API Gateway is running on port ${port}`);
  });
};

if (config) {
  main();
} else {
  console.log("Unable to start api gateway. Please address the above issue");
}
