"use client";

import { useEffect, useState } from "react";
import { useCompletion } from "ai/react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { useChatModal } from "@/hooks/use-chat-modal";
import { Input } from "./ui/input";
import { responseToChatBlocks } from "./ChatBlock";

export const ChatDialog = ({ example }: { example: any }) => {
  const chatModal = useChatModal();
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!example) {
    // create a dummy so the completion doesn't croak during init.
    example = new Object();
    example.llm = "";
    example.name = "";
  }

  let [blocks, setBlocks] = useState<any[] | null>(null);

  let {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    stop,
    setInput,
    setCompletion,
  } = useCompletion({
    api: "/api/" + example.llm,
    headers: { name: example.name },
  });

  useEffect(() => {
    // When the completion changes, parse it to multimodal blocks for display.
    if (completion) {
      setBlocks(responseToChatBlocks(completion));
    } else {
      setBlocks(null);
    }
  }, [completion]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={chatModal.isOpen} onOpenChange={chatModal.onClose}>
      <DialogContent>
        <DialogHeader className="space-y-4">
          <DialogDescription className="text-center space-y-2">
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="How's your day?"
                value={input}
                onChange={handleInputChange}
                className="w-full mt-4 flex-auto rounded-md border-1 focus:ring-1 bg-white/5 px-3.5 py-2  focus:outline-none sm:text-sm sm:leading-6 "
                disabled={isLoading && !blocks}
              />
            </form>
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between">
          <p className="text-sm font-medium">Chat with {example.name}</p>
        </div>

        {blocks && <div className="mt-2">{blocks}</div>}

        {isLoading && !blocks && (
          <p className="flex items-center justify-center mt-4">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
