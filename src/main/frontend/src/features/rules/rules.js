import { createSlice } from '@reduxjs/toolkit';
import sourceCategories from './data/sourceCategories.json';
import sources from './data/sources.json';


const ruleDataSlice = createSlice({
    name: 'ruleData',
    initialState: {
        sourceCategories: sourceCategories,
        sources: sources,
    },
    reducers: {}, // No reducers needed for ruleData
});

export default ruleDataSlice.reducer;
export const selectSourceCategories = (state) => state.rules.sourceCategories;
export const selectSources = (state) => state.rules.sources;
