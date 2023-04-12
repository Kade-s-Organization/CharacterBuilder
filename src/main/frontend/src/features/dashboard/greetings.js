import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const greetingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGreetings: builder.query({
            query: () => `/api/v1/greetings?timestamp=${Date.now()}`
        }),
    }),
});

export const { useGetGreetingsQuery } = greetingsApiSlice;
export const { getGreetings } = greetingsApiSlice.endpoints.getGreetings.initiate;