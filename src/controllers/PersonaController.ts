import PersonaService from '../services/PersonaService';

import { Router } from 'express';

const PersonaController = (router: Router) => {
    const personaService = PersonaService();

    router.get('/personas', (req, res) => {
        const personas = personaService.obtenerPersonas();
        res.json(personas);
    });

    router.get('/entidad/:id', (req, res) => {
        const idPersona = Number(req.params.id);

        const persona = personaService.entidadCompleta(idPersona);

        if (!persona) {
            res.status(404).json();
            return;
        }

        res.json(persona);
    });

    router.put('/persona/:id', (req, res) => {
        const idPersona = Number(req.params.id);

        const persona = personaService.actualizarPersona(idPersona, req.body);

        if (!persona) {
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }

        res.status(201).json(persona);
    });

    router.post('/persona', (req, res) => {
        const { id, nombre, apellido, dni, fechaDeNacimiento, genero, autos } = req.body;
        const persona = personaService.agregarPersona(id, nombre, apellido, dni, fechaDeNacimiento, genero, autos);

        if (!persona) {
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }

        res.status(201).json({ persona: persona });
    });

    router.delete('/persona/:id', (req, res) => {
        const idPersona = Number(req.params.id);
        const eliminada = personaService.eliminarPersona(idPersona);

        if (!eliminada) {
            res.status(404).json({ error: 'la persona no existe' });
            return;
        }

        res.status(200).json('se logró eliminar a la persona');
    });
};
export default PersonaController;
