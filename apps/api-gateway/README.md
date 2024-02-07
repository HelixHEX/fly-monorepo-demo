# API Gateway

This is a simple api gateway that uses the [`express-http-proxy`](https://www.npmjs.com/package/express-http-proxy) package to proxy the folllowing routes

## Endpoints

- [`/web`](/apps/web-server/)
- [`/yoda`](https://funtranslations.com/api/yoda) - A simple yoda translator

  **Example Request:** `http://localhost:5000/yoda?text=Master%20Obiwan%20has%20lost%20a%20planet.`

