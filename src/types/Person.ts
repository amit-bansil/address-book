import { v4 as uuidv4 } from "uuid";

export class Person {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  constructor() {
    this.id = uuidv4();
    this.name = "";
    this.email = "";
    this.phone = "";
    this.address = "";
    this.notes = "";
  }
}
