import React from "react";
import { EventProps, PaginatedEvents } from "../types/event.types";
import EventCardComponent from "./EventCard.component";
import LoadingComponent from "./Loading.component";
import { Button } from "@nextui-org/button";
import { Pagination } from "@nextui-org/react";
import { AnimatePresence, motion } from "framer-motion";

interface EventsComponentProps {
  events?: PaginatedEvents;
  isLoading?: boolean;
  isFetching?: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const EventsComponent: React.FC<EventsComponentProps> = ({
  events,
  isLoading,
  currentPage,
  onPageChange,
}: EventsComponentProps) => {
  const eventData: EventProps[] =
    events?.data.map((event: any) => ({
      id: event.id,
      title: event.title,
      description: event.description,
      image: event.image,
      start_date: event.start_date,
      end_date: event.end_date,
      location: event.location,
      org_name: event.org_name,
      org_email: event.org_email,
      org_phone: event.org_phone,
      org_logo: event.org_logo,
      plaform: event.plaform,
      status: event.status,
      rating: event.rating,
      category_id: event.category_id,
      created_at: event.created_at,
      created_by: event.created_by,
      limit: event.limit,
      updated_at: event.updated_at,
    })) ?? [];

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <LoadingComponent />
      </div>
    );
  }

  console.log(events?.current_page);
  return (
    <div>
      <div>
        <h1 className=" text-xl font-bold">Events</h1>

        <div className=" space-x-2 py-5">
          <Button color="primary" radius="full" size="sm">
            All
          </Button>
          <Button color="primary" radius="full" variant="bordered" size="sm">
            Techno
          </Button>
          <Button color="primary" radius="full" variant="bordered" size="sm">
            Art
          </Button>
          <Button color="primary" radius="full" variant="bordered" size="sm">
            Design
          </Button>
          <Button color="primary" radius="full" variant="bordered" size="sm">
            Fashion
          </Button>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {eventData.map((event: EventProps) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95 }} // Initial scale and opacity for the entering card
              animate={{ opacity: 1, scale: 1 }} // Final state for the entering card
              exit={{ opacity: 0, scale: 0.95 }} // State for the exiting card
              transition={{ duration: 0.3 }} // Smooth transition
            >
              <EventCardComponent event={event} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      <div className=" py-5 max-w-sm mx-auto">
        <Pagination
          loop
          variant="faded"
          showControls
          color="success"
          total={10}
          page={currentPage}
          onChange={(page) => onPageChange(page)}
        />
      </div>
    </div>
  );
};

export default EventsComponent;
