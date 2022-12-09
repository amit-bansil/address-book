import create from "zustand";
import type { Person, AddressBook } from "../types";
import { v4 as uuidv4 } from "uuid";
interface StoreState extends AddressBook {
  addPerson: () => void;
  removePerson: (id: string) => void;
  selectPerson: (id: string | null) => void;
  savePerson: (person: Person) => void;
}
export const useStore = create<StoreState>((set, get) => ({
  people: [] as Person[],
  selectedPersonId: null,
  addPerson: () => {
    const id = uuidv4();
    set((state) => ({
      people: [
        ...state.people,
        { id, name: "", email: "", phone: "", address: "", notes: "" },
      ],
      selectedPersonId: id,
    }));
  },
  removePerson: (id: string) => {
    set((state) => ({
      people: state.people.filter((person) => person.id !== id),
      selectedPersonId: null,
    }));
  },
  selectPerson: (id: string | null) => {
    set(() => ({ selectedPersonId: id }));
  },
  savePerson: (person: Person) => {
    set((state) => ({
      people: state.people.map((p) => (p.id === person.id ? person : p)),
      selectedPersonId: null,
    }));
  },
}));
