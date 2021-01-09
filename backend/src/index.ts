import express from 'express';
import { routerMain } from './routes';
import { PORT, DB_NAME } from './settings';
import { handle404, handleError } from "./utils/error";
import morgan from "morgan";
import { createDBConnection } from './utils/db_utils';
import { serverLog } from './utils/logging_util';

const portToUse = process.env.PORT || PORT;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => res.send("Hello from Elec"));
app.use('/api', routerMain)
app.use((err: any, req: any, res: any, next: any) => { handleError(err, res) });
app.all('*', (req, res) => { handle404(res) });

createDBConnection().then(() => {
    serverLog("Successfully connected to MongoDB. DB: " + DB_NAME);
    app.listen(PORT, () => {
        serverLog("Server is running at PORT: " + portToUse);
    });
}).catch((err) => {
    serverLog("Exiting. DB connection failed. Cause: " + err);
})

