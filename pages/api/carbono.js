export default function handler(req, res) {
  if (req.method === 'POST') {
    const { kilometers } = req.body;

    const kmNum = parseFloat(kilometers);
    if (isNaN(kmNum) || kmNum < 0) {
      return res.status(400).json({ error: 'Kilómetros inválidos' });
    }

    // Supongamos que 1 km equivale a 0.21 kg CO2 (valor ejemplo)
    const carbonFootprint = kmNum * 0.21;

    return res.status(200).json({ carbonFootprint });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} no permitido`);
  }
}
