import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSingleEventQuery } from "../store/endpoints/eventEndpoints";
import { ContainerComponent, LoadingComponent } from "../components";
import { EventProps } from "../types/event.types";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Image,
  Tooltip,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import toast from "react-hot-toast";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // Ensure `id` is typed as a string
  const eventId = Number(id); // Safely convert `id` to a number

  const navigate = useNavigate();

  const { data, isLoading, error } = useGetSingleEventQuery(eventId, {
    skip: isNaN(eventId), // Skip if `id` is not a number
  });

  const user = useSelector((state: RootState) => state.auth.user);

  if (isLoading) {
    return (
      <div className=" flex items-center justify-center h-screen">
        <LoadingComponent />
      </div>
    );
  }
  if (error || !data || !data.event) {
    return <div>Error fetching event or event not found.</div>;
  }

  const singleEvent: EventProps = data?.event;

  const handleRegister = () => {
    if (!user) {
      toast.error("Please login to register");
    } else {
      navigate(`/event/register/${singleEvent.id}`);
    }
  };

  return (
    <ContainerComponent>
      <div>
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to={"/"}>Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>Event Detail</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col md:flex-row gap-5 my-5">
        <div>
          <Image height={300} alt={singleEvent.title} src={singleEvent.image} />
        </div>
        <div className=" space-y-3">
          <h1 className=" text-xl font-semibold">{singleEvent.title}</h1>
          <div className="flex flex-wrap gap-2">
            <Tooltip content={"Location"} color="primary">
              <Chip color="primary" variant="faded">
                {singleEvent.location}
              </Chip>
            </Tooltip>
            <Tooltip content={"Type"} color="primary">
              <Chip color="primary" variant="faded">
                {singleEvent.plaform}
              </Chip>
            </Tooltip>
          </div>
          <div className=" space-x-2">
            <Tooltip content={"Start Date"} color="primary">
              <Chip color="primary" variant="bordered">
                {singleEvent.start_date}
              </Chip>
            </Tooltip>
            <Tooltip content={"End Date"} color="primary">
              <Chip color="primary" variant="bordered">
                {singleEvent.end_date}
              </Chip>
            </Tooltip>
            <Tooltip content={"Limition"} color="primary">
              <Chip color="primary" variant="bordered">
                {parseInt(singleEvent.limit)}
              </Chip>
            </Tooltip>
          </div>
          <div className=" max-w-md">
            <p>{singleEvent.description}</p>
          </div>
          <Button onClick={handleRegister} color="primary" variant="bordered">
            Register
          </Button>
        </div>
      </div>
    </ContainerComponent>
  );
};

export default EventDetailPage;
