// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import process from 'process';
import personaRoutes from './routes/personaRoutes';
import autoRoutes from './routes/autoRoutes';
import errorHandler from './middlewares/errorHandler';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
//app.use(cors());
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true
    })
);

app.use(helmet());
app.use(express.json());

// Mis endpoints van acá
app.get('/', (req, res) => {
    console.log(req.body);

    res.json('Hello world');
});

app.post('/login', (req, res) => {
    console.log(req);

    res.json('Login OK');
});

app.use('/', personaRoutes);
app.use('/', autoRoutes);

app.use(errorHandler);

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
