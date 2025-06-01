import { Router } from 'express';
import AutoService from '../services/AutoService';
import Auto from '../interfaces/Auto';

const autoController = (router: Router) => {
    const autoService = AutoService();
    router.get('/auto', async (req, res) => {
        const autos = await autoService.obtenerTodosLosAutos();
        res.json(autos);
    });

    router.get('/autos/:id', async (req, res, next) => {
        try {
            const idPersona = String(req.params.id);
            const autos = await autoService.autosPorId(idPersona);
            res.json(autos);
        } catch (error) {
            next(error);
        }
    });

    router.get('/auto/:id', async (req, res, next) => {
        try {
            const idAuto = String(req.params.id);
            const auto = await autoService.autoPorIdAuto(idAuto);
            res.json(auto);
        } catch (error) {
            next(error);
        }
    });

    router.put('/auto/:id', async (req, res, next) => {
        try {
            const idAuto = String(req.params.id);
            const auto = await autoService.editarAuto(idAuto, req.body);
            res.status(200).json({ auto: auto });
        } catch (error) {
            next(error);
        }
    });

    router.post('/auto', async (req, res, next) => {
        const { marca, modelo, año, patente, color, numeroDeChasis, motor, idPersona } = req.body;

        const autoAgregar: Auto = {
            _id: 'null',
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
            await autoService.agregarAutoPersona(autoCreado);
            res.status(201).json(autoCreado);
        } catch (error) {
            console.error('Error al crear el auto:', error);
            next(error);
        }
    });

    router.delete('/auto/:id', async (req, res) => {
        const idAuto = String(req.params.id);

        const eliminado = await autoService.eliminarAuto(idAuto);

        if (!eliminado) {
            res.status(404).json({ error: 'no se encontro el auto' });
            return;
        }

        res.status(200).json('Auto eliminado');
    });
};
export default autoController;
