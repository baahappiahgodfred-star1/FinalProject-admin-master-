
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { baseUrl } from "./_utils/config";
import Link from "next/link";
export default async function Home() {
  const user = await getCookie("user", { cookies })
  ? JSON.parse(getCookie("user", { cookies }))
  : null;
  

  if (!user) {console.log("user")
    redirect("/login"); 
  }
  else {
  const response = await fetch(baseUrl + "/api/auth/checkToken", {
      method: "post",
      headers: { authorization: user.token },
    });
    const json =await response.json()

    if(json.message=="unauthorized"){
      redirect('/login')
    }
  }
  const res = await fetch(baseUrl + "/api/product/", { cache: "no-store" });
  const json = await res.json();
  async function handleDeleteProduct(formData) {
    'use server'
    const id=formData.get("id")
  
     const res= await fetch(baseUrl + "/api/product/delete/" + id, {
        method: "delete",
        headers: {authorization: user.token,"Content-type":"application/json" },
      })
      const json=await res.json()
    if(json.status=="SUCCESS") redirect('/')

  }
  return (
    <div>
      <table className="prodcuts-table">
        <thead>
          <tr>
            <th>image</th>
            <th>product id</th>
            <th>title</th>
            <th>price</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {json.data.map((prod) => (
            <tr key={prod._id}>
              <td>
                <img src={baseUrl + prod.image} alt="" />
              </td>
              <td>{prod._id}</td>
              <td>{prod.title} </td>
              <td>{prod.price} </td>
              <td>
                <Link href={"/update/" + prod._id}>
                  {" "}
                  <button>update</button>
                </Link>{" "}
              </td>
              <td>
                {" "}
               <form action={handleDeleteProduct}>
                <input type="hidden" name="id" value={prod._id}/>
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
  );
}
