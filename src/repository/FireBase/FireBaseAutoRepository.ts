import { db } from '../../firebase/firebase';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import Auto from '../../interfaces/Auto';
import Persona from '../../interfaces/Persona';
import { IAutoRepository } from '../IAutoRepository';
import AppError from '../../middlewares/AppError';

export class FireBaseAutoRepository implements IAutoRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findById(id: string): Promise<Auto> {
        throw new Error('Method not implemented.');
    }
    private personaCollection = collection(db, 'personas');

    async findAll(): Promise<Auto[]> {
        const snapshot = await getDocs(this.personaCollection);
        const autos: Auto[] = [];
        snapshot.forEach((docSnap) => {
            const persona = docSnap.data() as Persona;
            if (persona.autos) {
                autos.push(...persona.autos);
            }
        });
        return autos;
    }

    async findByIdPersona(idPersona: string): Promise<Auto[]> {
        const personaRef = doc(this.personaCollection, idPersona);
        const snapshot = await getDoc(personaRef);
        const persona = snapshot.data() as Persona | undefined;
        return persona?.autos as Auto[];
    }

    async findByIdAuto(idAuto: string): Promise<Auto> {
        const snapshot = await getDocs(this.personaCollection);
        for (const docSnap of snapshot.docs) {
            const persona = docSnap.data() as Persona;
            const auto = persona.autos?.find((a) => a._id === idAuto);
            if (auto) {
                return auto;
            }
        }
        throw new AppError('El auto no existe', 404);
    }

    async save(auto: Auto): Promise<Auto> {
        const personaRef = doc(this.personaCollection, auto.idPersona);
        const snapshot = await getDoc(personaRef);
        if (!snapshot.exists()) {
            throw new AppError('Datos no encontrados', 404);
        }

        const persona = snapshot.data() as Persona;
        const autos = persona.autos ?? [];
        autos.push(auto);

        await updateDoc(personaRef, { autos });
        return auto;
    }

    async update(idAuto: string, cambios: Partial<Auto>): Promise<Auto> {
        const snapshot = await getDocs(this.personaCollection);
        for (const docSnap of snapshot.docs) {
            const persona = docSnap.data() as Persona;
            const autos = persona.autos ?? [];
            const index = autos.findIndex((a) => a._id === idAuto);
            if (index >= 0) {
                autos[index] = { ...autos[index], ...cambios };
                await updateDoc(doc(this.personaCollection, persona._id), { autos });
                return autos[index];
            }
        }
        throw new AppError('El auto no existe', 404);
    }

    async delete(idAuto: string): Promise<boolean> {
        const snapshot = await getDocs(this.personaCollection);
        for (const docSnap of snapshot.docs) {
            const persona = docSnap.data() as Persona;
            const autos = persona.autos ?? [];
            const nuevosAutos = autos.filter((a) => a._id !== idAuto);
            if (nuevosAutos.length < autos.length) {
                await updateDoc(doc(this.personaCollection, persona._id), { autos: nuevosAutos });
                return true;
            }
        }
        return false;
    }
}
