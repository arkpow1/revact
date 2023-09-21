import { getCurrentRenderData } from "./currentRenderData";

const createEffectElement = (callback, deps, currentIndex) => {
  const currentRenderData = getCurrentRenderData();

  const element = {
    calledCallback: callback(),
    deps,
  };

  currentRenderData.effects.push(element);
  currentRenderData.effectIndex = currentIndex;
  return { value: element, index: currentIndex };
};

const updateEffectElement = (callback, deps, currentIndex) => {
  const currentRenderData = getCurrentRenderData();

  const element = {
    calledCallback: callback(),
    deps,
  };
  currentRenderData.effects[currentIndex] = element;
  currentRenderData.effectIndex = currentIndex;

  return element;
};

const effectDispatcher = (callback, deps) => {
  const currentRenderData = getCurrentRenderData();
  // const isFirstMount = currentRenderData.isFirstMount;

  const { effectIndex, effects } = currentRenderData;
  const currentIndex = effectIndex === null ? 0 : effectIndex + 1;

  if (effects.length === 0) {
    return createEffectElement(callback, deps, currentIndex);
  } else {
    if (effects[currentIndex] === undefined) {
      return createEffectElement(callback, deps, currentIndex);
    } else {
      for (let i = 0; i < deps.length; i++) {
        if (deps[i] !== currentRenderData.effects[currentIndex].deps[i]) {
          if (
            typeof currentRenderData.effects[currentIndex].calledCallback ===
            "function"
          ) {
            currentRenderData.effects[currentIndex].calledCallback();
          }
          return updateEffectElement(callback, deps, currentIndex);
        }
      }
      currentRenderData.effectIndex = currentIndex;
    }
  }
};

const useKekffeсt = (callback, deps) => {
  effectDispatcher(callback, deps);
};

export default useKekffeсt;
