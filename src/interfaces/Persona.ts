import Auto from './Auto';
import Genero from './Genero';

interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: Genero;
    autos: Auto[];
}

export default Persona;
