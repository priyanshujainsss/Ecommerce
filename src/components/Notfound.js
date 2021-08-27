import React from 'react'
import Navbar from './Navbar'

const Notfound = () => {
    return (
        <div style={{ 
            position: "absolute",
            left: "50%",
            top: "50%",
            WebkitTransform: "translate(-50%, -50%)",
            transform: "translate(-50%, -50%)",
            fontSize:"24px"}}>
                <img src={"https://i.pinimg.com/originals/86/41/80/86418032b715698a4dfa6684b50c12af.gif"}
                 maxWidth="300" maxHeight="250"
                 width="auto" height="400" 
                 />
         
        </div>
    )
}

export default Notfound
