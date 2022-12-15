import { Prisma, PrismaClient } from "@prisma/client";

export default async function handler(req: any, res: any) {
  console.log(req);
  //Query the database for all notes related to user by id
  const prisma = new PrismaClient();
  const notes = await prisma.note.findMany({
    where: {
      authorId: req.body.user.id,
    },
  });

  res.status(200).json(notes);
}
