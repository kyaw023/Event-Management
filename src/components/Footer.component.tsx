import { Button } from "@nextui-org/button";
import ContainerComponent from "./Container.component";
import { CiMail } from "react-icons/ci";
import { FaFacebook, FaTelegram } from "react-icons/fa";

const FooterComponent = () => {
  return (
    <div className=" border-t shadow-white border-gray-200 my-10 mt-auto">
      <ContainerComponent>
        <div className=" flex  justify-between py-10">
          <div className=" space-y-3">
            <h1 className=" text-xl font-semibold max-w-sm">
              Let’s Create your own events or workshops with us. Free to create.
            </h1>
            <Button radius="sm" color="primary">
              Create Now
            </Button>
          </div>
          <div>
            <ul className=" space-y-3 font-semibold">
              <li>Events</li>
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Create Event</li>
            </ul>
          </div>

          <div>
            <div className=" flex space-x-1">
              <CiMail size={30} color="blue" />
              <ul>
                <p className=" text-xl font-semibold">How Can we Help?</p>
                <li>QKuZP@example.com</li>
                <li>09123456789</li>
              </ul>
            </div>
          </div>
        </div>
      </ContainerComponent>
      <div className=" border-t shadow-white border-gray-200 p-4">
        <ContainerComponent>
          <div className=" flex items-center justify-between ">
            <h1>Logo</h1>
            <p>© 2022 Event Management. All rights reserved.</p>
            <div className="flex items-center space-x-1">
              <FaFacebook size={30} color="blue" />
              <FaTelegram size={30} color="blue" />
            </div>
          </div>
        </ContainerComponent>
      </div>
    </div>
  );
};

export default FooterComponent;
