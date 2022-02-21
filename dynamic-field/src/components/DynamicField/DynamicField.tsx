import { useCallback, useState } from "react";

import "./styles.css";

type varType = {
  value: string;
  isMath: boolean;
};

export function DynamicField() {
  const [vars, setVars] = useState<Array<varType>>([]);
  const [value, setValue] = useState<varType>({} as varType);

  const handleValidateIfMath = useCallback((value: string) => {
    const regex = /(?:(?:^|[-+_*/])(?:\s*-?\d+(\.\d+)?(?:[eE][+-]?\d+)?\s*))+$/;

    return regex.test(value);
  }, []);

  const handleClearValue = useCallback(() => {
    setValue({
      isMath: false,
      value: "",
    });
  }, []);

  const handleAddVarOnInput = useCallback(
    (e) => {
      if (value.value?.trim() !== "") {
        if (e.key === "Enter" || e.keyCode === 32) {
          if (handleValidateIfMath(value.value)) {
            setVars((prev) => [
              ...prev,
              {
                value: value.value,
                isMath: true,
              },
            ]);

            return handleClearValue();
          }

          setVars((prev) => [
            ...prev,
            {
              value: value.value,
              isMath: false,
            },
          ]);

          handleClearValue();
        }
      }

      if (e.key === "Backspace" && value.value === "") {
        setVars((prev) => prev.slice(0, -1));
      }
    },
    [value]
  );

  const handleRemoveVarOnClickCloseButton = useCallback((index: number) => {
    setVars((prev) => prev.slice(0, index).concat(prev.slice(index + 1)));
  }, []);

  const handleChangeInput = useCallback((value: string) => {
    setValue({
      value,
      isMath: false,
    });
  }, []);

  return (
    <div className="container">
      {vars.map((value, index) => (
        <div className={`badge ${value.isMath && "math"}`} key={index}>
          {value.value}

          <button onClick={() => handleRemoveVarOnClickCloseButton(index)}>
            x
          </button>
        </div>
      ))}

      <input
        onKeyDown={(e) => handleAddVarOnInput(e)}
        value={value.value}
        onChange={(e) => handleChangeInput(e.target.value)}
      />
    </div>
  );
}
