// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import Persona from './model/Persona';
import Auto from './model/Auto';
import { error } from 'console';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

//Variables temporales de las interfaces
const BMW: Auto = {
    año: 2013,
    color: 'Negro',
    marca: 'BMW',
    modelo: 'KANGOO',
    motor: 'V6',
    patente: 'FTW-231',
    numeroDeChasis: '235325dsad'
};

const PORCHE: Auto = {
    año: 2010,
    color: 'Blanco',
    marca: 'Porche',
    modelo: 'lals',
    motor: 'V8',
    patente: 'JKW-231',
    numeroDeChasis: '9213987FG'
};

const FIESTA: Auto = {
    año: 2004,
    color: 'Gris',
    marca: 'Ford',
    modelo: 'Fiesta',
    motor: 'V2',
    patente: 'PQW-532',
    numeroDeChasis: 'JDFASFDJOLA121|'
};
/*
const ricardo: Persona = {
    nombre: 'Ricardo',
    apellido: 'Faustino',
    dni: '12342134',
    fechaDeNacimiento: new Date(1990, 2, 27),
    genero: 'MASCULINO',
    autos: [BMW]
};

const fausto: Persona = {
    nombre: 'Fausto',
    apellido: 'Lugano',
    dni: '523523521',
    fechaDeNacimiento: new Date(2003, 5, 13),
    genero: 'NO-BINARIO',
    autos: [BMW, FIESTA]
};

const cleopatra: Persona = {
    nombre: 'Cleopatra',
    apellido: 'Fiorito',
    dni: '-3123412412',
    fechaDeNacimiento: new Date(1, 2, 12),
    genero: 'FEMENINO',
    autos: [PORCHE]
};
*/
const listaPersonas: Persona[] = [
    {
        id: 1,
        nombre: 'Cleopatra',
        apellido: 'Fiorito',
        dni: '-3123412412',
        fechaDeNacimiento: new Date(1, 2, 12),
        genero: 'FEMENINO',
        autos: [PORCHE]
    },
    {
        id: 2,
        nombre: 'Fausto',
        apellido: 'Lugano',
        dni: '523523521',
        fechaDeNacimiento: new Date(2003, 5, 13),
        genero: 'NO-BINARIO',
        autos: [BMW, FIESTA]
    },
    {
        id: 3,
        nombre: 'Ricardo',
        apellido: 'Faustino',
        dni: '12342134',
        fechaDeNacimiento: new Date(1990, 2, 27),
        genero: 'MASCULINO',
        autos: [BMW]
    }
];

// Mis endpoints van acá
app.get('/', (req, res) => {
    console.log(req.body);

    res.json('Hello world');
});

app.post('/login', (req, res) => {
    console.log(req);

    res.json('Login OK');
});

app.get('/personas', (req, res) => {
    console.log(req.body);

    const personas = listaPersonas.map((p) => `nombre:${p.nombre}  apellido:${p.apellido} - DNI: ${p.dni}`);

    res.json(`las personas en la app son: ${personas}`);
});

app.get('/autos', (req, res) => {
    const autos = listaPersonas.map(
        (p) => `${p.autos.map((a) => `Marca: ${a.marca}, Modelo: ${a.modelo}, Año: ${a.año}, Patente: ${a.patente}`)}`
    );

    res.json(`los autos en la app son: ${autos}`);
});

app.get('/autos/id', (req, res) => {
    const idPersona = Number(req.query.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);
    const autos = persona?.autos.map(
        (a) => `Marca: ${a.marca}, Modelo: ${a.modelo}, Año: ${a.año}, Patente: ${a.patente}`
    );

    res.json(`los autos del usuario ${persona?.nombre} son: ${autos}`);
});

app.get('/entidad/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
        res.status(404).json();
    }

    res.json(persona);
});

// TO DO
app.post('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
        res.status(404).json({ error: 'ID inválido' });
    }

    const loQueLlega = req.body;

    console.log(loQueLlega);

    res.json('entró');
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
