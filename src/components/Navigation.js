import axios from 'axios'
import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { authenticatedUser } from '../store'

export default function Navigation() {
    const history = useHistory();
    const [auth, setAuth]  = useRecoilState(authenticatedUser)

    const signOutHandler = async () => {
        await axios.post('/logout');

        setAuth({
            check: false,
            user: [],
        })
        history.push('/login')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3">
            <div className="container">
                <a className="navbar-brand" href="#">CRUD</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    { auth.check && 
                    <li className="nav-item">
                    <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
                    </li> }
                   
                </ul>
                {auth.check ? 
                
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {auth.user.name}
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li><a className="dropdown-item" href="#">Action</a></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><button className="dropdown-item" onClick={signOutHandler}>Log out</button></li>
                    </ul>
                    </li>
                </ul> 
                : 
                <ul className="navbar-nav mb-2 mb-lg-0">
                    <li className="nav-item">
                    <NavLink to="/login" className="nav-link" >Login</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to="/register" className="nav-link" >Register</NavLink>
                    </li>
                    
                </ul> }
                
                </div>
            </div>
            </nav>
        </div>
    )
}
