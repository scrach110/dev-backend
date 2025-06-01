import { collection, doc, getDocs, getDoc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { IRepository } from '../IRepository';
import Persona from '../../interfaces/Persona';
import { randomUUID } from 'crypto';

export class FireBasePersonaRepository implements IRepository<Persona> {
    private personasCollection = collection(db, 'personas');

    async findAll(): Promise<Persona[]> {
        const snapshot = await getDocs(this.personasCollection);
        return snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }) as Persona);
    }

    async findById(id: string): Promise<Persona | undefined> {
        const ref = doc(this.personasCollection, id);
        const snap = await getDoc(ref);
        if (!snap.exists()) return undefined;
        return { _id: snap.id, ...snap.data() } as Persona;
    }

    async save(persona: Persona): Promise<Persona | null> {
        const _id = randomUUID();
        const personaData = { ...persona, _id, autos: persona.autos ?? [] };
        const docRef = doc(this.personasCollection, _id);
        await setDoc(docRef, personaData);
        return personaData;
    }

    async update(id: string, cambios: Partial<Persona>): Promise<Persona | null> {
        const ref = doc(this.personasCollection, id);
        await updateDoc(ref, cambios);
        const updated = await getDoc(ref);
        return { _id: updated.id, ...updated.data() } as Persona;
    }

    async delete(id: string): Promise<boolean> {
        const ref = doc(this.personasCollection, id);
        await deleteDoc(ref);
        return true;
    }
}
