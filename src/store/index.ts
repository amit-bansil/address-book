import { trpcMutation } from "./../utils/trpc";
import create from "zustand";
import type { Person, AddressBook } from "../types";
import { v4 as uuidv4 } from "uuid";
interface StoreState extends AddressBook {
  selectedPersonId: string | null; // reference to object in People
  addPerson: () => void;
  removePerson: (id: string) => void;
  selectPerson: (id: string | null) => void;
  savePerson: (person: Person) => void;
  getPeople: () => void;
  loading: boolean;
}
export const useStore = create<StoreState>((set) => {
  // TODO optimistic updates
  return {
    people: [] as Person[],
    selectedPersonId: null,
    loading: false,
    getPeople: async () => {
      set(() => ({ loading: true }));
      const people = await trpcMutation.people.getAll.query();
      set(() => ({ people, loading: false }));
    },
    addPerson: async () => {
      const id = uuidv4();
      const person = {
        id,
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      };
      await trpcMutation.people.create.mutate({ person });
      set((state) => ({
        people: [...state.people, person],
        selectedPersonId: id,
      }));
    },
    removePerson: async (personId: string) => {
      await trpcMutation.people.delete.mutate({ personId });
      set((state) => ({
        people: state.people.filter((person) => person.id !== personId),
        selectedPersonId: null,
      }));
    },
    selectPerson: (id: string | null) => {
      set(() => ({ selectedPersonId: id }));
    },
    savePerson: async (person: Person) => {
      await trpcMutation.people.update.mutate({ person });
      set((state) => ({
        people: state.people.map((p) => (p.id === person.id ? person : p)),
        selectedPersonId: null,
      }));
    },
  };
});
