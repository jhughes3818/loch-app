import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { RedBadge, GreenBadge, BlueBadge } from "../Tags";
import axios from "axios";

const people = [
  { id: 1, name: <RedBadge text="Data" /> },
  { id: 2, name: <GreenBadge text="Code" /> },
  { id: 3, name: <BlueBadge text="Decision" /> },
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function CreateBlock(props: any) {
  const [selected, setSelected] = useState(people[2]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const saveNote = () => {
    console.log(title);
    axios
      .post("/api/save-note", {
        title: title,
        body: body,
        tag: selected?.name.props.text,
        user: props.session.user,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <div className="my-2 h-36 w-96 rounded-md border border-gray-200 bg-white p-5 shadow-md">
      <div className="flex justify-between">
        <input
          className="w-40 text-2xl font-bold focus:border focus:border-transparent focus:ring-0"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                  <span className="block truncate">{selected?.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person) => (
                      <Listbox.Option
                        key={person.id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600 text-white"
                              : "text-gray-900",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={classNames(
                                selected ? "font-semibold" : "font-normal",
                                "block truncate"
                              )}
                            >
                              {person.name}
                            </span>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>

      <input
        onChange={(e) => setBody(e.target.value)}
        placeholder="Description"
      ></input>
      <button
        onClick={() => saveNote()}
        className="mt-2 block items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Save
      </button>
    </div>
  );
}
