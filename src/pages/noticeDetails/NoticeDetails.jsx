import { FaArrowLeft } from "react-icons/fa6";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { formatDate } from "../../utills/formatDate";
import { getNews } from "../../utills/getNews";

const NoticeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getNews(id),
    queryKey: ["notice", { id }],
  });

  /* Go back handler */
  const handleGoBack = () => {
    navigate(-1);
  };
  /* 
        render content
    */
  let content;
  if (isLoading) {
    content = (
      <div className="flex justify-center items-center py-4">
        <Spinner />
      </div>
    );
  } else if (!isLoading && isError) {
    content = (
      <div>
        <ErrorMsg msg={error.message} />
      </div>
    );
  } else if (!isLoading && !isError && !data?.payload) {
    content = (
      <div>
        <ErrorMsg msg={`No data found`} />
      </div>
    );
  } else if (!isLoading && data?.payload) {
    const { title, pdf, desc, image, updatedAt } = data.payload;
    content = (
      <>
        <div className="flex justify-between items-center">
          <h4 className="font-medium py-4 w-max">{title}</h4>
          <p className="font-medium">
            Published:{" "}
            {`${formatDate(updatedAt).date} ${formatDate(updatedAt).year}`}
          </p>
        </div>

        {desc && (
          <div className="py-4" dangerouslySetInnerHTML={{ __html: desc }} />
        )}

        <div className="flex flex-col items-center justify-center gap-6">
          {image?.url && (
            <img
              src={image.url}
              alt="notice"
              style={{ maxWidth: "100%", height: "auto" }}
              className="py-4 object-cover relative"
            />
          )}
          {pdf?.url && (
            <iframe
              className="custom-scrollbar"
              title="PDF Viewer"
              src={pdf.url}
              // maxWidth="100%"
              width="100%"
              height="600" // Set the desired height
              frameBorder="0"
              scrolling="auto"
              allowFullScreen
            />
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="noticeDetails">
        <div
          className="cursor-pointer bg-[#244c63ad] text-white px-4 flex items-center justify-center gap-x-3 w-44 py-2 border"
          onClick={handleGoBack}
        >
          <span>
            <FaArrowLeft />
          </span>
          ফিরে যাও
        </div>

        {content}
      </div>
    </>
  );
};

export default NoticeDetails;
