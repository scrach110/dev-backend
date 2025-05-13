import { Router } from 'express';
import AutoService from '../services/AutoService';
import Auto from '../interfaces/Auto';

const autoController = (router: Router) => {
    const autoService = AutoService();
    router.get('/auto', async (req, res) => {
        const autos = await autoService.obtenerTodosLosAutos();
        res.json(autos);
    });

    router.get('/autos/:id', async (req, res) => {
        const idPersona = String(req.params.id);
        const autos = await autoService.autosPorId(idPersona);
        if (!autos) {
            res.status(400).json({ error: 'persona no existente' });
            return;
        }
        res.json(autos);
    });

    router.get('/auto/:id', async (req, res) => {
        const idAuto = String(req.params.id);

        const auto = await autoService.autoPorIdAuto(idAuto);

        if (!auto) {
            res.status(404).json({ error: 'el auto o la persona propietaria no existen' });
            return;
        }

        res.json(auto);
    });

    router.put('/auto/:id', async (req, res) => {
        const idAuto = String(req.params.id);

        const auto = await autoService.editarAuto(idAuto, req.body);

        if (!auto) {
            res.status(404).json({ error: 'datos mal ingresados' });
            return;
        }

        res.status(200).json({ auto: auto });
    });

    router.post('/auto', async (req, res) => {
        const { marca, modelo, año, patente, color, numeroDeChasis, motor, idPersona } = req.body;

        const autoAgregar: Auto = {
            id: 'null',
            marca: marca,
            modelo: modelo,
            año: año,
            patente: patente,
            color: color,
            numeroDeChasis: numeroDeChasis,
            motor: motor,
            idPersona: idPersona
        };
        try {
            const autoCreado = await autoService.crearAuto(autoAgregar);

            if (!autoCreado) {
                res.status(400).json({ error: 'datos incorrectos' });
                return;
            }
            const agregarAuto = await autoService.agregarAutoPersona(autoCreado, autoCreado.idPersona);
            if (!agregarAuto) {
                res.status(400).json({ error: 'la persona no existe' });
                return;
            }
            res.status(201).json(autoCreado);
        } catch (error) {
            console.error('Error al crear el auto:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    });

    router.delete('/auto/:id', async (req, res) => {
        const idAuto = String(req.params.id);

        const eliminado = await autoService.eliminarAuto(idAuto);

        if (!eliminado) {
            res.status(404).json({ error: 'no se encontro el auto' });
        }

        res.status(200).json('Auto eliminado');
    });
};
export default autoController;
