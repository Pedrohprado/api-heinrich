import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';

export const listAllPartsOfBody: RequestHandler = async (req, res) => {
  try {
    const allPartsOfBody = await prisma.bodyParts.groupBy({
      by: ['parte'],
      _count: {
        parte: true,
      },
    });

    if (allPartsOfBody) res.status(200).json(allPartsOfBody);
  } catch (error) {
    console.log(error);
    res.status(500).json({ warning: 'erro no servidor' });
  }
};

export const countLevelOfAcident: RequestHandler = async (req, res) => {
  try {
    const levelsOfRegister = await prisma.register.groupBy({
      by: ['nivelDoOcorrido'],
      _count: {
        nivelDoOcorrido: true,
      },
    });
    if (levelsOfRegister) res.status(200).json(levelsOfRegister);
  } catch (error) {
    console.log(error);
    res.status(500).json({ warning: 'erro no servidor' });
  }
};
