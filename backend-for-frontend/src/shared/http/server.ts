import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import timeout from 'connect-timeout';
import 'dotenv/config';
import 'express-async-errors';

import routes from '../routes';
import notFoundMiddleware from '../middlewares/NotFound';
import errorMiddleware from '../middlewares/Error';

const app = express();

app.use(cors()); // Habilitando cors globalmente
app.use(cookieParser()); // Habilitando cookies no Express
app.use(express.json()); // Utilizando JSON como linguagem padrão
app.use(timeout('10s')); // Criando timeout de 10s para todas as requisições
app.use(routes); // Rotas
app.use([notFoundMiddleware, errorMiddleware]); // Use Middlewares

app.listen(process.env.PORT || 3333, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
