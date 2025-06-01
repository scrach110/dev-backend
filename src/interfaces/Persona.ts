import Auto from './Auto';
import Genero from './Genero';

interface Persona {
    _id: string;
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    donanteOrganos: boolean;
    autos: Auto[];
}

export default Persona;
