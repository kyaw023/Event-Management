import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Breadcrumbs,
  BreadcrumbItem,
} from "@nextui-org/react";
import { EditIcon } from "../components/EditIcon";
import { DeleteIcon } from "../components/DeleteIcon";
import { EyeIcon } from "../components/EyeIcon";
import {
  useDeleteMyEventMutation,
  useGetMyEventQuery,
} from "../store/endpoints/eventEndpoints";
import { ContainerComponent, LoadingComponent } from "../components";
import { EventProps } from "../types/event.types";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function App() {
  const { data, isLoading, refetch } = useGetMyEventQuery();
  const [deleteEvent] = useDeleteMyEventMutation();

  console.log(isLoading);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingComponent />
      </div>
    );

  console.log(data);

  const deleteHandler = (id: number) => {
    const swalWithTailwind = Swal.mixin({
      customClass: {
        popup: "bg-white rounded-lg shadow-lg", // Modal background and shadow
        title: "text-lg font-bold text-gray-800", // Title styling
        htmlContainer: "text-sm text-gray-600", // Content styling
        confirmButton:
          "bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded ms-2", // Primary button
        cancelButton: " border border-blue-500 px-4 py-2 rounded",
        // Secondary button
      },
      buttonsStyling: false, // Disable default button styles
      backdrop: `
        rgba(0, 0, 0, 0.5)
      `, // Semi-transparent dark backdrop
    });

    swalWithTailwind
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteEvent(id)
            .then(() => {
              // Remove the deleted event from the UI
              refetch();
              swalWithTailwind.fire({
                title: "Deleted!",
                text: "Your event has been deleted.",
                icon: "success",
              });
            })
            .catch(() => {
              swalWithTailwind.fire({
                title: "Error!",
                text: "Failed to delete the event.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithTailwind.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  console.log(data);

  return (
    <ContainerComponent>
      <div className="mt-5">
        <Breadcrumbs>
          <BreadcrumbItem>
            <Link to="/">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <Link to="">My Events</Link>
          </BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <Table aria-label="Event table with data" className="my-10">
        <TableHeader>
          <TableColumn>Title</TableColumn>
          <TableColumn>Org Name</TableColumn>
          <TableColumn>Start Date</TableColumn>
          <TableColumn>End Date</TableColumn>
          <TableColumn>Location</TableColumn>
          <TableColumn>Platform</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.events && data.events.length > 0 ? (
            data?.events.map((event: EventProps) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.org_name}</TableCell>
                <TableCell>{event.start_date}</TableCell>
                <TableCell>{event.end_date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>{event.plaform || "Online"}</TableCell>
                <TableCell className="flex items-center gap-1">
                  <Tooltip content="Edit">
                    <Link
                      to={`/edit-event/${event.id}`}
                      className="text-primary cursor-pointer"
                    >
                      <EditIcon />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete">
                    <button
                      onClick={() => deleteHandler(event.id)}
                      className="text-red-500 cursor-pointer"
                    >
                      <DeleteIcon />
                    </button>
                  </Tooltip>
                  <Tooltip content="View">
                    <Link
                      to={`/event/${event.id}`}
                      className="text-blue-500 cursor-pointer"
                    >
                      <EyeIcon />
                    </Link>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No events found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ContainerComponent>
  );
}
