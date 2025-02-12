import { useEffect, useState, useCallback } from "react";
import { apiGetAllUsers, apiUpdateUser, apiDeleteUser } from "../../apis";
import moment from "moment";
import {
  InputField,
  Pagination,
  InputForm,
  Select,
  Button,
} from "../../components";
import useDebounce from "../../hooks/useDebounce";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { blockStatus, roles } from "../../utils/contants";
import clsx from "clsx";

const ManageUser = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    email: "",
    firstname: "",
    lastname: "",
    role: "",
    mobile: "",
    isBlocked: "",
  });
  const [users, setUsers] = useState(null);
  const [queries, setQueries] = useState({
    q: "",
  });
  const [update, setUpdate] = useState(false);
  const [params] = useSearchParams();
  const [editElm, setEditElm] = useState(null);

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
  }, [queriesDebounce, params, update]);

  const handleUpdate = async (data) => {
    const response = await apiUpdateUser(data, editElm._id);
    if (response.success) {
      setEditElm(null);
      render();
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };

  const render = useCallback(() => {
    setUpdate(!update);
  }, [update]);

  const handleDeleteUser = (uid) => {
    Swal.fire({
      title: "Are you sure...",
      text: "Are you want remove this user?",
      showCancelButton: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await apiDeleteUser(uid);
        if (response.success) {
          render();
          toast.success(response.message);
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  return (
    <div className={clsx("w-full", editElm && "pl-16")}>
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
        <form onSubmit={handleSubmit(handleUpdate)}>
          {editElm && <Button type="submit">Update</Button>}
          <table className="mb-6 mt-2 w-full table-auto text-left">
            <thead className="bg-gray-400 text-[13px] font-bold">
              <tr className="border border-gray-300">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Email address</th>
                <th className="px-4 py-2">Firstname</th>
                <th className="px-4 py-2">Lastname</th>
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
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={editElm?.email}
                        fullWidth
                        errors={errors}
                        id={"email"}
                        validate={{
                          required: "Require fill.",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.email}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={editElm?.firstname}
                        fullWidth
                        errors={errors}
                        id={"firstname"}
                        validate={{ required: "Require fill." }}
                      />
                    ) : (
                      <span>{el.firstname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={editElm?.lastname}
                        fullWidth
                        errors={errors}
                        id={"lastname"}
                        validate={{ required: "Require fill." }}
                      />
                    ) : (
                      <span>{el.lastname}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <InputForm
                        register={register}
                        defaultValue={editElm?.mobile}
                        fullWidth
                        errors={errors}
                        id={"mobile"}
                        validate={{
                          required: "Require fill.",
                          pattern: {
                            value:
                              /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                            message: "Invalid phone number",
                          },
                        }}
                      />
                    ) : (
                      <span>{el.mobile}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <Select
                        register={register}
                        defaultValue={el.role}
                        fullWidth
                        errors={errors}
                        id={"role"}
                        validate={{ required: "Require fill." }}
                        options={roles}
                      />
                    ) : (
                      <span>{el.role}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <Select
                        register={register}
                        defaultValue={el.isBlocked}
                        fullWidth
                        errors={errors}
                        id={"isBlocked"}
                        validate={{ required: "Require fill." }}
                        options={blockStatus}
                      />
                    ) : (
                      <span>{el.isBlocked ? "Blocked" : "Active"}</span>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {moment(el.createdAt).format("llll")}
                  </td>
                  <td className="px-4 py-2">
                    {editElm?._id === el._id ? (
                      <span
                        onClick={() => setEditElm(null)}
                        className="cursor-pointer px-2 text-blue-400 hover:underline"
                      >
                        Back
                      </span>
                    ) : (
                      <span
                        onClick={() => setEditElm(el)}
                        className="cursor-pointer px-2 text-blue-400 hover:underline"
                      >
                        Edit
                      </span>
                    )}

                    <span
                      onClick={() => handleDeleteUser(el._id)}
                      className="cursor-pointer px-2 text-orange-400 hover:underline"
                    >
                      Delete
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
        <div className="flex w-full justify-end">
          <Pagination totalCount={users?.counts} />
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
