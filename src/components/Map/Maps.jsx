import React, { useState } from "react";
import GoogleMaps from "simple-react-google-maps";
import axios from "axios";

async function location(){
  return await axios.get(`http://localhost:3001/location`)
    .then(resp => sucursal = resp.data )
    .then(() => {
      suc = sucursal && sucursal.map(s=>{return {lat:s.lat,lng:s.lng}})
    } )
    .catch(error => console.log('Error: ', error))
}

let sucursal,suc,p1=location()

export default function Maps(){
  const [sucursals, setSucursals] = useState(0);
  return (
    <div className="container">
      <select key="22" name="listaOrden" id="listaOrden" onChange={(e)=>setSucursals(e.currentTarget.value)} >
        {sucursal.map((s,i)=>{
            return <option key={`map30${i}`} value={i} >{s.name}</option>
        })}
      </select>
      <br/>
      <GoogleMaps
        apiKey={"AIzaSyBDaeWicvigtP9xPv919E-RNoxfvC-Hqik"}
        style={{ height: "400px", width: "100%" }}
        zoom={12}
        
        center={{lat: 3.4168994,lng: -76.5260932}}
        markers={suc}
        
      />
    </div>
  );
}