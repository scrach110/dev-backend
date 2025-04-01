// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import Persona from './model/Persona';
import Auto from './model/Auto';

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
    id: 1,
    año: 2013,
    color: 'Negro',
    marca: 'BMW',
    modelo: 'KANGOO',
    motor: 'V6',
    patente: 'FTW-231',
    numeroDeChasis: '235325dsad',
    idPersona: 3
};

const PORCHE: Auto = {
    id: 2,
    año: 2010,
    color: 'Blanco',
    marca: 'Porche',
    modelo: 'lals',
    motor: 'V8',
    patente: 'JKW-231',
    numeroDeChasis: '9213987FG',
    idPersona: 1
};

const FIESTA: Auto = {
    id: 3,
    año: 2004,
    color: 'Gris',
    marca: 'Ford',
    modelo: 'Fiesta',
    motor: 'V2',
    patente: 'PQW-532',
    numeroDeChasis: 'JDFASFDJOLA121|',
    idPersona: 2
};

let listaPersonas: Persona[] = [
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
        autos: [FIESTA]
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

    const personas = listaPersonas.map((p) => ({ nombre: p.nombre,apellido: p.apellido, DNI: p.dni }));

    res.json(personas);
});

app.get('/autos', (req, res) => {
    const autos = listaPersonas.map(
        (p) => p.autos.map((a) => ({marca: a.marca, modelo: a.modelo, año: a.año, patente: a.patente})));

    res.json(autos);
});

app.get('/autos/id', (req, res) => {
    const idPersona = Number(req.query.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);
    const autos = persona?.autos.map(
        (a) => ({ marca: a.marca, modelo: a.modelo, año: a.año, patente: a.patente})
    );

    res.json(autos);
});

app.get('/entidad/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
        res.status(404).json();
        return;
    }

    res.json(persona);
});

// TO DO

app.post('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    let persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
        res.status(404).json({ error: 'ID inválido' });
        return;
    }

    try {


        const personaEdit: Persona = req.body;

        //personaEdit = {...persona};

        persona = {...personaEdit};


        /*
        persona.nombre = personaEdit.nombre ?? persona.nombre;
        persona.apellido = personaEdit.apellido ?? persona.apellido;
        persona.dni = personaEdit.dni ?? persona.dni;
        persona.fechaDeNacimiento = personaEdit.fechaDeNacimiento
            ? new Date(personaEdit.fechaDeNacimiento)
            : persona.fechaDeNacimiento;
        persona.genero = personaEdit.genero ?? persona.genero;
        persona.autos = personaEdit.autos ?? persona.autos;
        */
        res.status(201).json({ 'persona actualizada': persona });
        return;
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'datos incorrectos' });
        return;
    }
});

app.post('/persona', (req, res) => {

    try {

    const personaCrear : Persona = {
            id: req.body.id,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            dni: req.body.dni,
            fechaDeNacimiento: req.body.fechaDeNacimiento,
            genero: req.body.genero,
            autos: req.body.autos
        }

    listaPersonas.push(personaCrear);
    res.status(200).json(personaCrear.nombre);

    return;
        }
    catch (error) {
        console.log(error);

        res.status(400).json("los datos son incorrectos");
        return;
        }
    }
);

app.delete('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);
    const persona = listaPersonas.find((p) => p.id === idPersona);
    if (!persona) {
        res.status(404).json({ error: 'persona no existente' });
        return;
    }

    listaPersonas = listaPersonas.filter((p) => p.id !== idPersona);

    res.status(201).json(`se eliminó a la persona: ${persona?.nombre}`);
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
