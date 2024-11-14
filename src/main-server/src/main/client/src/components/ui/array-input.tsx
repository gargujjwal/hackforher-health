import {Button} from "@nextui-org/button";
import {Input} from "@nextui-org/input";
import {FaPlus} from "react-icons/fa";
import {IoIosRemoveCircle} from "react-icons/io";

type Props = {
  classNames?: { container?: string };
  label: string;
  placeholder: string;
  fields: string[];
  append: (value: string) => void;
  remove: (index: number) => void;
  update: (index: number, value: string) => void;
};

function ArrayInput({
                      classNames,
                      label,
                      append,
                      remove,
                      update,
                      fields,
                      placeholder,
                    }: Props) {
  return (
      <div className={`space-y-2 ${classNames?.container ?? ""}`}>
        <div className="flex items-center justify-between">
          <div className="block text-sm font-medium text-gray-700">{label}</div>
          <Button
              className="text-textPrimary dark:text-textSecondary"
              color="secondary"
              size="sm"
              startContent={<FaPlus/>}
              onClick={() => append("")}
          >
            Add {label}
          </Button>
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
              <div
                  key={index}
                  className="animate-fadeIn group flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <Input
                      placeholder={placeholder}
                      type="text"
                      value={field}
                      onChange={e => update(index, e.target.value)}
                  />
                </div>
                <Button isIconOnly color="danger" onClick={() => remove(index)}>
                  <IoIosRemoveCircle/>
                </Button>
              </div>
          ))}
        </div>

        {fields.length === 0 && (
            <div
                className="rounded-md border-2 border-dashed border-gray-200 bg-gray-50 py-4 text-center text-sm text-gray-500">
              No {label.toLowerCase()} added yet. Click the button above to add one.
            </div>
        )}
      </div>
  );
}

export default ArrayInput;
