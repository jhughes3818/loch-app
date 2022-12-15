import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: any, res: any) {
  const { title, body, tag, user } = req.body;

  // let note: Prisma.Note;

  console.log(body);

  const note = await prisma.note.create({
    data: {
      title: title,
      content: body,
      tag: tag,
      authorId: user.id,
    },
  });

  res.status(200).json(note);
}
