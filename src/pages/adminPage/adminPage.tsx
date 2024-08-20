import { useNavigate } from "react-router-dom"
import { NavBar } from "../../components/navBar"
import "./adminPage.css"

export const AdminPage = () => {
    const navigate = useNavigate()

    //navigateing to admin film page
    const navAdminFilm = () => {
        navigate('/adminFilmPage')
    }

    //navigating to admin report page
    const navAdminReport = () => {
      navigate("/adminReportsPage");
    };

    return (
      <div className="adminPage-container">
        <NavBar />
        <h2>Admin Page</h2>
        <div className="adminPage-body">
          <div className="admin-films">
            <span onClick={navAdminFilm}> 
                Films 
            </span>
          </div>
          <div className="admin-reports">
            <span onClick={navAdminReport}> 
                Reports 
            </span>
          </div>
        </div>
      </div>
    );
}