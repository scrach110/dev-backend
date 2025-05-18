import Persona from '../interfaces/Persona';
import PersonaService from '../services/PersonaService';

import { Router } from 'express';

const PersonaController = (router: Router) => {
    const personaService = PersonaService();

    router.get('/persona/all', async (req, res) => {
        const personas = await personaService.obtenerPersonas();
        res.json(personas);
    });

    router.get('/persona/:id', async (req, res) => {
        const idPersona = String(req.params.id);

        const persona = await personaService.entidadCompleta(idPersona);

        if (!persona) {
            res.status(404).json();
            return;
        }

        res.json(persona);
    });

    router.put('/persona/:id', async (req, res) => {
        const idPersona = String(req.params.id);

        const persona = await personaService.actualizarPersona(idPersona, req.body);

        if (!persona) {
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }

        res.status(201).json(persona);
    });

    router.post('/persona', async (req, res) => {
        const { nombre, apellido, dni, fechaDeNacimiento, genero, donanteOrganos, autos } = req.body;

        const personaAgregar: Persona = {
            _id: 'null',
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            fechaDeNacimiento: fechaDeNacimiento,
            genero: genero,
            donanteOrganos: donanteOrganos,
            autos: autos
        };

        const persona = await personaService.agregarPersona(personaAgregar);

        if (!persona) {
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }

        res.status(201).json({ persona: persona });
    });

    router.delete('/persona/:id', async (req, res) => {
        const idPersona = String(req.params.id);
        const eliminada = await personaService.eliminarPersona(idPersona);

        if (!eliminada) {
            res.status(404).json({ error: 'la persona no existe' });
            return;
        }

        res.status(200).json('se logró eliminar a la persona');
    });
};
export default PersonaController;
