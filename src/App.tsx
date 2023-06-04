import React, { useState, FormEvent, ChangeEvent } from "react";
import { SwapIcon } from "./icons/Icons";

interface SelectValueProps {
  from: string;
  to: string;
}

const App: React.FC = () => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [inputValue, setInputValue] = useState<number>(0);
  const [selectValue, setSelectValue] = useState<SelectValueProps>({
    from: "decimal",
    to: "binary",
  });

  const handleSwap = () => {
    if (selectValue.from === "decimal") {
      setSelectValue({ from: "binary", to: "decimal" });
    }
    if (selectValue.to === "decimal") {
      setSelectValue({ from: "decimal", to: "binary" });
    }
  };

  const handleConverte = (e: FormEvent, input: number) => {
    e.preventDefault();
    if (selectValue.from === "decimal") {
      if (!input) return "0";

      let binary = "";
      while (input > 0) {
        binary = (input % 2) + binary;
        input = Math.floor(input / 2);
      }
      setOutput(binary);
    } else {
      const inputString = String(input);
      let decimal = 0;

      for (let i = 0; i < inputString.length; i++) {
        const digit = parseInt(inputString[i]);

        if (isNaN(digit) || digit < 0 || digit > 1) {
          setError("Invalid binary number");
        } else {
          setError("");
        }

        decimal = decimal * 2 + digit;
      }

      setOutput(String(decimal));
    }
  };

  const handleCopy = () => {
    if (output) {
      navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  const handleReset = () => {
    setInputValue(0);
    setOutput("");
    setSelectValue({ from: "decimal", to: "binary" });
    setError("");
  };

  console.log(selectValue);

  return (
    <section className=" min-h-screen flex items-center justify-center">
      <div className=" w-fit flex items-center flex-col gap-4 px-8 py-4 rounded-md bg-[#2d2d2d]">
        <div>
          <h1 className=" text-3xl text-white uppercase mb-2 font-bold">
            Converter
            <span className=" text-sm font-normal">by Aram Zadoyan</span>
          </h1>
        </div>
        <form
          className=" w-full flex items-center flex-col gap-4"
          onSubmit={(e) => handleConverte(e, inputValue)}
        >
          <div className=" w-full grid grid-cols-3 gap-4">
            <div className=" flex items-start flex-col gap-2 text-white">
              <p>From</p>
              <div className=" w-full py-2 bg-black flex items-center justify-center rounded-md">
                <p className=" font-semibold uppercase">{selectValue.from}</p>
              </div>
            </div>
            <div className=" flex items-center justify-center">
              <button
                type="button"
                onClick={handleSwap}
                className=" p-2 text-white bg-lime-600 text-2xl rounded-md"
              >
                <SwapIcon />
              </button>
            </div>
            <div className=" flex items-start flex-col gap-2 text-white">
              <p>To</p>
              <div className=" w-full py-2 bg-black flex items-center justify-center rounded-md">
                <p className=" font-semibold uppercase">{selectValue.to}</p>
              </div>
            </div>
          </div>
          <div className=" w-full grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Enter a number"
              className=" px-4 py-1"
              value={!inputValue ? "" : inputValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputValue(Number(e.target.value))
              }
            />
            <button className=" px-4 py-1 rounded-sm uppercase font-medium bg-orange-500 text-white">
              Convert
            </button>
          </div>
          <p className=" text-red-500">{error && error}</p>
          <button
            className=" py-2 w-full rounded-sm bg-red-600 text-white"
            onClick={handleReset}
          >
            Reset
          </button>
        </form>
        <div className=" w-full flex items-start flex-col gap-2">
          <div className=" w-full flex items-center justify-between">
            <p className=" text-white">Output:</p>
            <p
              onClick={handleCopy}
              className=" text-orange-300 cursor-pointer font-semibold"
            >
              {isCopied ? "Copied" : "Copy"}
            </p>
          </div>
          <div className=" w-full p-4 bg-[#9d9d9d] rounded-sm">
            <p className=" text-lg text-green-700 font-semibold tracking-[3px]">
              {selectValue.from === "decimal" && !output
                ? "Ex: 11101001"
                : output
                ? output
                : "Ex: 233"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
