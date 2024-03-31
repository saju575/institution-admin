import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Spinner from "../../components/spinner/Spinner";
import axios from "../../utills/axiosInstance";

const ActivateAdmin = () => {
  const { id, token } = useParams();

  const { isLoading, isSuccess, isError } = useQuery({
    queryKey: ["activate-admin", { id, token }],
    queryFn: async () => {
      try {
        const url = `/admin/${id}/verify/${token}`;
        const res = await axios.get(url);
        return res.data;
      } catch (error) {
        throw new Error(error.response.data.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading && <Spinner />}

      {isSuccess && (
        <div className="flex flex-col gap-4 justify-center">
          <img
            src={"/assets/success.png"}
            alt="success_img"
            className={"w-40 h-40"}
          />
          <h1 className="text-center">Email verified successfully</h1>
          <div className="flex justify-center">
            <Link to="/login">
              <span className="bg-[#244c63ad] px-4 text-white cursor-pointer  py-2 border uppercase">
                Login
              </span>
            </Link>
          </div>
        </div>
      )}

      {isError && <h1>404 Not Found</h1>}
    </div>
  );
};

export default ActivateAdmin;
