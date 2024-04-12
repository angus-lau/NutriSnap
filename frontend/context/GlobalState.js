import { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const data = {
  description:
    "Cobalt Peppermint Gum contains a mix of artificial sweeteners, flavorings, and additives like aspartame and Brilliant blue FCF, which may lead to allergic reactions in sensitive individuals. It is low in calories due to the presence of sugar alcohols like sorbitol and mannitol, but excessive consumption may cause gastrointestinal discomfort.",
  ingredients:
    "Sorbitol, Gum base, Glycerin, Natural and artificial flavours, Hydrogenated starch hydrolysate, Aspartame, Mannitol, Acesulfame-potassium, Soy lecithin, Brilliant blue FCF",
  name: "Cobalt Peppermint Gum",
  nutrition: {
    carbohydrates: [2, "g"],
    energy: [21, "kcal"],
    fat: [0, 0],
    fiber: [0, "g"],
    proteins: [0, "g"],
    salt: [0, "mg"],
    sodium: [0, "mg"],
    sugars: [0, "g"],
  },
  rating: 3,
  success: true,
  warning:
    "This product contains aspartame and Brilliant blue FCF which may cause allergic reactions in some individuals.",
};

const initialState = {
  pastScans: [data, { ...data }, { ...data }],
  age: undefined,
  weight: undefined,
  dietaryRestrictions: [],
  calorieTarget: undefined,
  isLoggedIn: false,
  theme: "light",
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function addScan(scanInfo) {
    dispatch({
      type: "ADD_SCAN",
      payload: scanInfo,
    });
  }

  const setAge = (age) => {
    dispatch({
      type: "SET_AGE",
      payload: age,
    });
  };

  function setDietaryRestrictions(restrictions) {
    dispatch({
      type: "SET_DIETARY_RESTRICTIONS",
      payload: restrictions,
    });
  }

  function setWeight(weight) {
    dispatch({
      type: "SET_WEIGHT",
      payload: weight,
    });
  }

  function setCalorieTarget(calorieTarget) {
    dispatch({
      type: "SET_CALORIE_TARGET",
      payload: calorieTarget,
    });
  }

  function setLogIn(isLoggedIn) {
    dispatch({
      type: "SET_IS_LOGGED_IN",
      payload: isLoggedIn,
    });
  }

  function toggleTheme() {
    dispatch({
      type: "TOGGLE_THEME",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        theme: state.theme,
        age: state.age,
        weight: state.weight,
        dietaryRestrictions: state.dietaryRestrictions,
        calorieTarget: state.calorieTarget,
        pastScans: state.pastScans,
        setAge,
        setDietaryRestrictions,
        setWeight,
        setCalorieTarget,
        addScan,
        setLogIn,
        toggleTheme,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
