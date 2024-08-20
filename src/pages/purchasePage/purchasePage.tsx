import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../authcontext/authContext"
import { NavBar } from "../../components/navBar"
import { getPurchases } from "../../stores/purchaseStore"
import "./purchasePage.css"

interface purchaseObject {
        purchaseId: string,
        title: string,
        film_Id: string,
        price: string,
        status: string,
        date: string,
        userAuthId: string
}

export const PurchasePage = () => {
    const [purchases, setPurchases] = useState<purchaseObject[]>([])
    const {user} = useContext(AuthContext)
    const accessToken = user?.accessToken || ""

    useEffect(() => {
        const fetchPurchases = async () => {
            const user = accessToken
            const purchases = await getPurchases(user)
            setPurchases(() => purchases)
        }
        fetchPurchases()
    }, [purchases])

    return (
      <div className="purchase-container">
        <NavBar />
        <h2>Film Purchases</h2>
        <div className="purchase-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase: purchaseObject) => (
                <tr key={purchase.purchaseId} >
                  <td>
                    <b>{purchase.title}</b>
                  </td>
                  <td>
                    <b>NGN{purchase.price}</b>
                  </td>
                  <td>
                    <b>{purchase.status}</b>
                  </td>
                  <td>
                    <b>{purchase.date}</b>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}