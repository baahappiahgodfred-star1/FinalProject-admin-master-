import React from "react";
import { baseUrl } from "../_utils/config";

import { getCookie } from "cookies-next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
async function page() {
  const user = getCookie("user", { cookies })
    ? JSON.parse(getCookie("user", { cookies }))
    : null;
  if (!user) redirect("/login");
  const res = await fetch(baseUrl + "/api/order/", {
    headers: { authorization: user.token },
  });
  const json = await res.json();
  console.log(json.data[1].userId)
  return <div>
  <table className="prodcuts-table">
    <thead>
      <tr>
        <th>order id</th> 
        <th>email user</th>
        <th>status</th>
        <th></th> 
        <th></th>
      </tr>
    </thead>
    <tbody>
      {json.data.map((order) => (
        <tr key={order._id}>
          
          <td>{order._id}</td>
          <td>{order.userId.email} </td>
          <td>{order.status} </td> 
          <td>
            <Link href={"/orderupdate/" + order._id}>
              <button>update</button>
            </Link>
          </td>
          <td>
           <form >
            <input type="hidden" name="id" value={order._id}/>
           <button type="submit">
              delete
            </button>
           </form>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
}

export default page;
