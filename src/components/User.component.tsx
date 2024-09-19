import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { UserProps } from "../types/auth.types";
import { useLogoutMutation } from "../store/endpoints/authEndpoints";
import { useDispatch } from "react-redux";
import { logout } from "../store/slice/auth/auth.slice";
import { persistor } from "../store/store";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const UserComponent = ({ user }: { user: UserProps }) => {
  const [logoutFun] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logoutFun().unwrap();
      dispatch(logout());
      persistor.purge();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src={user.avatar_url || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Events</DropdownItem>
          <DropdownItem key="team_settings">
            <Link to={"/create-event"}>Create Events</Link>
          </DropdownItem>
          <DropdownItem onClick={handleLogout} key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default UserComponent;
