import Persona from '../interfaces/Persona';
import PersonaService from '../services/PersonaService';

import { Router } from 'express';

const PersonaController = (router: Router) => {
    const personaService = PersonaService();

    router.get('/persona/all', async (req, res) => {
        const personas = await personaService.obtenerPersonas();
        res.json(personas);
    });

    router.get('/persona/:id', async (req, res, next) => {
        try {
            const idPersona = String(req.params.id);
            const persona = await personaService.entidadCompleta(idPersona);
            res.json(persona);
        } catch (error) {
            next(error);
        }
    });

    router.put('/persona/:id', async (req, res, next) => {
        try {
            const idPersona = String(req.params.id);
            const persona = await personaService.actualizarPersona(idPersona, req.body);
            res.status(201).json(persona);
        } catch (error) {
            next(error);
        }
    });

    router.post('/persona', async (req, res, next) => {
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
        try {
            const persona = await personaService.agregarPersona(personaAgregar);
            res.status(201).json({ persona: persona });
        } catch (error) {
            next(error);
        }
    });

    router.delete('/persona/:id', async (req, res, next) => {
        try {
            const idPersona = String(req.params.id);
            await personaService.eliminarPersona(idPersona);
            res.status(200).json('se logró eliminar a la persona');
        } catch (error) {
            next(error);
        }
    });
};
export default PersonaController;
