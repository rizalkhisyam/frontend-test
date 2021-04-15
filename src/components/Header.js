import React from 'react'

export default function Header(props) {
    return (
        <div className="bg-light py-5 mb-3 border-bottom">
               <div className="container">
                   <div className="row">
                       <div className="col-md-6">
                           <h3>{props.title}</h3>
                               {props.children}
                       </div>
                   </div>
               </div>
           </div>
    )
}
