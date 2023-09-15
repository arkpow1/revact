import { getCurrentRenderData } from "./currentRenderData";
import render from "./render";
import { forceRender } from "./render";

// диспетчер хуков
const dispatcher = (initValue) => {
  const currentRenderData = getCurrentRenderData();
  const { statesOrder, index } = currentRenderData;
  const currentIndex = index === null ? 0 : index + 1;

  if (statesOrder.length === 0) {
    const element = {
      value: initValue,
      index: currentIndex,
    };

    statesOrder.push(element);
    currentRenderData.index = currentIndex;
  } else if (statesOrder.length > 0) {
    if (statesOrder[currentIndex] === undefined) {
      const element = {
        value: initValue,
        index: currentIndex,
      };
      statesOrder.push(element);
    }
    currentRenderData.index = currentIndex;
  }

  return currentRenderData.statesOrder[currentIndex];
};

// функция изменяет данные в четко определенном хуке
function stateChanger(value, index, component) {
  if (getCurrentRenderData().component === null) {
    // для форс рендера проверка на функцию происходит в render
    forceRender(component, [index, value]);
  } else {
    let newValue = value;
    if (typeof value === "function") {
      const prevValue = getCurrentRenderData().statesOrder[index].value;
      newValue = value(prevValue);
      getCurrentRenderData().statesOrder[index].value = newValue;
      return { index, value: newValue };
    }
    getCurrentRenderData().statesOrder[index].value = newValue;
    return { index, value: newValue };
  }
}

const useMyState = (initValue) => {
  const { value: state, index } = dispatcher(initValue);
  const currentRenderData = getCurrentRenderData();
  const component = currentRenderData.component;

  let changedState = state;

  const setState = (value) => {
    currentRenderData.changeStateOrder.push(
      stateChanger(value, index, component)
    );
  };

  return [changedState, setState];
};

export default useMyState;
