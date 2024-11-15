import { useState } from "react";

interface UseArrayInputOptions<T> {
  initialValues?: T[];
}

interface UseArrayInputReturn<T> {
  fields: T[];
  append: (value: T) => void;
  remove: (index: number) => void;
  update: (index: number, value: T) => void;
  replace: (newArray: T[]) => void;
}

function useArrayInput<T>({
  initialValues = [],
}: UseArrayInputOptions<T> = {}): UseArrayInputReturn<T> {
  const [fields, setFields] = useState<T[]>(initialValues);

  const append = (value: T) => {
    setFields(prevFields => [...prevFields, value]);
  };

  const remove = (index: number) => {
    setFields(prevFields => prevFields.filter((_, i) => i !== index));
  };

  const update = (index: number, value: T) => {
    setFields(prevFields =>
      prevFields.map((item, i) => (i === index ? value : item)),
    );
  };

  const replace = (newArray: T[]) => {
    setFields(newArray);
  };

  return { fields, append, remove, update, replace };
}

export default useArrayInput;
