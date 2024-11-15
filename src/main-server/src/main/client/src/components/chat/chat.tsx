import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import { Input } from "@nextui-org/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";

import ChatMessage from "./chat-message";

import { sendMessage } from "@/react-query/mutations";
import { getUserChatMessages } from "@/react-query/queries";
import { ChatMessageCreationDto } from "@/types/backend-stubs";
import { useAuthenticatedUser } from "@/contexts/auth-context";

type Props = { doctorAssignmentId: number };

function Chat({ doctorAssignmentId }: Props) {
  const { user } = useAuthenticatedUser();
  const { control, handleSubmit, reset } = useForm<ChatMessageCreationDto>({
    defaultValues: { senderRole: user.role, message: "" },
  });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const { data: messages = [], isLoading } = useQuery(
    getUserChatMessages(doctorAssignmentId),
  );
  const sendMessageMutation = useMutation({
    ...sendMessage(doctorAssignmentId),
    onSuccess() {
      reset({ message: "", senderRole: user.role });
    },
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Card className="h-[600px] w-full bg-background">
      <CardBody className="flex flex-col p-4">
        {/* Messages Container */}
        <div className="mb-4 flex-grow space-y-2 overflow-y-auto">
          {isLoading ? (
            <div className="flex h-full items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-primary" />
            </div>
          ) : (
            <>
              {messages.reverse().map(message => (
                <ChatMessage
                  key={message.id}
                  isDoctor={message.senderRole === "DOCTOR"}
                  message={message}
                />
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Message Input */}
        <form
          className="flex gap-2"
          onSubmit={handleSubmit(data => sendMessageMutation.mutate(data))}
        >
          <Controller
            control={control}
            name="message"
            render={({ fieldState, field: { value, onChange } }) => (
              <Input
                fullWidth
                disabled={sendMessageMutation.isPending}
                errorMessage={fieldState.error?.message}
                isInvalid={fieldState.invalid}
                placeholder="Type your message..."
                size="lg"
                value={value}
                variant="bordered"
                onValueChange={onChange}
              />
            )}
          />
          <Button
            isIconOnly
            className="aspect-square"
            color="primary"
            isLoading={sendMessageMutation.isPending}
            type="submit"
          >
            <IoSend className="text-textPrimary" size={20} />
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}

export default Chat;
