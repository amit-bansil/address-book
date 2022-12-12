import { ReactElement, useEffect, useRef } from "react";
import {
  FormGroup,
  LinkButton,
  Modal,
  Page,
  PlaceholderPanel,
  PushButton,
  TableHeader,
} from "../components";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import type { Person } from "../types";
import { useStore } from "../store";
import shallow from "zustand/shallow";

export default function Home() {
  const { addPerson, hasPeople, getPeople, loading } = useStore(
    (store) => ({
      addPerson: store.addPerson,
      hasPeople: store.people.length > 0,
      getPeople: store.getPeople,
      loading: store.loading,
    }),
    shallow
  );
  useEffect(() => {
    getPeople();
  }, [getPeople]);
  let content;
  let addPeopleButton: ReactElement | null = (
    <PushButton className="mb-5 w-full" onClick={addPerson}>
      Add Person
    </PushButton>
  );
  if (loading) {
    addPeopleButton = null;
  }
  if (!hasPeople) {
    content = <PlaceholderPanel />;
  } else {
    content = <Content />;
  }
  return (
    <Page
      title="Address Book"
      description="Simple tool for storing information about persons."
    >
      {addPeopleButton}
      {content}
      {/* Use a modal instead of a route so that we don't lose scroll position */}
      <SelectedPersonModal />
    </Page>
  );
}
function SelectedPersonModal() {
  const { selectedPerson, savePerson, removePerson, selectNobody } = useStore(
    (store) => ({
      selectedPerson: store.people.find((p) => p.id === store.selectedPersonId),
      savePerson: store.savePerson,
      removePerson: store.removePerson,
      selectNobody: () => store.selectPerson(null),
    }),
    shallow
  );
  const nameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const phoneRef = useRef<HTMLInputElement>();
  const addressRef = useRef<HTMLInputElement>();
  const notesRef = useRef<HTMLInputElement>();

  if (!selectedPerson) return null;
  function save() {
    savePerson({
      id: selectedPerson!.id,
      name: nameRef.current!.value,
      email: emailRef.current!.value,
      phone: phoneRef.current!.value,
      address: addressRef.current!.value,
      notes: notesRef.current!.value,
    });
  }
  function remove() {
    removePerson(selectedPerson!.id);
  }
  function close() {
    selectNobody();
  }
  return (
    <Modal
      onClose={() => {
        /*noop*/
      }}
    >
      <div className="flex flex-col gap-8">
        <FormGroup label="Name" id="name" ref={nameRef}>
          {(props) => (
            <input {...props} type="text" defaultValue={selectedPerson!.name} />
          )}
        </FormGroup>
        <FormGroup label="Email" id="email" ref={emailRef}>
          {(props) => (
            <input
              {...props}
              type="email"
              defaultValue={selectedPerson.email}
            />
          )}
        </FormGroup>
        <FormGroup label="Phone" id="phone" ref={phoneRef}>
          {(props) => (
            <input {...props} type="tel" defaultValue={selectedPerson.phone} />
          )}
        </FormGroup>
        <FormGroup label="Address" id="address" ref={addressRef}>
          {(props) => (
            <textarea
              rows={3}
              {...props}
              defaultValue={selectedPerson.address}
            />
          )}
        </FormGroup>
        <FormGroup label="Notes" id="notes" ref={notesRef}>
          {(props) => (
            <textarea rows={3} {...props} defaultValue={selectedPerson.notes} />
          )}
        </FormGroup>
        <div className="flex items-baseline gap-4">
          <PushButton onClick={save}>Save</PushButton>
          <PushButton style="tertiary" onClick={close}>
            Cancel
          </PushButton>
          <div className="grow" />
          <LinkButton style="danger" onClick={remove}>
            Delete
          </LinkButton>
        </div>
      </div>
    </Modal>
  );
}
const Content = () => {
  const people = useStore((store) => store.people, shallow);
  return (
    <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6">
      <div className="inline-block min-w-full align-middle">
        <table className="width-full min-w-full table-fixed divide-y divide-gray-300">
          <thead>
            <tr>
              <TableHeader className="w-[30%] pl-6">Name</TableHeader>
              <TableHeader className="w-[30%]">Email</TableHeader>
              <TableHeader className="w-[31%]">Phone</TableHeader>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {people.map((person) => (
              <PersonRow key={person.id} person={person} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
function PersonRow({ person }: { person: Person }) {
  const { selectPerson } = useStore((store) => ({
    selectPerson: store.selectPerson,
  }));
  return (
    <tr>
      <InputCell type="text" ariaLabel="Name" field="name" person={person} />

      <InputCell
        type="email"
        ariaLabel="Email Address"
        field="email"
        person={person}
      />

      <InputCell
        type="tel"
        ariaLabel="Phone Number"
        field="phone"
        person={person}
      />
      <td
        className="cursor-pointer  text-indigo-600 hover:text-indigo-900 active:text-indigo-400"
        onClick={() => {
          selectPerson(person.id);
        }}
      >
        <ArrowRightCircleIcon className="w-6" />
      </td>
    </tr>
  );
}
interface InputCellProps {
  type: string;
  ariaLabel: string;
  field: keyof Person;
  person: Person;
}
function InputCell({ type, ariaLabel, field, person }: InputCellProps) {
  const savePerson = useStore((store) => store.savePerson);
  function saveValue(event: React.ChangeEvent<HTMLInputElement>) {
    savePerson({ ...person, [field]: event.target.value });
  }
  return (
    <td className="overflow-hidden text-ellipsis whitespace-nowrap py-2 px-3 text-sm text-gray-500 first:pl-6">
      <input
        type={type}
        aria-label={ariaLabel}
        value={person[field]}
        className="w-full border-none py-1 pl-0"
        onChange={saveValue}
      />
    </td>
  );
}
