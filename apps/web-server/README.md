# Web Server

An express app that just returns whatever path you enter


# Endpoints
<details>
 <summary><code>GET</code> <code><b>/web/error</b></code></summary>

##### Responses

> | http code | content-type     | response                                          |
> | --------- | ---------------- | ------------------------------------------------- |
> | 500       | application/json | {"code": "500", message: "Internal Server Error"} |

</details>
<details>
 <summary><code>GET</code> <code><b>/web/:path</b></code></summary>

##### Responses

> | http code | content-type     | response          |
> | --------- | ---------------- | ----------------- |
> | 200       | application/json | {"path": `path`} |

</details>


<details>
 <summary><code>POST</code> <code><b>/web/:path</b></code></summary>

##### Responses

> | http code | content-type     | response                                          |
> | --------- | ---------------- | ------------------------------------------------- |
> | 200       | application/json | {"path": `path`, body: `body` |

</details>


