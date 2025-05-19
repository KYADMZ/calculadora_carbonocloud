import { useState } from 'react';

export default function Home() {
  const [kilometers, setKilometers] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    const res = await fetch('/api/carbono', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kilometers }),
    });

    const data = await res.json();
    if (res.ok) {
      setResult(data.carbonFootprint);
    } else {
      alert(data.error);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Calculadora de Huella de Carbono</h1>
      <p>Ingresa los kilometros recorridos esta semana: </p>
      <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={kilometers}
  onChange={(e) => setKilometers(e.target.value)}
 
/>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={handleSubmit}>Calcular</button>

      {result !== null && (
        <p>Huella estimada: {result} kg de CO₂</p>
      )}
    </div>
  );
}
