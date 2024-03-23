"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useRef } from "react";
import { Imessage, useMessage } from "./messages";
import { LIMIT_MESSAGES } from "../constant";

const InitMessages = ({ messages }: { messages: Imessage[] }) => {
  const initState = useRef(false);
  const hasMore = messages.length >= LIMIT_MESSAGES;
  useEffect(() => {
    if (!initState.current) {
      useMessage.setState({ messages, hasMore });
    }
    initState.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default InitMessages;
