import { type Person } from "./Person";

export interface AddressBook {
  selectedPersonId: string | null; // reference to object in People
  people: Person[];
}
