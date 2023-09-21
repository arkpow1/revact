import { render } from "./scripts";
import { useMyState, useKekffeсt } from "./scripts";
import { getCurrentRenderData } from "./scripts/currentRenderData";
import mapJoin from "./scripts/mapJoin";

const useCustomHook = () => {
  const [kek, setKek] = useMyState(0);
  const [kek2, setKek2] = useMyState(100);

  const [sync, setSync] = useMyState(0);

  return { kek, setKek, kek2, setKek2, sync, setSync };
  //   const { kek, setKek, kek2, setKek2, sync, setSync } = useCustomHook();
};

const SmallComponent = () => {
  const [smallState, setSmallState] = useMyState(0);

  useKekffeсt(() => {
    // TODO: разобраться с состояниями вложенных компонентов

    setTimeout(() => {
      setSmallState(5);
    }, 1500);
  }, ["small"]);

  return `<div>i am small component, my state is ${smallState}</div>`;
};

export const ExampleComponent = () => {
  const [users, setUsers] = useMyState([]);
  const [isLoading, setIsLoading] = useMyState(true);

  const getUsers = async () => {
    const usersResponse = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );
    const usersData = await usersResponse.json();

    setUsers(usersData);
    setIsLoading(false);
  };

  useKekffeсt(() => {
    setTimeout(() => {
      getUsers();
    }, 1000);
  }, ["example"]);

  if (isLoading) {
    return `<h3>Loading...</h3>`;
  }

  const small = render(SmallComponent);

  return `<div>
            ${small}
            <h1>USERS LIST</h1>
            <ul>${mapJoin(
              users.map((item) => {
                return `<li>${item.name}</li>`;
              })
            )}
            </ul>
          </div>`;
};

// типа корневой "компонент"
const App = () => {
  return render(ExampleComponent, { isRoot: true });
};

//

export default App;
