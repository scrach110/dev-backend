// Importamos nuestras dependencias
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import process from 'process';

import Persona from './interfaces/Persona';
import { listaPersonas } from './variables/listaPersonas';

// Creamos nuestra app express
const app = express();
// Leemos el puerto de las variables de entorno, si no está, usamos uno por default
const port = process.env.PORT || 9000;

// Configuramos los plugins
// Más adelante intentaremos entender mejor cómo funcionan estos plugins
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

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

    const personas = listaPersonas.map((p) => ({ nombre: p.nombre, apellido: p.apellido, DNI: p.dni }));

    res.json(personas);
});

app.get('/autos', (req, res) => {
    const autos = listaPersonas.map((p) =>
        p.autos.map((a) => ({ marca: a.marca, modelo: a.modelo, año: a.año, patente: a.patente }))
    );

    res.json(autos);
});

app.get('/autos/id', (req, res) => {
    const idPersona = Number(req.query.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);
    const autos = persona?.autos.map((a) => ({ marca: a.marca, modelo: a.modelo, año: a.año, patente: a.patente }));

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

app.put('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    const persona = listaPersonas.find((p) => p.id === idPersona);

    if (!persona) {
        res.status(404).json({ error: 'ID inválido' });
        return;
    }

    if (isNaN(Date.parse(req.body.fechaDeNacimiento))) {
        res.status(404).json({ error: 'fecha invalida' });
        return;
    }

    try {
        const personaEdit: Partial<Persona> = req.body;

        persona.nombre = personaEdit.nombre ?? persona.nombre;
        persona.apellido = personaEdit.apellido ?? persona.apellido;
        persona.dni = personaEdit.dni ?? persona.dni;
        persona.fechaDeNacimiento = personaEdit.fechaDeNacimiento
            ? new Date(personaEdit.fechaDeNacimiento)
            : persona.fechaDeNacimiento;
        persona.genero = personaEdit.genero ?? persona.genero;
        persona.autos = personaEdit.autos ?? persona.autos;

        res.status(201).json({ 'persona actualizada': persona });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'Datos incorrectos' });
    }
});

// FALTA SOLUCIONAR LOS ERRORES EN GENERO;

app.post('/persona', (req, res) => {
    const { id, nombre, apellido, dni, fechaDeNacimiento, genero, autos } = req.body;

    const generosDisponibles = ['MASCULINO', 'FEMENINO', 'NO-BINARIO'];

    if (
        typeof id !== 'number' ||
        typeof nombre !== 'string' ||
        typeof apellido !== 'string' ||
        typeof dni !== 'string' ||
        //typeof fechaDeNacimiento !== 'string' ||
        isNaN(Date.parse(fechaDeNacimiento)) ||
        /*
        typeof genero !== 'MASCULINO' ||
        'FEMENINO' ||
        'NO-BINARIO'
        */
        !generosDisponibles.includes(genero) ||
        !Array.isArray(autos)
    ) {
        res.status(400).json({ error: 'datos incorrectos' });
        return;
    }

    const fechaNacimientoPersona = new Date(fechaDeNacimiento);

    const personaCrear: Persona = {
        id,
        nombre,
        apellido,
        dni,
        fechaDeNacimiento: fechaNacimientoPersona,
        genero,
        autos
    };

    listaPersonas.push(personaCrear);
    res.status(201).json({ persona: personaCrear });
});

app.delete('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);

    const indexPersonaEliminar = listaPersonas.findIndex((p) => p.id === idPersona);

    if (indexPersonaEliminar === -1) {
        res.status(404).json({ error: 'la persona no existe' });
        return;
    }

    const personaEliminada = listaPersonas[indexPersonaEliminar];
    listaPersonas.splice(indexPersonaEliminar, 1);

    res.status(200).json(`se logró eliminar a la persona: ${personaEliminada.nombre}`);
});

// Levantamos el servidor en el puerto que configuramos
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
