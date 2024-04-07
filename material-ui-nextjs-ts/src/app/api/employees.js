// api/employees.js
import { DB } from '../../../../lib/db';

export default async function handler(req, res) {
  const db = new DB();
  try {
    const employees = await db.getAllEmployees();
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
}
