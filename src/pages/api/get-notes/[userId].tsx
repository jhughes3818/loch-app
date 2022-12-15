import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(req: any, res: any) {
  console.log(req.query.userId);
  const userId = req.query.userId;
  //Query the database for all notes related to user by id
  const prisma = new PrismaClient();
  const notes = await prisma.note.findMany({
    where: {
      authorId: userId,
    },
  });

  res.status(200).json(notes);
}
