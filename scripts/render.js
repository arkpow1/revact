import {
  changeCurrentRenderData,
  getCurrentRenderData,
} from "./currentRenderData";
import { map } from "./index";

// функция рендера компонента
const render = (component) => {
  const currentRenderDataTemplate = {
    statesOrder: [],
    index: null,
    changeStateOrder: [],
    effect: null,
    effects: [],
    effectIndex: null,
  };

  const newCurrentRenderData = map.get(component) || currentRenderDataTemplate;
  changeCurrentRenderData(newCurrentRenderData);
  const currentRenderData = getCurrentRenderData();

  // сам рендер компонента
  component();

  // проверка на наличие изменений после рендера
  if (currentRenderData.changeStateOrder.length > 0) {
    const newValue = {
      ...currentRenderData,
      index: null,
      changeStateOrder: [],
      effectIndex: null,
    };

    map.set(component, newValue);
    changeCurrentRenderData(newValue);
    // рекурсивно запускаем еще один рендер, если были изменения
    render(component);
  }
};

export default render;
