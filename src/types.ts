export interface AddressBook {
  selectedPerson: Person; // reference to object in People
  people: Person[];
}
export interface Person {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
}
