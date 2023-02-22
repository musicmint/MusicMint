import React, {useContext} from 'react'
import '../../styles/navbar.module.css'

const NavBar = () => {
    return (
      <div className= "main-wrapper">
        <nav className="styles">
          <ul>
            <li>
              <a href="#Logo">Logo</a>
            </li>
            <li>
              <a href="#For Artists">For Artists</a>
            </li>
            <li>
              <a href="#Marketplace">Marketplace</a>
            </li>
            <li>
              <a href="#Search For Artists">Search For Artists</a>
            </li>
          </ul>
        </nav>
      </div>
    )

}

export default NavBar