import { useState } from 'react';

export default function Home() {
  const [kilometers, setKilometers] = useState(''); //se crea la variable para mandar a la api
  const [medio, setMedio] = useState('');
  const [usuario, setUsuario] = useState('');
  const [result, setResult] = useState(null); //variable para el resultado del calculo


  const handleSubmit = async () => {
  const res = await fetch("http://localhost:8000/calcularhuella", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      usuario: usuario, 
      medio: medio,
      kilometros: parseFloat(kilometers),
    }),
  });

  const data = await res.json();

  if (res.ok) {
    setResult(data.huella);
  } else {
    alert(data.detail || "Error en la solicitud");
  }
};
  
const [registros, setRegistros] = useState([]);

const obtenerRegistros = async () => {
  const res = await fetch("http://localhost:8000/resultados");
  const data = await res.json();
  setRegistros(data);
};
const Recomendacion = (huella) => {
  if (huella === 0) {
    return "¡Excelente! Usaste transporte sin emisiones, como bicicleta o caminar.";
  } else if (huella < 7) {
    return "Muy bien. Puedes reducir aún más tu huella usando transporte ecológico.";
  } else if (huella < 15) {
    return "Considera usar más el transporte público.";
  } else {
    return "Intenta evitar los transportes contaminantes siempre que puedas. Caminar, usar bicicleta o transporte público puede ayudar.";
  }
};

  /*const handleSubmit = async () => {
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
*/
  return (
    <div style={{ padding: "2rem" }}>
      <h1 className='font-semibold'>Calculadora de Huella de Carbono</h1>
      <p>Ingresa tu nombre de usuario:</p>
      <input type='text'
      inputMode='text'
      pattern='[0-9]'
      value={usuario}
      onChange={(e) => setUsuario(e.target.value)}/>
      <p>Elige el tipo de transporte:</p>
      <select value={medio} onChange={(e) => setMedio(e.target.value)}>
      <option value="auto">Auto (0.21 kg/km)</option>
      <option value="bus">Bus (0.10 kg/km)</option>
      <option value="bicicleta">Bicicleta (0.00 kg/km)</option>
      <option value="tren">Tren (0.04 kg/km)</option>
</select>
      <p>Ingresa los kilometros recorridos esta semana: </p>
      <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={kilometers}
  onChange={(e) => setKilometers(e.target.value)} // se piden los datos de los kilometros y se especifica el valor para mandarlo a la api
 
/>
<p></p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded padding:5px" onClick={handleSubmit}>Calcular</button> 
     

     {result !== null && (
  <>
    <p>Huella estimada: {result} kg de CO₂</p>
    <p>Recomendación: {Recomendacion(result)}</p>
  </>
)}
 

      <button
  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded mt-4 padding:5px"
  onClick={obtenerRegistros}
>
  Ver todos los registros
</button>
      {registros.length > 0 && (
  

<div className="overflow-x-auto mt-4">
  <div
    className="flex space-x-4"
    style={{
      minWidth: registros.length > 10 ? "1000px" : "auto",
      transition: "transform 0.3s ease-in-out",
    }}
  >
    {registros.map((registro, index) => (
      <div
        key={index}
        className="min-w-[250px] bg-white border rounded shadow p-4"
      >
        <p><strong>Usuario:</strong> {registro.usuario}</p>
        <p><strong>Medio:</strong> {registro.medio}</p>
        <p><strong>Kilómetros:</strong> {registro.kilometros}</p>
        <p><strong>Huella:</strong> {registro.huella} kg CO₂</p>
      </div>
    ))}
  </div>
</div>
)}
    </div> // boton para mandar el dato ingresado a la api y donde se recibe los datos calculados de la api

    
  );
  


}
