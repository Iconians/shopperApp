import { COMMERCEJS_API } from "./constants";

class ProductService {
  
  async fetchProducts () {

    return new Promise(async (success, fail,) => {
      const headers = {
        "X-Authorization": COMMERCEJS_API,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
      const url = new URL(
        "https://api.chec.io/v1/products"
    );
      const params = {
        "limit": "26"
      }

      Object.keys(params)
      .forEach(key => url.searchParams.append(key, params[key]));
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: headers
        })
        if (response.ok) {
          const json = await response.json()
          const products = json.data
          .map((item) => ({
            id: item.id,
            categories: item.categories.map((item) => item.slug),
            price: item.price.formatted_with_symbol,
            name: item.name,
            inventory: item.inventory.available,
            desc: item.description,
            img: item.image.url
          }))
          success( {response, products} )
        } else {
          fail({error: "invalid http request"})
        }
      }
      catch(error) {
        fail(error)
      }
    })
  }
}

export default ProductService