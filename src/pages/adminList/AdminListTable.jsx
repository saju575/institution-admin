import React from "react";
import AdminListRow from "./AdminListRow";

const AdminListTable = ({ data }) => {
  return (
    <table className="border-collapse w-full vertical-scroll">
      <thead>
        <tr className="bg-[#BBCDCD60]">
          <th className="p-2 text-start min-w-max">Name</th>
          <th className="p-2 text-start min-w-max">Email</th>
          <th className="p-2 text-start min-w-max">Role</th>
          <th className="p-2 text-start min-w-max">Action</th>
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <AdminListRow row={row} key={index} />
        ))}
      </tbody>
    </table>
  );
};

export default AdminListTable;
