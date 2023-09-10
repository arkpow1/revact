import { render } from "./scripts";
import { useMyState, useKekffeсt } from "./scripts";

const useCustomHook = () => {
  const [kek, setKek] = useMyState(1);
  const [kek2, setKek2] = useMyState(10);

  return { kek, setKek, kek2, setKek2 };
};

const ExampleComponent = () => {
  const { kek, setKek, kek2, setKek2 } = useCustomHook();

  if (kek < 5) {
    setKek(kek + 1);
  } else if (kek2 < 15) {
    setKek2(kek2 + 1);
  }

  useKekffeсt(() => {
    console.log("kek FIRST in body", kek);

    return () => {
      console.log("kek FIRST in return", kek);
    };
  }, [kek]);

  useKekffeсt(() => {
    console.log("kek2 SECOND in body", kek2);

    return () => {
      console.log("kek2 SECOND in return", kek2);
    };
  }, [kek2]);

  return null;
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
  const ExampleClone = ExampleComponent.bind(this); // создаю копию функции ExampleComponent
  // рендер - синхронная операция
  render(ExampleComponent); // сначала рендерится этот (состояние запоминается в мапе)
  render(SecondExampleComponent); // потом этот (состояние запоминается в мапе)
  render(ExampleClone); // потом рендерится клон (у него рендер начинается с начала)
};

export default App;
