import { redirect } from "next/navigation"; 
import { baseUrl } from "../_utils/config";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

async function page() {
  const user = (await getCookie("user", { cookies }))
    ? JSON.parse(getCookie("user", { cookies }))
    : null;
  if (!user) {redirect('/login');}
  async function handleAddProduct(formData) {
    "use server";
    console.log(formData)
    const res =await fetch(baseUrl + "/api/product/", {
      method: "post",
      headers: {
        authorization: user.token,
       
      },
      body: formData,
    })

    const json=await res.json()
    console.log(json)

  }
  return (
    <form action={handleAddProduct}>
      <div>
        <label>title</label>
        <input type="text" name="title" />
      </div>
      <div>
        <label>price</label>
        <input type="text" name="price" />
      </div>
      <div>
        <label>description</label>
        <input type="text" name="description" />
      </div>
      <div>
        <label>totalQuantity</label>
        <input type="text" name="totalQuantity" />
      </div>
      <div>
        <label>image</label>
        <input type="file" name="image" max={1} />
      </div>
      <input type="submit"/>
    </form>
  );
}

export default page;
