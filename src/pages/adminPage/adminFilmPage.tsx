import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../authcontext/authContext";
import { NavBar } from "../../components/navBar"
import { adminFilmStore, createFilm, deleteSingleFilm, updateSingleFilm } from "../../stores/filmStore";
import { filmObject } from "../filmPage/homePage";
import "./adminFilmPage.css"


export const AdminFilmPage = () => {
    const [createForm, setCreateForm] = useState(false)
    const [title, setTitle] = useState("")
    const [title1, setTitle1] = useState("")
    const [genre, setGenre] = useState("")
    const [genre1, setGenre1] = useState("")
    const [price, setPrice] = useState("")
    const [price1, setPrice1] = useState("")
    const [description, setDescription] = useState("");
    const [description1, setDescription1] = useState("");
    const [films, setFilms] = useState<filmObject[]>([])
     const [filmId, setFilmId] = useState('');
    const [filmShow, setFilmShow] = useState(false)
    const [filmShow1, setFilmShow1] = useState(false);
    const [filmShow2, setFilmShow2] = useState(false);
    const {user} = useContext(AuthContext)
    const accessToken = user?.accessToken || "";

    //function for toggling the createForm 
    const toggleCreateForm = (e: React.SyntheticEvent) => {
        e.preventDefault()
        setCreateForm(prev => !prev)
    }

    //function for toggling the viewfilm field
    const toggleViewFilms = () => {
        setFilmShow(prev => !prev)
    }

    //function for toggling the updatefilm field
    const toggleUpdateFilmsShow = () => {
        setFilmShow1((prev) => !prev);
    }

    //function for toggling the sub-updateField
      const toggleUpdateFilmsShow2 = (film?: filmObject) => {
        setFilmShow2((prev) => !prev);
        if (film) {
            setTitle1(film.title)
            setPrice1(film.price)
            setGenre1(film.genre)
            setDescription1(film.description);
            setFilmId(film.filmId)
        }
      };

      //function that renders the createFilm form
    const createFilmForm = () => {
        return (
          <div className="form-body">
            <span>Title</span>{" "}
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />{" "}
            <br />
            <span>Genre</span>{" "}
            <input
              type="text"
              placeholder="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
            />{" "}
            <br />
            <span>Price</span>{" "}
            <input
              type="text"
              placeholder="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <br />
            <span>Description</span>{" "}
            <input
              type="text"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <br />
            <button type="button" onClick={createNewFilm}>
              Create Film
            </button>
          </div>
        );
    }

    //function that renders the updateFilmForm
    const updateFilmForm = () => {
        return (
            <div className="form-body">
            <span>Title</span>{" "}
            <input
              type="text"
              placeholder="title"
              value={title1}
              onChange={(e) => setTitle1(e.target.value)}
              required
            />{" "}
            <br />
            <span>Genre</span>{" "}
            <input
              type="text"
              placeholder="genre"
              value={genre1}
              onChange={(e) => setGenre1(e.target.value)}
              required
            />{" "}
            <br />
            <span>Price</span>{" "}
            <input
              type="text"
              placeholder="price"
              value={price1}
              onChange={(e) => setPrice1(e.target.value)}
              required
            />
            <br />
            <span>Description</span>{" "}
            <input
              type="text"
              placeholder="description"
              value={description1}
              onChange={(e) => setDescription1(e.target.value)}
              required
            />
            <br />
            <button type="button" onClick={() => updateFilm({ title: title1, genre: genre1, price: price1, description: description1 })}>
              Update Film
            </button>
            </div>
        )
    }

    //function for creating a new film by the admin
    const createNewFilm = async () => {
        const user = accessToken
        const createFilmDto = {title, genre, price, description}

        const newFilm = await createFilm(user, createFilmDto)
        console.log("successfull")
        setTitle("")
        setGenre("")
        setPrice("")
        setDescription("")
        return newFilm
    }


    //function for updating details about any particular film
    const updateFilm = async (filmData: Partial<filmObject>) => {
      if (!filmData ) {
        console.error("Film data is missing");
        return;
      }

      try {
        const user = accessToken;
        const { title, genre, price, description } = filmData;

        const updateFilmDto = {
          title: title || "",
          genre: genre || "",
          price: price || "",
          description: description || "",
        };

        const updatedFilm = await updateSingleFilm(user, filmId, updateFilmDto);

        console.log("Film updated successfully", updatedFilm);

        // Update the local state with the updated film details
        setFilms((prevFilms) =>
          prevFilms.map((film) =>
            film.filmId === filmId ? { ...film, ...updateFilmDto } : film
          )
        );

        // Optionally reset the form fields
        setTitle1("");
        setGenre1("");
        setPrice1("");
        setDescription1("");

        return updatedFilm;
      } catch (error) {
        console.error("Error updating film", error);
      }
    };


    //rendering all films  by communicating with the adminFilmStore endpoint
    useEffect(() => {
         const viewFilms = async () => {
           const saidFilms = await adminFilmStore(user.accessToken);
           setFilms(() => saidFilms);
         };
         viewFilms()
    }, [films])
   
    //function for deleting any single film
    const deleteFilm = async (filmId: string) => {
        const user = accessToken
        const film = await deleteSingleFilm(user, filmId)
        setFilms(films.filter(film => film.filmId !== filmId))
    }

    return (
      <div>
        <NavBar />
        <div>
          <h1>Films</h1>
          <div className="film-body">
            <div className="create">
              <div>
                <span>Create Film</span>
              </div>
              <div>
                <>
                  <button type="button" onClick={toggleCreateForm}>
                    Create
                  </button>
                </>
              </div>
            </div>
            {createForm && createFilmForm()}

            <div className="view">
              <div>
                <span>View Films</span>
              </div>
              <div>
                <button type="button" onClick={toggleViewFilms}>
                  View
                </button>
              </div>
            </div>
            {filmShow && (
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
                        <td>
                          <button
                            type="button"
                            onClick={() => deleteFilm(film.filmId)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="update">
              <div>
                <span>Update Films</span>
              </div>
              <div>
                <button type="button" onClick={toggleUpdateFilmsShow}>
                  Update
                </button>
              </div>
            </div>
            {filmShow1 && (
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
                        <td>
                          <button
                            type="button"
                            onClick={() => toggleUpdateFilmsShow2(film)}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {filmShow2 && updateFilmForm()}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}