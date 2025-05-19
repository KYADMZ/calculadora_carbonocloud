export default function handler(req, res) {
  if (req.method === 'POST') {
    const { kilometers } = req.body;// se recibe el dato con valor "kilometers"

    const kmNum = parseFloat(kilometers);
    if (isNaN(kmNum) || kmNum < 0) {
      return res.status(400).json({ error: 'Kilómetros inválidos' }); //se da un error si el dato es invalido
    }

    
    const carbonFootprint = kmNum * 0.192; //se multiplica el valor mandado para conseguir la huella de carbono

    return res.status(200).json({ carbonFootprint }); //se envía el resultado a la página
  } else {
    res.setHeader('Allow', ['POST']); //permiso para metodos "POST"
    res.status(405).end(`Método ${req.method} no permitido`); //si el metodo no es "POST", no es permitido
  }
}
