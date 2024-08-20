import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../authcontext/authContext"
import { NavBar } from "../../components/navBar";
import { filmStore } from "../../stores/filmStore";
import { purchaseStore } from "../../stores/purchaseStore";
import "./homePage.css";

export interface filmObject {
    filmId: string,
    genre: string,
    price: string,
    title: string,
    description: string,
}

export const HomePage = () => {
    const [films, setFilms] = useState<filmObject[]>([])
    const [success, setSuccess] = useState<{ [filmId: string]: boolean }>({});
    const {user} = useContext(AuthContext)
    const name = user?.fullName || "";
    const accessToken = user?.accessToken || ''

    //render films in the store by calling on the filmstore endpoint
    useEffect(() => {
        const _films = async () => {
            const saidFilms = await filmStore()
            setFilms(() => saidFilms)
        }
        _films()
    }, [films])

    // function for enabling purchaseFilm endpoint
    const purchaseFilm = async (filmId: string) => {
        console.log('clicked')
        try {
          const user = accessToken;

          const purchase = await purchaseStore(filmId, user);

          if (purchase.status === "paid") {
            setSuccess((prevSuccess) => ({
              ...prevSuccess,
              [filmId]: true,
            }));
          }
        } catch (error) {
          console.error(error);
        }
       
    }

    return (
      <div className="home-container">
        <NavBar />
        <div className="home-header">
          <div>
            <span>welcome {name}</span>
          </div>
          <div>
            <span>Film</span>
          </div>
        </div>

        <div className="film-table">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Description</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {films.map((film: filmObject) => (
                <tr key={film.filmId}>
                  <td>
                    <b>{film.title}</b>
                  </td>
                  <td>
                    <b>{film.genre}</b>
                  </td>
                  <td>
                    <b>{film.description}</b>
                  </td>
                  <td>
                    <b>NGN {film.price}</b>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => purchaseFilm(film.filmId)}
                    >
                      {success[film.filmId] === true ? "Purchased" : "Purchase"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
}
      