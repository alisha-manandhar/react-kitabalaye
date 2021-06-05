import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {logout} from "../services/userServices"
class NavBar extends Component {
 
  handleLogout = async()=>{
      await logout()
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      localStorage.removeItem('userId')

      localStorage.removeItem('userImage')

      window.location = "/login"

  }
    
  render() {
    return (
        <React.Fragment>
      <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
        <NavLink to="/" className="navbar-brand">
          <h4>
            <strong className="pl-2" style={{ color: "rgb(25, 25, 99)" }}>
             
              Dwit Kitabalaya
            </strong>
          </h4>
        
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-4">
            <li className="nav-item mx-4">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-4">
            <NavLink className="nav-link" to="/addbook">
                Addbook
              </NavLink>
            </li>
            <li className="nav-item mx-4">
              <NavLink className="nav-link" to="/history">
                History
              </NavLink>
            </li>
            <li className="nav-item dropdown mx-4">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <img src={"http://localhost:8000/storage/"+ localStorage.getItem("userImage")} className="rounded-circle border border-light" alt="..." style={{width:"30px", height:"30px",objectFit:"cover"}}/> {localStorage.getItem('username')}
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/me">
                  Profile
                </NavLink>
                <li className="dropdown-item"  onClick={this.handleLogout}>
                  Logout
                </li>
              </div>
            </li>
          </ul>
          <div className="d-none d-lg-inline form">
            <form className="row g-3 bg-light">
              <div className="col-auto">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Search books"
                />
              </div>
              <div className="col-auto">
                <button
                  className="btn btn-outline-success text-center"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <form className="row d-lg-none d-xs-block position-fixed">
   
  <div className="col-8">
    
    <input type="text" className="form-control" name="searchtext" placeholder="Search books" />
  </div>
  <div className="col-auto">
  <button className="btn btn-secondary" type="submit">  Search </button>
  </div>
</form>  

    </React.Fragment>
    );
  }
}

export default NavBar;
