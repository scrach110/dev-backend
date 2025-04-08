/*
import Persona from '../interfaces/Persona';
import app from '../server';
import { listaPersonas } from '../variables/listaPersonas';
import PersonaService from '../services/PersonaService';
import { error } from 'console';


const PersonaController = () => {
    const personaService = PersonaService();

    app.get('/personas', (req, res) => {
        const personas = personaService.obtenerPersonas();
        res.json(personas);
    });

    app.get('/entidad/:id', (req, res) => {
        const idPersona = Number(req.params.id);

        const persona = personaService.entidadCompleta(idPersona);

        if (!persona) {
            res.status(404).json();
            return;
        }

        res.json(persona);
    });

    app.put('/persona/:id', (req, res) => {
        const idPersona = Number(req.params.id);

        const persona = personaService.actualizarPersona(idPersona, req.body);

        if(!persona){
            res.status(400).json({error : "datos incorrectos"})
            return;
        }

        res.status(201).json(persona);
    });

    app.post('/persona', (req, res) => {
        const { id, nombre, apellido, dni, fechaDeNacimiento, genero, autos } = req.body;
        const persona = personaService.agregarPersona(id,nombre,apellido,dni,fechaDeNacimiento,genero,autos);

        if(!persona){
            res.status(400).json({ error: 'datos incorrectos' });
            return;
        }

        res.status(201).json({persona: persona})

    });

    app.delete('/persona/:id', (req, res) => {
    const idPersona = Number(req.params.id);
    const persona = personaService.eliminarPersona(idPersona);

    if(!persona){
        res.status(404).json({error:"la persona no existe"});
        return;
    }

    res.status(200).json('se logró eliminar a la persona');
});

export default PersonaController;

*/
