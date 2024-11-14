import {FaBug} from "react-icons/fa";

type Props = { message?: string };

function FormError({message}: Props) {
  return message ? (
      <div className="flex flex-col items-center gap-3 rounded-md border-2 border-red-600 p-4">
        <FaBug className="size-8 text-red-600"/>
        <div className="space-y-2">
          <details open>
            <summary className="font-semibold">Error</summary>
            <p>{message}</p>
          </details>
        </div>
      </div>
  ) : null;
}

export default FormError;
