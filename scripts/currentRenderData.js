let currentRenderData = {
  statesOrder: [], // данные хуков по порядку
  index: null, // индекс хука, который обрабатывается в данный момент
  changeStateOrder: [], // изменения за 1 рендер
  effects: [],
  effectIndex: null,
};

export const changeCurrentRenderData = (data) => {
  currentRenderData = data;
};

export const getCurrentRenderData = () => currentRenderData;

export default currentRenderData;
