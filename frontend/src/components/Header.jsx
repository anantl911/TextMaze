import {React, useEffect} from 'react'

function Footer(props) {
  const {colorMode, setColorMode} = props.mode;
  
  return (
    <div>
        <nav className={`navbar navbar-expand-lg ${colorMode === 'dark' ? "" : 'bg-primary'}`} style={{
          backgroundColor: colorMode === 'dark' ? "rgb(10, 36, 75)" : ""
        }}>
        <div className="container-fluid">
            <a className="navbar-brand text-light fs-2" href="/">textMaze</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
            <div className="d-flex flex-row justify-content-between w-100">  
            <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fs-5">
                <li className="nav-item">
                <a className={`nav-link active text-white`} aria-current="page" href="/">Home</a>
                </li>
                <li className="nav-item">
                <a className="nav-link text-light te" href="/About">About</a>
                </li>
            </ul>
            </div>
            <div style={{cursor: "pointer"}}>
              <div className="form-check form-switch d-flex flex-column" style={{position: "relative", left: "40px", userSelect: "none"}}>
              <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={() => setColorMode(colorMode === 'dark' ? 'light' : 'dark')} checked={colorMode === 'dark'}/>
              <label className="form-check-label text-light" style={{ fontSize: "15px", position: "relative", right: "60px", top:"5px"}} htmlFor="flexSwitchCheckChecked">{colorMode.charAt(0).toUpperCase() + colorMode.slice(1)} Mode!</label>
            </div>
            </div>
            </div>
            </div>
        </div>
        </nav>
    </div>
  )
}

export default Footer
