"use client";
import { useEffect, useState } from "react";

import Image from "next/image";

import { getCompanions } from "@/actions/getCompanions";
import { ChatDialog } from "./ChatDialog";
import { useChatModal } from "@/hooks/use-chat-modal";

export default function Companion() {
  const chatModal = useChatModal();

  const [CompParam, setCompParam] = useState({
    name: "",
    title: "",
    imageUrl: "",
  });

  const handleClick = () => {
    chatModal.isOpen = true;
  };

  const [examples, setExamples] = useState([
    {
      name: "",
      title: "",
      imageUrl: "",
      llm: "",
      phone: "",
      telegramLink: null,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const companions = await getCompanions();
        let entries = JSON.parse(companions);
        let setme = entries.map((entry: any) => ({
          name: entry.name,
          title: entry.title,
          imageUrl: entry.imageUrl,
          llm: entry.llm,
          phone: entry.phone,
          telegramLink: entry.telegramLink,
        }));
        setExamples(setme);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="ExampleDiv">
      <ChatDialog example={CompParam} />
      <ul
        role="list"
        className="mt-14 m-auto max-w-3xl grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        {examples.map((example, i) => (
          <li
            key={example.name}
            onClick={() => {
              setCompParam(example), handleClick();
            }}
            className="col-span-2 flex flex-col rounded-lg bg-primary/10 text-center shadow relative ring-1 ring-white/10 cursor-pointer  hover:opacity-75 transition border-0 "
          >
            <div className=" absolute -bottom-px left-10 right-10 h-px  text-center text-muted-foreground "></div>
            <div className="flex flex-1 flex-col p-8">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                src={example.imageUrl}
                alt=""
              />
              <h3 className="mt-6 text-sm font-medium ">{example.name}</h3>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only"></dt>
                <dd className="text-sm text-slate-400">
                  {example.title}. Running on <b>{example.llm}</b>.
                </dd>
              </dl>
              <dl className="mt-1 flex flex-grow flex-col justify-between">
                <dt className="sr-only"></dt>
              </dl>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
