import { createSlice } from "@reduxjs/toolkit";
import sourceCategories from "../rules/data/sourceCategories.json";

console.log("Imported sourceCategories:", sourceCategories);

//state.character.preferences
const preferences = {
  useHomebrewContent: false,
  progressionType: 2,
  encumbranceType: 1,
  ignoreCoinWeight: false,
  hitPointType: 2,
  showUnarmedStrike: false,
  showScaledSpells: true,
  primarySense: 1,
  primaryMovement: 1,
  privacyType: 1,
  sharingType: 2,
  abilityScoreDisplayType: 2,
  enforceFeatRules: true,
  enforceMulticlassRules: true,
  enableOptionalClassFeatures: true,
  enableOptionalOrigins: true,
  enableDarkMode: false,
  enableContainerCurrency: false,
};

console.log("sourceCategories:", sourceCategories);

const initialState = (sourceCategories) => {
  const activeSourceCategories = sourceCategories
    .filter((category) => category.enabledByDefault)
    .map((category) => category.id);

  console.log("sourceCategories in initialState:", sourceCategories);

  console.log(
    "activeSourceCategories in initialState:",
    activeSourceCategories
  );
  return {
    name: "Character",
    preferences,
    activeSourceCategories,
  };
};

const characterSlice = createSlice({
  name: "Character",
  initialState: initialState(sourceCategories),
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    updatePreference: (state, action) => {
      const { preference, value } = action.payload;
      state.preferences[preference] = value;
    },
  },
});

export default characterSlice.reducer;
export const { updateField, updatePreference } = characterSlice.actions;
