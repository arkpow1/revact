let currentRenderData = {
  statesOrder: [], // данные хуков по порядку
  index: null, // индекс хука, который обрабатывается в данный момент
  changeStateOrder: [], // изменения за 1 рендер
  effects: [],
  effectIndex: null,
  component: null,
};

export const changeCurrentRenderData = (data) => {
  return Object.assign(currentRenderData, data);
};

export const getCurrentRenderData = () => currentRenderData;

export const resetRenderData = () => {
  Object.assign(currentRenderData, {
    statesOrder: [],
    index: null,
    changeStateOrder: [],
    effects: [],
    effectIndex: null,
    component: null,
  });
};

// const renderData = {
//   currentRenderData: {
//     statesOrder: [], // данные хуков по порядку
//     index: null, // индекс хука, который обрабатывается в данный момент
//     changeStateOrder: [], // изменения за 1 рендер
//     effects: [],
//     effectIndex: null,
//   },
//   changeCurrentRenderData(data) {
//     Object.assign(data, this.currentRenderData);
//   },
//   getCurrentRenderData() {
//     return this.getCurrentRenderData;
//   },
// };

export default currentRenderData;
