import { render } from "./scripts";
import { useMyState, useKekffeсt } from "./scripts";

const useCustomHook = () => {
  const [kek, setKek] = useMyState(0);
  const [kek2, setKek2] = useMyState(100);

  const [sync, setSync] = useMyState(0);

  return { kek, setKek, kek2, setKek2, sync, setSync };
};

const ExampleComponent = () => {
  const { kek, setKek, kek2, setKek2, sync, setSync } = useCustomHook();

  useKekffeсt(() => {
    if (kek < 15) {
      setTimeout(() => {
        setKek((prev) => prev + 1);
        setKek2((prev) => prev + 1);
      }, 1000);
    }
  }, [kek, kek2]);

  if (sync < 5) {
    setSync((prev) => prev + 1);
  }

  console.log("render");

  return `<div>kek is ${kek}, kek2 is ${kek2}, sync is ${sync}</div>`;
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
