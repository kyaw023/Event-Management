import { Button, Input } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import ContainerComponent from "./Container.component";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import UserComponent from "./User.component";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import { useGetSearchEventQuery } from "../store/endpoints/eventEndpoints";
const HeaderComponent = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");

  // State to manage search parameters
  const [searchParams, setSearchParams] = useState<{
    title?: string;
    category?: string;
  }>({});

  const handleNavigate = (path: string): void => {
    navigate(path);
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  // Fetch events based on search parameters
  const { data } = useGetSearchEventQuery(searchParams);

  console.log(data);

  // Handle search
  const searchHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ title: search }); // Example: use search term for both title and category
  };

  return (
    <header>
      <ContainerComponent>
        <div className=" flex items-center justify-between">
          <div>
            <h1>Logo</h1>
          </div>
          <ul className=" flex items-center space-x-3">
            <Link to={"/"} className=" text-primary">
              Events
            </Link>
            <Link to={"/about-us"}>About Us</Link>
            <Link to={"/contact-us"}>Contact Us</Link>
          </ul>
          <div className=" flex items-center space-x-3">
            <form onSubmit={searchHandler}>
              <Input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Type to search..."
                labelPlacement="outside"
                startContent={
                  <CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
              />
            </form>
            <div>
              {user && token ? (
                <UserComponent user={user} />
              ) : (
                <div className="space-x-3">
                  <Button
                    onClick={() => handleNavigate("/login")}
                    color="primary"
                    radius="none"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => handleNavigate("/register")}
                    variant="bordered"
                    color="primary"
                    radius="none"
                  >
                    Register
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </ContainerComponent>
    </header>
  );
};

export default HeaderComponent;
