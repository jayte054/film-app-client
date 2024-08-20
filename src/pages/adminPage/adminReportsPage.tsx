import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authcontext/authContext";
import { NavBar } from "../../components/navBar";
import { getUsers } from "../../stores/authStore";
import { getFilmByGenre } from "../../stores/filmStore";
import { getNumberOfPurchase } from "../../stores/purchaseStore";
import { filmObject } from "../filmPage/homePage";
import "./adminReportsPage.css"


interface userObject {
    authId: string,
    fullName: string,
    email: string,
}

export const AdminReportsPage = () => {
const [genre, setGenre] = useState("");
const [films, setFilms] = useState<filmObject[]>([])
const [users, setusers] = useState<userObject[]>([])
const [numberOfPurchases, setNumberOfPurchases] = useState<{ [key: string]: number }>({})
const {user} = useContext(AuthContext)
const accessToken = user.accessToken

//function for fetching films by genre
const fetchFilmByGenre = async () => {
    const user = accessToken
    const response = await getFilmByGenre(user, genre)
    const filmsByGenre = response[genre] || [];
    setFilms(() => filmsByGenre)
    

}

//function for fetching number of purchases per user
const numberOfPurchasesByUser = async (authId: string): Promise<any> => {
    const user = accessToken
    console.log(authId)
    const _user = await getNumberOfPurchase(authId, user )
    setNumberOfPurchases((prev) => ({...prev, [authId]: _user}))
    console.log(_user)
}

// call to fetchall users 
useEffect(() => {
const fetchAllUsers = async () => {
    const user = accessToken
    const _users = await getUsers(user)
    setusers(() => _users)
}
fetchAllUsers()
}, [user])

//formfield for passing in the required genre of a movie
const genreFormField = () => (
  <div className="genre-form">
    <span>Genre</span>
    <input
      type="text"
      placeholder="genre"
      value={genre}
      onChange={(e) => setGenre(e.target.value)}
      required
    />
    <button type="button" onClick={fetchFilmByGenre}>
      Films
    </button>
  </div>
);

    return (
      <div>
        <NavBar />
        <h2>Reports Page</h2>
        <div className="reports-container">
          <div className="reports1-container">
            <button
              type="button"
              onClick={() => numberOfPurchasesByUser(user.authId)}
            >
              Users
            </button>
            {users.length > 0 ? (
              <div className="film-table">
                <table>
                  <thead>
                    <tr>
                      <th>fullName</th>
                      <th>email</th>
                      <th>Number Of Purchases</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => {
                      const renderButton = () => (
                        <button
                          type="button"
                          onClick={() => numberOfPurchasesByUser(user.authId)}
                        >
                          Users
                        </button>
                      );

                      return (
                        <tr key={user.authId}>
                          <td>
                            <b>{user.fullName}</b>
                          </td>
                          <td>
                            <b>{user.email}</b>
                          </td>
                          <td>
                            <b>
                              {numberOfPurchases[user.authId] !== undefined
                                ? numberOfPurchases[user.authId]
                                : "N/A"}
                            </b>
                          </td>
                          <td>
                            <b>{renderButton()}</b>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-films-message">
                <p>No Users</p>
              </div>
            )}
          </div>

          <div className="film1-container">
            <div>{genreFormField()}</div>
            {films.length > 0 ? (
              <div className="film-table">
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Genre</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {films.map((film) => (
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="no-films-message">
                <p>No films found for the selected genre.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

