import { Button, Image } from "@nextui-org/react";
import { EventProps } from "../types/event.types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import toast from "react-hot-toast";

const EventCardComponent = ({ event }: { event: EventProps }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const handleRegister = (): void => {
    if (user) {
      navigate(`event/register/${event.id}`);
    } else {
      toast.error("Please login to register");
    }
  };
  return (
    <div className="border border-slate-200 rounded-lg ">
      <div className="p-4 space-y-2 ">
        <Image width={400} alt={event.title} src={event.image} />
        <div className=" flex items-center justify-between">
          <Link to={`/event/${event.id}`}>
            <h1 className=" text-lg font-semibold hover:underline">
              {event.title.length > 20
                ? event.title.slice(0, 20) + "..."
                : event.title}
            </h1>
          </Link>
          <span>{event.rating || 0}</span>
        </div>
        <p className=" text-sm text-slate-500">
          {event.description.length > 100
            ? event.description.slice(0, 100) + "..."
            : event.description}
        </p>
        <div className=" flex items-center justify-between ">
          <p>{event.start_date}</p>
          <Button onClick={handleRegister} radius="sm" color="primary">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCardComponent;
