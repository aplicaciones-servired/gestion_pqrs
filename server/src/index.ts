import { PORT, ORIGIN } from './config/enviroments';
import { ChatRouter } from './routes/chat.routes';

import express from 'express';
import log from 'morgan';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors(
  {
    origin: ORIGIN,
    credentials: true
  }
));
app.use(log('dev'));

app.use('/', ChatRouter );

// ! This is a simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

