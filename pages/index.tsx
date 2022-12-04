import { useRef, useState } from "react";
import { AddressBook, Person } from "../src/types";
import cloneDeep from "lodash/cloneDeep";
import {
  FormGroup,
  Modal,
  Page,
  PlaceholderPanel,
  PushButton,
  TableHeader,
} from "../src/components";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
export default function Home() {
  const [addressBook, setAddressBook] = useState(new AddressBook());
  let content;
  if (addressBook.people.length === 0) {
    content = <PlaceholderPanel />;
  } else {
    content = (
      <Content addressBook={addressBook} setAddressBook={setAddressBook} />
    );
  }
  return (
    <Page
      title="Address Book"
      description="Simple tool for storing information about contacts."
    >
      <PushButton
        className="w-full mb-5"
        onClick={() =>
          setAddressBook((addressBook) => {
            addressBook = cloneDeep(addressBook);
            addressBook.addContact();
            return addressBook;
          })
        }
      >
        Add Contact
      </PushButton>
      {content}
      <SelectedPersonModal
        addressBook={addressBook}
        setAddressBook={setAddressBook}
      />
    </Page>
  );
}
type SetAddressBook = (
  reducer: (addressBook: AddressBook) => AddressBook
) => void;
interface ContentProps {
  addressBook: AddressBook;
  setAddressBook: SetAddressBook;
}
function SelectedPersonModal({ addressBook, setAddressBook }: ContentProps) {
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const notesRef = useRef<HTMLInputElement>();

  function close() {
    setAddressBook((addressBook) => {
      addressBook = cloneDeep(addressBook);
      addressBook.selectedPerson = undefined;
      return addressBook;
    });
  }
  function save() {
    setAddressBook((addressBook) => {
      addressBook = cloneDeep(addressBook);
      addressBook.selectedPerson!.name = nameRef.current!.value;
      addressBook.selectedPerson!.email = emailRef.current!.value;
      addressBook.selectedPerson!.phone = phoneRef.current!.value;
      addressBook.selectedPerson!.address = addressRef.current!.value;
      addressBook.selectedPerson!.notes = notesRef.current!.value;
      return addressBook;
    });
    close();
  }
  if (!addressBook.selectedPerson) return null;
  return (
    <Modal onClose={() => {}}>
      <div className="flex flex-col gap-8">
        <FormGroup label="Name" id="name" ref={nameRef}>
          {(props) => (
            <input
              {...props}
              type="text"
              defaultValue={addressBook.selectedPerson!.name}
            />
          )}
        </FormGroup>
        <FormGroup label="Email" id="email" ref={emailRef}>
          {(props) => (
            <input
              {...props}
              type="email"
              defaultValue={addressBook.selectedPerson!.email}
            />
          )}
        </FormGroup>
        <FormGroup label="Phone" id="phone" ref={phoneRef}>
          {(props) => (
            <input
              {...props}
              type="tel"
              defaultValue={addressBook.selectedPerson!.phone}
            />
          )}
        </FormGroup>
        <FormGroup label="Address" id="address" ref={addressRef}>
          {(props) => (
            <textarea
              rows={4}
              {...props}
              defaultValue={addressBook.selectedPerson!.address}
            />
          )}
        </FormGroup>
        <FormGroup label="Notes" id="notes" ref={notesRef}>
          {(props) => (
            <textarea
              rows={4}
              {...props}
              defaultValue={addressBook.selectedPerson!.notes}
            />
          )}
        </FormGroup>
        <div className="flex gap-4">
          <PushButton onClick={save}>Save</PushButton>
          <PushButton style="tertiary" onClick={close}>
            Cancel
          </PushButton>
        </div>
      </div>
    </Modal>
  );
}
const Content = ({ addressBook, setAddressBook }: ContentProps) => {
  return (
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full align-middle md:px-6 lg:px-8">
        <table className="table-fixed width-full min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <TableHeader className="w-[30%] pl-6">Name</TableHeader>
              <TableHeader className="w-[30%]">Email</TableHeader>
              <TableHeader className="w-[31%]">Phone</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {addressBook.people.map((person, index) => (
              <tr key={index}>
                <InputCell
                  type="text"
                  ariaLabel="Name"
                  field="name"
                  person={person}
                  index={index}
                  setAddressBook={setAddressBook}
                />

                <InputCell
                  type="email"
                  ariaLabel="Email Address"
                  field="email"
                  person={person}
                  index={index}
                  setAddressBook={setAddressBook}
                />

                <InputCell
                  type="tel"
                  ariaLabel="Phone Number"
                  field="phone"
                  person={person}
                  index={index}
                  setAddressBook={setAddressBook}
                />
                <td
                  className="cursor-pointer  text-indigo-600 hover:text-indigo-900 active:text-indigo-400"
                  onClick={() => {
                    setAddressBook((addressBook) => {
                      addressBook = cloneDeep(addressBook);
                      addressBook.selectedPerson = addressBook.people[index];
                      return addressBook;
                    });
                  }}
                >
                  <ArrowRightCircleIcon className="w-6" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {addressBook.selectedPerson && (
        <div>
          <button
            onClick={() => {
              setAddressBook((addressBook) => {
                addressBook = cloneDeep(addressBook);
                addressBook.removeContact(addressBook.selectedPerson!);
                addressBook.selectedPerson = undefined;
                return addressBook;
              });
            }}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
interface InputCellProps {
  type: string;
  ariaLabel: string;
  field: keyof Person;
  person: Person;
  index: number;
  setAddressBook: SetAddressBook;
}
function InputCell({
  type,
  ariaLabel,
  field,
  person,
  index,
  setAddressBook,
}: InputCellProps) {
  return (
    <td className="overflow-hidden text-ellipsis whitespace-nowrap py-2 px-1 text-sm text-gray-500 first:pl-4">
      <input
        type={type}
        aria-label={ariaLabel}
        value={person[field]}
        className="px-2 py-2 w-full border-none"
        onChange={(event) => {
          setAddressBook((addressBook: AddressBook) => {
            addressBook = cloneDeep(addressBook);
            addressBook.people[index][field] = event.target.value;
            return addressBook;
          });
        }}
      />
    </td>
  );
}
