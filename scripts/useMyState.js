import {
  changeCurrentRenderData,
  getCurrentRenderData,
} from "./currentRenderData";
import render, { renderController } from "./render";
import { forceRender } from "./render";

// диспетчер хуков
const dispatcher = (initValue) => {
  const currentRenderData = getCurrentRenderData();

  const { statesOrder, index } = currentRenderData;
  const currentIndex = index === null ? 0 : index + 1;

  // const copy = { ...getCurrentRenderData() };

  if (getCurrentRenderData().statesOrder.length === 0) {
    const element = {
      value: initValue,
      index: currentIndex,
    };

    // if ({ ...getCurrentRenderData() }.component.name === "SmallComponent") {
    //   console.log("hello", JSON.parse(JSON.stringify(getCurrentRenderData())));
    // }

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
    changeCurrentRenderData({ ...getCurrentRenderData(), index: currentIndex });
    currentRenderData.index = currentIndex;
  }

  return currentRenderData.statesOrder[currentIndex];
};

const useMyState = (initValue) => {
  const { value: state, index } = dispatcher(initValue);

  const currentRenderData = getCurrentRenderData();
  const component = currentRenderData.component;

  let changedState = state;

  const setState = (value) => {
    renderController(component, { value, index });
    currentRenderData.changeStateOrder.push(true);
  };

  return [changedState, setState];
};

export default useMyState;
