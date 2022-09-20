import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const URL = process.env.REACT_APP_PROTOCOL + '://' + process.env.REACT_APP_API_HOST;

const headers = {
  'content-type': 'application/json',
  'x-rapidapi-host': `${process.env.REACT_APP_API_HOST}`,
  'x-rapidapi-key': `${process.env.REACT_APP_X_API_RAPID_API_KEY}`,
};

const params = {
  'api-version': '3.0',
  profanityAction: `NoAction`,
  textType: `plain`,
};

export interface TranslateQuery {
  text: string;
  to: string;
}

export const TranslateAPI = createApi({
  reducerPath: 'TranslateAPI',
  baseQuery: fetchBaseQuery({ baseUrl: URL }),
  tagTypes: ['Translate'],
  endpoints: (build) => ({
    fetchTranslate: build.query<string, TranslateQuery>({
      query: (query: TranslateQuery) => ({
        url: `/translate`,
        method: 'POST',
        headers,
        params: { ...params, to: query.to },
        body: [{ Text: query.text }],
      }),
      transformResponse: (res: { translations: { text: string }[] }[]) => res[0]?.translations[0]?.text,
    }),
  }),
});
