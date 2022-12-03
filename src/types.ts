export class AddressBook {
  selectedPerson?: Person; // reference to object in People
  people: Person[];
  constructor() {
    this.people = [];
    this.selectedPerson = undefined;
  }
  addContact() {
    this.people.push(new Person());
    this.selectedPerson = this.people[this.people.length - 1];
  }
  removeContact(person: Person) {
    const index = this.people.indexOf(person);
    if (index > -1) {
      this.people.splice(index, 1);
    }
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
