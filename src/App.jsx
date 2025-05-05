import { useState, useCallback, useRef, useEffect } from "react";

function App() {
  let [length, setLength] = useState(8);
  let [charAllowed, setCharAllowed] = useState(false);
  let [numAllowed, setNumAllowed] = useState(false);
  let [password, setPassword] = useState("");
  let char = "";
  let passref = useRef();

  const passgen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (charAllowed) {
      str = str + "~!@#$%^&*";
    }

    if (numAllowed) {
      str = str + "0123456789";
    }

    console.log(str);
    for (let i = 0; i < length; i++) {
      char = Math.floor(Math.random() * str.length);
      pass = pass + str[char];
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed]);
  useEffect(() => {
    passgen();
  }, [length, charAllowed, numAllowed]);
  let copypass = useCallback(() => {
    window.navigator.clipboard.writeText(password);
    passref.current?.select();
  }, [password]);

  return (
    <>
      <div className=" flex justify-center m-10 ">
        <div className=" bg-gray-600 w-max sm:w-5xl  rounded-2xl p-5 ">
          <h1 className=" text-center text-4xl text-amber-50 mb-10">
            Password generator
          </h1>

          <div className=" flex justify-center ">
            <input
              type="text"
              readOnly
              value={password}
              placeholder="Password"
              ref={passref}
              className=" bg-amber-50 w-72 md:w-2xl h-10 rounded-l-2xl px-5"
            />
            <button
              onClick={copypass}
              className=" bg-blue-500 text-amber-50 cursor-pointer hover:bg-blue-600 h-10 w-20 rounded-r-2xl"
            >
              Copy
            </button>
          </div>
          <div className="container flex flex-col md:flex md:flex-row  items-center justify-around px-10 gap-5 md:gap-10 mt-5">
            <div className=" md:my-10 gap-3 items-center flex ">
              <input
                type="range"
                className=" cursor-pointer"
                value={length}
                onChange={(e) => {
                  setLength(e.target.value);
                }}
                min={8}
                max={100}
              />
              <div className=" text-amber-50"> Length: {length}</div>
            </div>
            <div className=" flex justify-center items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                onChange={() => {
                  setNumAllowed((prev) => !prev);
                }}
                name="numberAllowed"
              />
              <label htmlFor="numberAllowed" className=" text-amber-50">
                Include Numbers
              </label>
            </div>
            <div className=" flex justify-center items-center gap-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
                name="charAllowed"
              />
              <label htmlFor="charAllowed" className=" text-amber-50">
                Include characters
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
