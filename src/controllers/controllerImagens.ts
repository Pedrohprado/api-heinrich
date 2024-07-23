import fs from 'fs';
import path from 'path';

import { RequestHandler } from 'express';
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

export const deleteImageById: RequestHandler = async (req, res) => {
  try {
    const { imageId } = req.params;

    if (imageId) {
      const statusDelete = await prisma.imagens.delete({
        where: {
          id: +imageId,
        },
      });
      if (statusDelete) {
        fs.unlinkSync(
          path.join(__dirname, '..', './public', statusDelete.path)
        );

        res.status(200).json({ warning: 'imagem deletada!' });
      }
    }
  } catch (error) {
    res.status(500).json({ warning: 'erro interno do servidor' });
    console.log(error);
  }
};
