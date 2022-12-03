import Head from "next/head";
import { useState } from "react";
import { AddressBook } from "../src/types";
import cloneDeep from "lodash/cloneDeep";

export default function Home() {
  const [addressBook, setAddressBook] = useState(new AddressBook());
  return (
    <div>
      <Head>
        <title>Address Book</title>
        <meta
          name="description"
          content="Simple tool for storing information about contacts."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>Address Book</h1>
        <button
          onClick={() =>
            setAddressBook((addressBook) => {
              addressBook = cloneDeep(addressBook);
              addressBook.addContact();
              console.log(addressBook.selectedPerson);
              return addressBook;
            })
          }
        >
          Add
        </button>
      </header>
      <div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {addressBook.people.map((person, index) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    setAddressBook((addressBook) => {
                      addressBook = cloneDeep(addressBook);
                      addressBook.selectedPerson = addressBook.people[index];
                      return addressBook;
                    });
                  }}
                >
                  <td>{person.name}</td>
                  <td>{person.phone}</td>
                  <td>{person.email}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {addressBook.selectedPerson && (
          <div>
            <label>
              Name
              <input
                name="name"
                type="text"
                value={addressBook.selectedPerson.name}
                onChange={(event) => {
                  setAddressBook((addressBook) => {
                    addressBook = cloneDeep(addressBook);
                    addressBook.selectedPerson!.name = event.target.value;
                    return addressBook;
                  });
                }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
