import axios from "axios"
import { Base_Url } from "./authStore"

export const purchaseStore = async (filmId: string, user: string) => {
    console.log({"filmId":filmId, user})
     const config = {
      headers: { 
        'Authorization': `Bearer ${user}`
      }
    };
    const purchase = await axios.post(`${Base_Url}/purchase/purchaseFilm/${filmId}`, {}, config);
    return purchase.data;
}

export const getPurchases = async (user: string) => {
      const config = {
        headers: {
          Authorization: `Bearer ${user}`,
        },
      };
    const purchases = await axios.get(`${Base_Url}/purchase/getPurchases`, config)
    return purchases.data
}

export const getNumberOfPurchase = async (authId: string, user: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    };
    const number = await axios.get(
      `${Base_Url}/purchase/getFilmPurchaseByUserId/${authId}`,
      config
    );
    return number.data
}