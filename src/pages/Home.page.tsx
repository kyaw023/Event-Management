import { useSearchParams } from "react-router-dom";
import { ContainerComponent, EventsComponent } from "../components";
import { useGetEventsQuery } from "../store/endpoints/eventEndpoints";

const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get the current page from URL, default to 1 if not present
  const currentPage = Number(searchParams.get("page")) || 1;

  // Fetch the events based on the current page
  const { data, isLoading, isFetching } = useGetEventsQuery(currentPage);

  // Update URL and handle page change
  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  console.log(data);
  return (
    <ContainerComponent>
      <div className=" my-10">
        <EventsComponent
          events={data?.events}
          isLoading={isLoading}
          isFetching={isFetching}
          currentPage={currentPage} // Pass current page
          onPageChange={handlePageChange} // Handle page change
        />
      </div>
    </ContainerComponent>
  );
};

export default HomePage;
