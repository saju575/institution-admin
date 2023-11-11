import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ErrorMsg from "../../components/errorMsg/ErrorMsg";
import Spinner from "../../components/spinner/Spinner";
import { formatDate } from "../../utills/formatDate";
import { getNews } from "../../utills/getNews";

const NoticeDetails = () => {
  const { id } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getNews(id),
    queryKey: ["notice", { id }],
  });

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
          <p>
            Published:{" "}
            {`${formatDate(updatedAt).date} ${formatDate(updatedAt).year}`}
          </p>
        </div>

        <div className="flex flex-col items-center justify-center gap-6">
          {desc && (
            <div className="py-4" dangerouslySetInnerHTML={{ __html: desc }} />
          )}
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
      <div className="noticeDetails">{content}</div>
    </>
  );
};

export default NoticeDetails;
