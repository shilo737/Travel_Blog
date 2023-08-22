import React, { useEffect, useState } from "react";
import useAdmin from "../../../hooks/useAdmin";

const UsersList = () => {
  const { allUsers, getAllUser, deleteUsersByAdmin, refresh, changeRole } =
    useAdmin();
  const [inputValues, setInputValues] = useState({});

  const deleteUser = (_id) => {
    if (!window.confirm("Are you sure you want to delete the users")) {
      return;
    }
    deleteUsersByAdmin(_id);
  };

  const handleKeyDown = (e, userId) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const roleToChange = inputValues[userId];
      if (roleToChange !== undefined) {
        changeRole(userId, roleToChange);
      }
    }
  };

  useEffect(() => {
    getAllUser();
  }, [refresh]);

  return (
    <div>
      <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between pb-6">
          <div>
            <h2 className="font-semibold text-white text-[2.2em]">
              User Accounts
            </h2>
            <span className="text-xl text-white">
              View accounts of registered users
            </span>
          </div>
        </div>
        <div className="overflow-y-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                  <th className="px-5 py-3">Full Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">User Role</th>
                  <th className="px-6 py-3">Created at</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              {allUsers &&
                allUsers.map((item, i) => (
                  <tbody className="text-black font-bold" key={i}>
                    <tr>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-full w-full rounded-full"
                              src={item.profileImage}
                              alt="profileImage"
                            />
                          </div>
                          <div className="ml-3">
                            <p className="whitespace-no-wrap">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">{item.email}</p>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <input
                          type="text"
                          defaultValue={inputValues[item._id] || item.role}
                          className="input input-bordered bg-white max-w-xs w-[100px]"
                          onChange={(e) =>
                            setInputValues({
                              ...inputValues,
                              [item._id]: e.target.value,
                            })
                          }
                          onKeyDown={(e) => handleKeyDown(e, item._id)}
                        />
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <p className="whitespace-no-wrap">
                          {item.createdAt.substring(0, 10)}
                        </p>
                      </td>

                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <span className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900">
                          Active
                        </span>
                      </td>
                      <td className="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                        <div className=" flex gap-3 items-center">
                          <button
                            onClick={() => deleteUser(item._id)}
                            className="btn btn-error btn-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
