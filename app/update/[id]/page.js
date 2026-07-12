"use client";

import { baseUrl } from "@/app/_utils/config";
import { deleteCookie, getCookie } from "cookies-next";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function page() {
    const navigate=useRouter()
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    fetch(baseUrl + "/api/product/item/" + id)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json.data);
      })
      .catch((e) => console.log(e));
  }, [id]);
  function updateProduct(e) {
    setProduct({ ...product, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    const user = getCookie("user")?JSON.parse(getCookie("user")) :null ;
    console.log("🚀 ~ handleSubmit ~ user:", user)

    e.preventDefault();
    if(user){
        fetch(baseUrl + "/api/product/update/" + id, {
          method: "put",
          headers: { authorization: user.token ,'Content-Type': 'application/json',"Accept":"application/json"},
          body: JSON.stringify(product),
        })
          .then((res) => res.json())
          .then((json) => {console.log(json)
            if(json.message=="unauthorized"){deleteCookie("user");navigate.replace('/login');console.log("hello") }
            else{  navigate.replace('/')}
          })
          .catch((e) => {
      
            console.log(e);
          });
        
        }
        else{navigate.replace('/login')}
  }
  return (
    <div>
      <from >
        <div>
          <label>title</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={updateProduct}
          />
        </div>
        <div>
          <label>price</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={updateProduct}
          />
        </div>
        <div>
          <label>description</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={updateProduct}
          />
        </div>
        <button onClick={handleSubmit}>submit</button>
      </from>
    </div>
  );
}

export default page;
