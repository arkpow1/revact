import App, { ExampleComponent } from "../App";
import {
  changeCurrentRenderData,
  getCurrentRenderData,
  resetRenderData,
} from "./currentRenderData";
import { map } from "./index";
import insertToRoot from "./insertToRoot";

let asyncChanges = [];
const renderStream = [];

const getTemplateByComponent = (component) => ({
  statesOrder: [],
  index: null,
  changeStateOrder: [],
  effects: [],
  effectIndex: null,
  component,
  isFirstMount: true,
});

const lostRenderResultMap = new Map();

export const forceRender = (component, forceData) => {
  forceData && asyncChanges.push(forceData);

  const stringifiedTest = JSON.stringify(asyncChanges);

  setTimeout(() => {
    const isEqual = stringifiedTest === JSON.stringify(asyncChanges);

    if (isEqual || !forceData) {
      const newCurrentRenderData =
        map.get(component) || getTemplateByComponent(component);

      asyncChanges.forEach(([index, value]) => {
        if (typeof value === "function") {
          const prevValue = newCurrentRenderData.statesOrder[index].value;
          newCurrentRenderData.statesOrder[index].value = value(prevValue);
          // return;
        } else {
          newCurrentRenderData.statesOrder[index].value = value;
        }
      });

      const newValue = {
        ...newCurrentRenderData,
        index: null,
        changeStateOrder: [],
        effectIndex: null,
        isFirstMount: false,
        component: component,
      };
      changeCurrentRenderData(newValue);

      const componentReturnedData = component();

      map.set(component, newValue);

      lostRenderResultMap.set(component, componentReturnedData);

      App();

      resetRenderData();
      asyncChanges = [];

      return componentReturnedData;
    }
  }, 0);
};

const render = (component, options) => {
  // console.log(component.name, getCurrentRenderData().component?.name);

  if (
    getCurrentRenderData().component &&
    component !== getCurrentRenderData().component
  ) {
    renderStream.push(component);
    console.log(component.name);
    const value = lostRenderResultMap.get(component);
    console.log(lostRenderResultMap);

    return "";
  }

  const newCurrentRenderData =
    map.get(component) || getTemplateByComponent(component);

  changeCurrentRenderData(newCurrentRenderData);

  const componentReturnedData = component();

  const newValue = {
    ...getCurrentRenderData(),
    index: null,
    changeStateOrder: [],
    effectIndex: null,
    isFirstMount: false,
    component: component,
  };

  // if (component.name === "ExampleComponent") {
  //   console.log("newValue", newValue, getCurrentRenderData());
  // }

  map.set(component, newValue);

  if (options?.isRoot) {
    insertToRoot(componentReturnedData);
  }

  if (getCurrentRenderData().changeStateOrder.length > 0) {
    changeCurrentRenderData(newValue);

    return render(component);
  }
  resetRenderData();

  if (renderStream.length > 0) {
    const firstElem = renderStream[0];

    renderStream.shift();

    return render(firstElem);
  }

  return componentReturnedData;
};

export const renderController = (component, options) => {
  const isAsyncCall = getCurrentRenderData().component === null;

  const { index, value } = options;

  if (isAsyncCall) {
    forceRender(component, [index, value]);
  }

  if (!isAsyncCall) {
    let newValue = value;
    if (typeof value === "function") {
      const prevValue = getCurrentRenderData().statesOrder[index].value;
      newValue = value(prevValue);
      getCurrentRenderData().statesOrder[index].value = newValue;
    }
    getCurrentRenderData().statesOrder[index].value = newValue;
  }
};

export default render;
