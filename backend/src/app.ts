import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { router } from "./routes";

const app = express(); 
app.use(cors()); //o cors permite ou barra requisições dentro da nossa aplicação

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*" //permite qualquer origem, que qualquer um (front, mobile) se conecte tanto com o http quanto com o websocket (io)
  }
});

io.on("connection", socket => {
  console.log(`Usuário conectado no socket ${socket.id}`);  
}) //qual evento eu quero ficar ouvindo

app.use(express.json()); //especificando pro express que ele pode receber no seu body requisições via json

app.use(router);

app.get("/github", (request, response) => {
  response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`);
}) //criando uma rota

app.get("/signin/callback", (request, response) => {
  const { code } = request.query;
  
  response.json(code);
  
})

export { serverHttp, io };
