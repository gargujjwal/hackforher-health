import { ChatMessasgeResponseDto } from "@/types/backend-stubs";

type Props = { message: ChatMessasgeResponseDto; isDoctor: boolean };

function ChatMessage({ message, isDoctor }: Props) {
  return (
    <div
      className={`flex w-full ${isDoctor ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`max-w-[70%] ${isDoctor ? "order-2" : "order-1"}`}>
        <div
          className={`mb-1 flex items-center gap-2 ${isDoctor ? "justify-end" : "justify-start"}`}
        >
          <span className="text-sm font-semibold text-textSecondary">
            {isDoctor ? "Doctor" : "Patient"}
          </span>
        </div>
        <div
          className={`rounded-lg p-3 ${
            isDoctor
              ? "bg-primary text-textPrimary"
              : "bg-cardBackground text-textSecondary"
          }`}
        >
          <p className="text-sm">{message.message}</p>
          <span className="mt-1 block text-xs opacity-70">
            {new Date(message.sentAt).toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
