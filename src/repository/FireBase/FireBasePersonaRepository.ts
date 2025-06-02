import { collection, doc, getDocs, getDoc, updateDoc, deleteDoc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Persona from '../../interfaces/Persona';
import AppError from '../../middlewares/AppError';
import { IPersonaRepository } from '../IPersonaRepository';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parsePersona(docSnap: any): Persona {
    const data = docSnap.data();
    let fecha: Date;

    if (data.fechaDeNacimiento instanceof Timestamp) {
        fecha = data.fechaDeNacimiento.toDate();
    } else if (typeof data.fechaDeNacimiento === 'string' || data.fechaDeNacimiento instanceof Date) {
        fecha = new Date(data.fechaDeNacimiento);
    } else {
        throw new AppError('Formato de fecha desconocido');
    }

    return {
        _id: docSnap.id,
        ...data,
        fechaDeNacimiento: fecha
    };
}

function formatFechaConHora(fecha: string | Date): string {
    if (fecha instanceof Date) {
        return `${fecha.toISOString().split('T')[0]}T12:00:00`;
    }
    return `${fecha.split('T')[0]}T12:00:00`;
}

export class FireBasePersonaRepository implements IPersonaRepository {
    private personasCollection = collection(db, 'personas');

    async findAll(): Promise<Persona[]> {
        const snapshot = await getDocs(this.personasCollection);
        return snapshot.docs.map(parsePersona);
    }

    async findById(id: string): Promise<Persona> {
        const ref = doc(this.personasCollection, id);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            throw new AppError('La persona no existe', 404);
        }
        return parsePersona(snap);
    }

    async save(persona: Persona): Promise<Persona> {
        const _id = persona._id;
        const personaData = {
            ...persona,
            _id,
            autos: persona.autos ?? [],
            fechaDeNacimiento: new Date(formatFechaConHora(persona.fechaDeNacimiento))
        };
        const docRef = doc(this.personasCollection, _id);
        await setDoc(docRef, personaData);
        return personaData;
    }

    async update(id: string, cambios: Partial<Persona>): Promise<Persona> {
        const ref = doc(this.personasCollection, id);
        const cambiosConFecha = {
            ...cambios,
            ...(cambios.fechaDeNacimiento && {
                fechaDeNacimiento: new Date(formatFechaConHora(cambios.fechaDeNacimiento))
            })
        };
        await updateDoc(ref, cambiosConFecha);
        const updated = await getDoc(ref);
        return parsePersona(updated);
    }

    async delete(id: string): Promise<boolean> {
        const ref = doc(this.personasCollection, id);
        await deleteDoc(ref);
        return true;
    }
}
