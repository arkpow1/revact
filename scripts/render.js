import {
  changeCurrentRenderData,
  getCurrentRenderData,
  resetRenderData,
} from "./currentRenderData";
import { map } from "./index";
import insertToRoot from "./insertToRoot";

const render = (component, forceData = null) => {
  const currentRenderDataTemplate = {
    statesOrder: [],
    index: null,
    changeStateOrder: [],
    effects: [],
    effectIndex: null,
    component,
  };
  const newCurrentRenderData = map.get(component) || currentRenderDataTemplate;
  if (forceData) {
    const [index, value] = forceData;

    newCurrentRenderData.statesOrder[index].value = value;

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
    return componentReturnedData;
  }

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
