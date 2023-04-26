import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    preferences: {
        useHomebrewContent: true,
        progressionType: 2,
        encumbranceType: 1,
        ignoreCoinWeight: false,
        hitPointType: 2,
        showUnarmedStrike: false,
        showScaledSpells: true,
        primarySense: 5,
        primaryMovement: 1,
        privacyType: 3,
        sharingType: 2,
        abilityScoreDisplayType: 2,
        enforceFeatRules: true,
        enforceMulticlassRules: true,
        enableOptionalClassFeatures: true,
        enableOptionalOrigins: true,
        enableDarkMode: false,
        enableContainerCurrency: false,
    },
};

const characterSlice = createSlice({
    name: 'form',
    initialState,
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

export const { updateField, updatePreference } = characterSlice.actions;
export default characterSlice.reducer;
