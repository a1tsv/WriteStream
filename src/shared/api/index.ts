import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://ht-02-03.vercel.app/" }),
  endpoints: (build) => ({}),
});
