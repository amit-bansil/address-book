export class AddressBook {
  selectedPerson?: Person; // reference to object in People
  people: Person[];
  constructor() {
    this.people = [];
    this.selectedPerson = undefined;
  }
}
export class Person {
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  constructor() {
    this.name = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.notes = "";
  }
}
