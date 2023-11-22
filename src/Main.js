import { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import { reactRouter } from "./Route/Router";
import Spinner from "./components/spinner/Spinner";
import { AuthContext } from "./providers/AuthProvider";

const Main = () => {
  const { isLoading } = useContext(AuthContext);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Spinner />
        </div>
      ) : (
        <div id="blankMap">
          <div className="container mx-auto">
            <div className="home-background border min-h-screen bg-[#ececec90] p-2 relative">
              <RouterProvider router={reactRouter} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Main;
