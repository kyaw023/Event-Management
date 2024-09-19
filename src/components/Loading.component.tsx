import { ClipLoader } from "react-spinners";

const LoadingComponent = () => {
  return (
    <div>
      <ClipLoader
        color={"#36d7b7"}
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default LoadingComponent;
