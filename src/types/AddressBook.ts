import { Person } from "./Person";

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
