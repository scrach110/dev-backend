import Auto from './Auto';

interface Persona {
    id: number;
    nombre: string;
    apellido: string;
    dni: string;
    fechaDeNacimiento: Date;
    genero: 'MASCULINO' | 'FEMENINO' | 'NO-BINARIO';
    autos: Auto[];
}

export default Persona;
