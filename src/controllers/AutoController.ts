import { Router } from 'express';
import AutoService from '../services/AutoService';
import Auto from '../interfaces/Auto';

const autoController = (router: Router) => {
    const autoService = AutoService();
    router.get('/auto', (req, res) => {
        const autos = autoService.obtenerTodosLosAutos();
        res.json(autos);
    });

    router.get('/autos/:id', (req, res) => {
        const idPersona = String(req.params.id);
        const autos = autoService.autosPorId(idPersona);
        if (!autos) {
            res.status(400).json({ error: 'persona no existente' });
            return;
        }
        res.json(autos);
    });

    router.get('/auto/:id', (req, res) => {
        const idAuto = String(req.params.id);

        const auto = autoService.autoPorIdAuto(idAuto);

        if (!auto) {
            res.status(404).json({ error: 'el auto o la persona propietaria no existen' });
            return;
        }

        res.json(auto);
    });

    router.put('/auto/:id', (req, res) => {
        const idAuto = String(req.params.id);

        const auto = autoService.editarAuto(idAuto, req.body);

        if (!auto) {
            res.status(404).json({ error: 'datos mal ingresados' });
            return;
        }

        res.status(200).json({ auto: auto });
    });

    router.post('/auto', (req, res) => {
        const { marca, modelo, año, patente, color, numeroDeChasis, motor, idPersona } = req.body;

        const autoAgregar: Auto ={
            id: 'null',
            marca: marca,
            modelo: modelo,
            año: año,
            patente: patente,
            color: color,
            numeroDeChasis: numeroDeChasis,
            motor: motor,
            idPersona: idPersona
        }

        const autoCreado = autoService.crearAuto(autoAgregar);

        if (!autoCreado) {
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }
        //
        const agregarAuto = autoService.agregarAutoPersona(autoCreado, autoCreado.idPersona);
        if (!agregarAuto) {
            res.status(400).json({ error: 'la persona no existe' });
            return;
        }
        res.status(201).json(autoCreado);
    });

    router.delete('/auto/:id', (req, res) => {
        const idAuto = String(req.params.id);

        const eliminado = autoService.eliminarAuto(idAuto);

        if (!eliminado) {
            res.status(404).json({ error: 'no se encontro el auto' });
        }

        res.status(200).json('Auto eliminado');
    });
};
export default autoController;
