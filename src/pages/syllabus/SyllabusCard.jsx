import moment from "moment/moment";
import { AiFillEye, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const SyllabusCard = ({ syllabus, refetch }) => {
  return (
    <>
      <tr className="border-b">
        <td className="flex items-center pt-2">
          <i className="p-2">
            <BsFillCalendarDateFill />
          </i>
          <p className="py-2">
            {moment(syllabus.updatedAt).format("DD - MM - YYYY")}
          </p>
        </td>
        <td className="p-2">
          {syllabus.title.split(/\s+/).slice(0, 13).join(" ") + "..."}
        </td>
        <td className="p-2">
          <Link to={`/notice/${syllabus._id}`} className="flex items-center">
            {" "}
            <i className="pr-1">
              <AiFillEye />
            </i>{" "}
            View
          </Link>
        </td>
        <td className="p-2">
          {syllabus?.pdf?.url && (
            <a
              href={`#download-link-${syllabus._id}`}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </a>
          )}
        </td>
        <td className="p-2">
          {syllabus?.image?.url && (
            <a
              href={`#download-link-${syllabus._id}`}
              className="py-2 flex items-center"
            >
              <i className="pr-1">
                <PiDownloadSimpleBold />
              </i>
              Download
            </a>
          )}
        </td>
        <td className="p-2">
          <button>
            {" "}
            <i>
              <AiOutlineEdit />
            </i>
          </button>
        </td>
        <td className="p-2">
          <button>
            <i>
              <AiOutlineDelete />
            </i>
          </button>
        </td>
      </tr>
    </>
  );
};

export default SyllabusCard;
