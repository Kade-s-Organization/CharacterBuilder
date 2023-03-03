import { createSlice } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api";

const greetingsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getGreetings: builder.query({
            query: () => "/api/v1/greetings",
        }),
    }),
});

export const { useGetGreetingsQuery } = greetingsApiSlice;