import { render } from "./scripts";
import { useMyState, useKekffeсt } from "./scripts";

const useCustomHook = () => {
  const [kek, setKek] = useMyState(1);
  const [kek2, setKek2] = useMyState(100);

  return { kek, setKek, kek2, setKek2 };
};

const ExampleComponent = () => {
  const { kek, setKek, kek2, setKek2 } = useCustomHook();

  // const setValue = async () => {
  //   const test = await fetch(
  //     `https://jsonplaceholder.typicode.com/todos/${kek}`
  //   );
  //   const response = await test.json();

  //   setTimeout(() => {
  //     setKek(kek + 1);
  //     setKek2(JSON.stringify(response));
  //   }, 1000);
  // };

  if (kek2 < 105) {
    setTimeout(() => {
      setKek(kek + 1);
      setKek2(kek2 + 1);
    }, 1000);
  }

  console.log("render");

  return `<div>kek is ${kek}, kek2 is ${kek2}</div>`;
};

const SecondExampleComponent = () => {
  const [second, setSecond] = useMyState(null);

  useKekffeсt(() => {
    setSecond("hey");
  }, []);

  console.log("SecondExampleComponent render", second);
};

// типа корневой "компонент"
const App = () => {
  const ExampleClone = ExampleComponent.bind(this);

  return render(ExampleComponent);
};

//

export default App;
