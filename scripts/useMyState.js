import { getCurrentRenderData } from "./currentRenderData";

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
const stateChanger = (value, index) => {
  const currentRenderData = getCurrentRenderData();

  currentRenderData.statesOrder[index].value = value;
  return { index, value };
};

const useMyState = (initValue) => {
  const { value: state, index } = dispatcher(initValue);
  const currentRenderData = getCurrentRenderData();

  let changedState = state;

  const setState = (value) => {
    currentRenderData.changeStateOrder.push(stateChanger(value, index));
  };

  return [changedState, setState];
};

export default useMyState;
