import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import React from "react";
import Head from "next/head";
interface PageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}
function classNames(...classes: (string | false | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const Page = React.memo(function Page({
  title,
  description,
  children,
}: PageProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </Head>
      <div className="min-h-full">
        <div className="bg-gray-800 pb-28">
          <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
              <>
                <div className="mx-auto max-w-xl sm:px-6 lg:px-8">
                  <div className="border-b border-gray-700">
                    <div className="flex h-12 items-center justify-between px-4 sm:px-0">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 font-extrabold text-white">
                          {title}
                        </div>
                      </div>
                      <div className="ml-4 flex items-center md:ml-6">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              amit@bansil.org
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    Log Out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>

        <main className="-mt-28">
          <div className="mx-auto max-w-xl px-4 pb-12 sm:px-6 lg:px-8">
            <div className="rounded-lg bg-white px-5 py-6 shadow sm:px-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </>
  );
});
export const PlaceholderPanel = React.memo(function PlaceholderPanel() {
  return (
    <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
  );
});
interface ModalProps {
  initialFocusRef?: React.RefObject<HTMLElement>;
  onClose: () => void;
  children: React.ReactNode;
}
export const Modal = React.memo(function Modal({
  initialFocusRef,
  onClose,
  children,
}: ModalProps) {
  return (
    <Transition.Root show={true} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={initialFocusRef}
        onClose={onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
});
interface FormGroupProps {
  label: React.ReactNode;
  id: string;
  children: (props: any) => React.ReactNode;
}
export const FormGroup = React.memo(
  React.forwardRef(function FormGroup(
    { label, id, children }: FormGroupProps,
    ref
  ) {
    return (
      <div className="relative rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600">
        <label
          htmlFor={id}
          className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          {label}
        </label>
        {children({
          id,
          ref,
          className:
            "block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm",
        })}
      </div>
    );
  })
);
interface PushButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: "primary" | "tertiary";
}
export const PushButton = React.memo(function PushButton({
  className,
  onClick,
  children,
  style = "primary",
}: PushButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "inline-flex justify-center rounded-md border   px-4 py-2 text-sm font-medium text-white  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        style === "tertiary"
          ? "border-gray-300 bg-white text-base  text-gray-700 hover:bg-gray-50"
          : "border-transparent bg-indigo-600 shadow-sm",
        className
      )}
    >
      {children}
    </button>
  );
});
interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}
export const TableHeader = React.memo(function TableHeader({
  children,
  className,
}: TableHeaderProps) {
  return (
    <th
      scope="col"
      className={classNames(
        "px-3 pb-1.5 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
        className
      )}
    >
      {children}
    </th>
  );
});

interface LinkButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  style?: "primary" | "danger";
}
export const LinkButton = React.memo(function LinkButton({
  children,
  onClick,
  className,
  style = "primary",
}: LinkButtonProps) {
  return (
    <button
      className={classNames(
        style === "primary" ? "text-indigo-600" : "text-red-600",
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
});
