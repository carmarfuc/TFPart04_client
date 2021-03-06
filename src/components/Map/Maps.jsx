import React, { useState } from "react";
import GoogleMaps from "simple-react-google-maps";

export default function Maps() {
  const [sucursal, setSucursal] = useState({ lat: 3.4192575, lng: -76.5297973 });

  return (
    <div className="container">
      <GoogleMaps
        apiKey={"AIzaSyBtgetcmccyLOslWVMp31kyT-0p_lagi3E"}
        style={{ height: "400px", width: "100%" }}
        zoom={12}
        center={sucursal}
        markers={sucursal}
      />
      <br />
      <div className="items-center">
        <button onClick={() => setSucursal({ lat: 3.420916, lng: -76.529309 })} className='btn btn-primary w-2/5 mr-4'>Estadium: Cl. 10 #37 - Cali, Valle del Cauca - Colombia</button>
        <button onClick={() => setSucursal({ lat: -34.618674, lng: -58.361830 })} className='btn btn-primary w-2/5'>Juana Manso 1750 - Puerto Madero, Buenos Aires - Argentina</button>
      </div>
    </div>
  );
}