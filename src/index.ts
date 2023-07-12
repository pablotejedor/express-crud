import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
