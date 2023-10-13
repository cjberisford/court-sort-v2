import { PrismaClient } from '@prisma/client';

export default async (req, res) => {
  const prisma = new PrismaClient();

  try {
    const clubs = await prisma.club.findMany();
    const divisions = await prisma.division.findMany();
    const navData = {
      clubs: clubs,
      divisions: divisions
    }
    res.status(200).json(navData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  } finally {
    await prisma.$disconnect();
  }
};