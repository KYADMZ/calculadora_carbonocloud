import { useState } from 'react';

export default function Home() {
  const [kilometers, setKilometers] = useState(''); //se crea la variable para mandar a la api
  const [result, setResult] = useState(null); //variable para el resultado del calculo

  const handleSubmit = async () => {
    const res = await fetch('/api/carbono', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kilometers }),
    }); //conexión con la api y el metodo post para recibir los datos despues del calculo

    const data = await res.json();
    if (res.ok) {
      setResult(data.carbonFootprint);
    } else {
      alert(data.error);
    }
  }; //se reciben los datos de la api

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Calculadora de Huella de Carbono</h1>
      <p>Ingresa los kilometros recorridos esta semana: </p>
      <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={kilometers}
  onChange={(e) => setKilometers(e.target.value)} // se piden los datos de los kilometros y se especifica el valor para mandarlo a la api
 
/>

      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleSubmit}>Calcular</button> 
     

      {result !== null && (
        <p>Huella estimada: {result} kg de CO₂</p>
      )} 
    </div> // boton para mandar el dato ingresado a la api y donde se recibe los datos calculados de la api
  );
}
