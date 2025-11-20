import express from 'express';
import bodyParser from 'body-parser';
import testsRouter from './routes/tests.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api/tests', testsRouter);

// carpeta pública de plantillas/ejemplos
app.use('/static', express.static(new URL('../data/', import.meta.url).pathname));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on ${PORT}`);
});