import React,{useState, useEffect} from 'react';
import axios from "axios"

export default function Character(props) {
   
    const {char} =props
    const pathImg = char.thumbnail.path + "."+char.thumbnail.extension
    
    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top rounded-circle" src={pathImg} alt="Character"  />
            <div className="card-body">
                <h5 className="card-title">{char.name}</h5>
               
                
            </div>
        </div>
    )
}
