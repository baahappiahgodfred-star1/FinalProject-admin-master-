"use client";

import { baseUrl } from "@/app/_utils/config";
import { deleteCookie, getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
  const user = getCookie("user")?JSON.parse(getCookie("user")) :null ;

    const navigate=useRouter()
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    fetch(baseUrl + "/api/order/item/" + id, {
   
      headers: { authorization: user.token ,'Content-Type': 'application/json',"Accept":"application/json"},
      
    })
      .then((res) => res.json())
      .then((json) => {
        setOrder(json.data);console.log(json)      })
      .catch((e) => console.log(e));
  }, [id]);

  console.log(order)

  function handleSubmit(e) {

    e.preventDefault();
    if(user){
        fetch(baseUrl + "/api/order/updateorder/" + id,{
          method: "put",
          headers: { authorization: user.token ,'Content-Type': 'application/json',"Accept":"application/json"},
          body: JSON.stringify(order),
        })
          .then((res) => res.json())
          .then((json) => {console.log(json,"hello")
            // if(json.message=="unauthorized"){deleteCookie("user");navigate.replace('/login') }
            // else{  navigate.replace('/')}
          })
          .catch((e) => {
            console.log(e);
          });
        
        }
        else{navigate.replace('/login')}
  }
  return (
    <div>
 {JSON.stringify(order)}
      <from >
        
        <div>
          <label>description</label>
        <select name="status" onChange={(e)=>setOrder({...order,status:e.target.value})}>
          <option selected={order.status=="pending"} value={"pending"}>pending</option>
          <option selected={order.status=="done"} value={'done'}>done</option>
          <option  selected={order.status=="cancelled"} value={"cancelled"}>canceld</option>
        </select>
        </div>
        <button onClick={handleSubmit}>submit</button>
      </from>
    </div>
  );
}

export default page;
