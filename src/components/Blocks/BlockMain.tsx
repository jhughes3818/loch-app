import { useEffect, useState } from "react";
import { RedBadge } from "../Tags";
import CreateBlock from "./CreateBlock";
import axios from "axios";
//import Microlink from "@microlink/react";
const Microlink = require("@microlink/react");

const blocks = [
  {
    title: "Prototypes",
    body: "https://www.figma.com/file/DAPg0HKuwIb7UPHlfLrUub/Education-Team-Board?node-id=0:1&t=dfOBdr0UrcVcJhuW-0",
    tag: "Data",
  },
  {
    title: "Experiment Results",
    body: "https://docs.google.com/spreadsheets/d/17hq1crLLaq0u9u-tjjkPtRRRAzAi3hsRfvq8_Ed7ctw/edit#gid=0",
    tag: "Data",
  },
  {
    title: "Experiment Results",
    body: "Link to Metabase report",
    tag: "Data",
  },
  {
    title: "Experiment Results",
    body: "Link to Metabase report",
    tag: "Data",
  },
  {
    title: "Experiment Results",
    body: "Link to Metabase report",
    tag: "Data",
  },
];

export default function BlockMain(props: any) {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (props.session) {
      console.log(props.session.user);
      axios.get(`/api/get-notes/${props.session.user.id}`).then((response) => {
        setNotes(response.data);
      });
    }
  }, [props.session]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <div className="gap-2">
          {blocks.map((block) => (
            <div className="my-2 h-36 w-96 rounded-md border border-gray-200 bg-white p-5 shadow-md">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">{block.title}</h1>
                <RedBadge text={block.tag} />
              </div>
              <div className="py-2">
                <Microlink url={block.body} size="small" media="logo" />
              </div>
              {/* <p>{block.body}</p> */}
            </div>
          ))}
        </div>
        <div>
          <CreateBlock session={props.session} />
        </div>
      </div>
    </>
  );
}
