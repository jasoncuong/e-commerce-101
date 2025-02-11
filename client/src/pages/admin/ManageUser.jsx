import { useEffect, useState, useCallback } from "react";
import { apiGetAllUsers } from "../../apis";
import moment from "moment";
import { InputField, Pagination } from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";

const ManageUser = () => {
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [params] = useSearchParams();

  const fetchAllUsers = async (params) => {
    const response = await apiGetAllUsers({
      ...params,
      limit: import.meta.env.VITE_REACT_APP_PRODUCT_LIMIT,
    });
    if (response.success) {
      setUsers(response);
    }
  };

  const queriesDebounce = useDebounce(queries.q, 800);

  useEffect(() => {
    const queries = Object.fromEntries([...params]);
    if (queriesDebounce) queries.q = queriesDebounce;

    fetchAllUsers(queries);
  }, [queriesDebounce, params]);

  return (
    <div className="w-full">
      <h1 className="flex h-[75px] items-center justify-between border-b px-4 text-3xl font-bold">
        <span>Manage users</span>
      </h1>
      <div className="w-full p-4">
        <div className="flex justify-end p-4">
          <InputField
            nameKey={"q"}
            value={queries.q}
            setValue={setQueries}
            style="w500"
            placeholder="Search users"
            isHideLabel
          />
        </div>
        <table className="mb-6 w-full table-auto text-left">
          <thead className="bg-gray-400 text-[13px] font-bold">
            <tr className="border border-gray-300">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Email address</th>
              <th className="px-4 py-2">Fullname</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.users?.map((el, index) => (
              <tr key={el._id} className="border border-gray-500">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{el.email}</td>
                <td className="px-4 py-2">{`${el.lastname} ${el.firstname}`}</td>
                <td className="px-4 py-2">{el.mobile}</td>
                <td className="px-4 py-2">{el.role}</td>
                <td className="px-4 py-2">
                  {el.isBlocked ? "Block" : "Active"}
                </td>
                <td className="px-4 py-2">
                  {moment(el.createdAt).format("llll")}
                </td>
                <td className="px-4 py-2">
                  <span className="cursor-pointer px-2 text-blue-400 hover:underline">
                    Edit
                  </span>
                  <span className="cursor-pointer px-2 text-orange-400 hover:underline">
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex w-full justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
