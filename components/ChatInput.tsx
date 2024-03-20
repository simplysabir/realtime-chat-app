"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { Input } from "./ui/input";
import { toast } from "sonner";
import {v4 as uuidv4} from "uuid";
import { useUser } from "@/lib/store/user";

const ChatInput = () => {
  const user = useUser((state) => state.user);
  const supabase = supabaseBrowser();
  const handleSendMessage = async (text: string) => {
    const newMessage = {
      id: uuidv4(),
      text,
      send_by: user?.id,
      is_edit: false,
      created_at: new Date().toISOString(),
      users: {
        id: user?.id,
        display_name: user?.user_metadata.user_name,
        avatar_url: user?.user_metadata.avatar_url,
        created_at: new Date().toISOString(),
      }
    };
    const {error} = await supabase.from("messages").insert({text});
    if (error) {
        toast.error(error.message);
    }   
  };
  return (
    <div className="p-5">
      <Input
        placeholder="send message"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSendMessage(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
};

export default ChatInput;
