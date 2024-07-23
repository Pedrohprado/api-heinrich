import fs from 'fs';
import path from 'path';

import { prisma } from '../services/prisma';

export const deleteManyImg = async (id: number) => {
  const pathOfImagens = await prisma.imagens.findMany({
    where: {
      registerId: id,
    },
    select: {
      path: true,
    },
  });

  if (!pathOfImagens) return;

  pathOfImagens.forEach((item) =>
    fs.unlinkSync(path.join(__dirname, '..', './public', item.path))
  );

  await prisma.imagens.deleteMany({
    where: {
      registerId: id,
    },
  });
};
