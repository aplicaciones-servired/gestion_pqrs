import { PORT, ORIGIN } from './config/enviroments';

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


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

