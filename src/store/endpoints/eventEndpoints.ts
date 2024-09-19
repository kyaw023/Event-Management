import {
  ApiResponse,
  EventDetailResponse,
  RegisterEventResponse,
  SearchEventsResponse,
} from "../../types/event.types";
import { ApiService } from "../services/ApiService";

const EventEndpoints = ApiService.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query<ApiResponse, number | void>({
      query: (page = 1) => ({
        url: `/events?page=${page}`,
        method: "GET",
      }),
    }),
    getSingleEvent: builder.query<EventDetailResponse, number>({
      query: (id) => ({
        url: `/event/${id}`,
        method: "GET",
      }),
    }),
    getRegisterEvent: builder.mutation<
      RegisterEventResponse,
      {
        id: number;
        registrationData: {
          name: string;
          email: string;
          phone: string;
          dob: string;
        };
      }
    >({
      query: ({ id, registrationData }) => ({
        url: `/event/${id}/form`,
        method: "POST",
        body: registrationData,
      }),
    }),
    getSearchEvent: builder.query<
      SearchEventsResponse,
      { title?: string; category?: string }
    >({
      query: ({ title = "", category = "" }) => ({
        url: "/events/search",
        method: "GET",
        params: { title, category },
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetSingleEventQuery,
  useGetRegisterEventMutation,
  useGetSearchEventQuery,
} = EventEndpoints;
