import React, { useState, useEffect } from "react";
import { ReactDOM } from "react";
import ReactPaginate from "react-paginate";

const UsersList = () => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(3);

  console.log(data);

  const getUsers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/users?page=${page}&pageSize=${pageSize}`
      );
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [page, pageSize]);

  const nextPage = () => {
    if (page < data.totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const handleClick = (e) => {
    console.log(`User requested page number ${e.selected}, which is offset`);
    setPage(e.selected + 1);
  };

  return (
    <div>
      <ul>
        {data &&
          data.users?.map((user) => {
            return <li key={user._id}>{user.userName}</li>;
          })}
      </ul>
      <ReactPaginate
        breakLabel="..."
        pageCount={data.totalPage}
        nextLabel="Successivo"
        previousLabel="Precedente"
        onClick={handleClick}
        previousClassName={page === 0 ? "disabled" : ""}
        disabledClassName="disabled"
      />
    </div>
  );
};

export default UsersList;
