import { collection, doc, getDocs, getDoc, updateDoc, deleteDoc, query, where, setDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import Auto from '../../interfaces/Auto';
import { IAutoRepository } from '../IAutoRepository';

export class FireBaseAutoRepository implements IAutoRepository {
    private autosCollection = collection(db, 'autos');

    async findAll(): Promise<Auto[]> {
        const snapshot = await getDocs(this.autosCollection);
        return snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }) as Auto);
    }

    async findById(idPersona: string): Promise<Auto[] | undefined> {
        const q = query(this.autosCollection, where('idPersona', '==', idPersona));
        const snapshot = await getDocs(q);
        if (snapshot.empty) {
            return undefined;
        }
        return snapshot.docs.map((doc) => ({ _id: doc.id, ...doc.data() }) as Auto);
    }

    async findByIdAuto(idAuto: string): Promise<Auto | undefined> {
        const ref = doc(db, 'autos', idAuto);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
            return undefined;
        }
        return { _id: snap.id, ...snap.data() } as Auto;
    }

    async save(auto: Auto): Promise<Auto | null> {
        const docRef = doc(this.autosCollection, auto._id);
        await setDoc(docRef, auto);

        return auto;
    }

    async update(idAuto: string, cambios: Partial<Auto>): Promise<Auto | null> {
        const ref = doc(db, 'autos', idAuto);
        await updateDoc(ref, cambios);
        const updated = await getDoc(ref);
        return { _id: updated.id, ...updated.data() } as Auto;
    }

    async delete(idAuto: string): Promise<boolean> {
        const ref = doc(db, 'autos', idAuto);
        await deleteDoc(ref);
        return true;
    }
}
