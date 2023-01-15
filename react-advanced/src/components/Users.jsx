import React, { useEffect, useState } from "react";
import axios from "axios";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const result = await axios("https://jsonplaceholder.typicode.com/users");
      setUsers(result.data);
    }
    getUsers()
  });

  return <div>
    <ol>
        {users.map(user=>{
            return <li key={user.div}>{user.name}</li>
        })}
    </ol>
  </div>;
};

export default Users;
