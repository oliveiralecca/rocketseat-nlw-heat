import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).json({
      errorCode: "token.invalid"
    });
  }

  //token recebido dentro do headers: Bearer 6027638976nfgj975692037
  // [0] Bearer (é ignorada pela [,])
  // [1] 6027638976nfgj975692037
  const [, token] = authToken.split(" ");

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayLoad; //sub = id do usuário se o verify for válido
    request.user_id = sub;

    return next(); //para passar o middleware pra frente: dando tudo certo aqui, ele passa para a próxima função lá em routes
  } catch(err) {
    return response.status(401).json({ errorCode: "token.expired" })
  }
  
}
