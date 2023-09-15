import {
  changeCurrentRenderData,
  getCurrentRenderData,
  resetRenderData,
} from "./currentRenderData";
import { map } from "./index";
import insertToRoot from "./insertToRoot";

let asyncChanges = [];

export const forceRender = (component, forceData) => {
  asyncChanges.push(forceData);

  const stringifiedTest = JSON.stringify(asyncChanges);

  setTimeout(() => {
    const isEqual = stringifiedTest === JSON.stringify(asyncChanges);

    if (isEqual) {
      const newCurrentRenderData =
        map.get(component) || currentRenderDataTemplate;

      asyncChanges.forEach(([index, value]) => {
        newCurrentRenderData.statesOrder[index].value = value;
      });

      const newValue = {
        ...newCurrentRenderData,
        index: null,
        changeStateOrder: [],
        effectIndex: null,
      };
      changeCurrentRenderData(newValue);

      map.set(component, newValue);
      const componentReturnedData = component();

      insertToRoot(componentReturnedData);
      resetRenderData();
      asyncChanges = [];
      return componentReturnedData;
    }
  }, 0);
};

const render = (component) => {
  const currentRenderDataTemplate = {
    statesOrder: [],
    index: null,
    changeStateOrder: [],
    effects: [],
    effectIndex: null,
    component,
  };

  const newCurrentRenderData = map.get(component) || currentRenderDataTemplate;

  const currentRenderData = changeCurrentRenderData(newCurrentRenderData);

  const componentReturnedData = component();

  const newValue = {
    ...currentRenderData,
    index: null,
    changeStateOrder: [],
    effectIndex: null,
  };
  map.set(component, newValue);

  insertToRoot(componentReturnedData);

  if (currentRenderData.changeStateOrder.length > 0) {
    // map.set(component, newValue);
    changeCurrentRenderData(newValue);

    render(component);
  }
  resetRenderData();
  return componentReturnedData;
};

export default render;
