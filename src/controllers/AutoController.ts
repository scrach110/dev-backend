/*import app from '../server';
import { listaPersonas } from '../variables/listaPersonas';

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
*/
