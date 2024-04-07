// /api/cars.js
import { DB } from '../../../../lib/db';

export default async function handler(req, res) {
  const db = new DB();
  try {
    const cars = await db.getAllCars();
    res.status(200).json(cars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch cars' });
  }
}
