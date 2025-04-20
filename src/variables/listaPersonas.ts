import Auto from '../interfaces/Auto';
import Persona from '../interfaces/Persona';

const BMW: Auto = {
    id: 1,
    año: 2013,
    color: 'Negro',
    marca: 'BMW',
    modelo: 'KANGOO',
    motor: 'V6',
    patente: 'FTW-231',
    numeroDeChasis: '235325dsad',
    idPersona: '3'
};

const PORCHE: Auto = {
    id: 2,
    año: 2010,
    color: 'Blanco',
    marca: 'Porche',
    modelo: 'lals',
    motor: 'V8',
    patente: 'JKW-231',
    numeroDeChasis: '9213987FG',
    idPersona: '1'
};

const FIESTA: Auto = {
    id: 3,
    año: 2004,
    color: 'Gris',
    marca: 'Ford',
    modelo: 'Fiesta',
    motor: 'V2',
    patente: 'PQW-532',
    numeroDeChasis: 'JDFASFDJOLA121|',
    idPersona: '2'
};

// eslint-disable-next-line prefer-const
let listaPersonas: Persona[] = [
    {
        id: '1',
        nombre: 'Cleopatra',
        apellido: 'Fiorito',
        dni: '-3123412412',
        fechaDeNacimiento: new Date(1, 2, 12),
        genero: 'femenino',
        autos: [PORCHE]
    },
    {
        id: '2',
        nombre: 'Fausto',
        apellido: 'Lugano',
        dni: '523523521',
        fechaDeNacimiento: new Date(2003, 5, 13),
        genero: 'no-binario',
        autos: [FIESTA]
    },
    {
        id: '3',
        nombre: 'Ricardo',
        apellido: 'Faustino',
        dni: '12342134',
        fechaDeNacimiento: new Date(1990, 2, 27),
        genero: 'masculino',
        autos: [BMW]
    }
];

export { listaPersonas };
