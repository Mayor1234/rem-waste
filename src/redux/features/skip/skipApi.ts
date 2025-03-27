import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Skip } from './types';

export const skipApi = createApi({
  reducerPath: 'skipApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' https://app.wewantwaste.co.uk/api' }),
  tagTypes: ['Skip'],
  endpoints: (builder) => ({
    getSkip: builder.query<Skip[], { postcode: string; area: string }>({
      query: ({ postcode, area }) =>
        `/skips/by-location?postcode=${postcode}&area=${area}`,
      serializeQueryArgs: ({ endpointName }) => endpointName,

      providesTags: ['Skip'],
    }),
  }),
});

export const { useGetSkipQuery } = skipApi;
export default skipApi;
