import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';

export const checkAuthorizedForAmbulatory: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;
    if (userId) {
      const user = await prisma.user.findUnique({
        where: {
          id: +userId,
        },
        select: {
          setor: true,
          role: true,
        },
      });

      if (!user) {
        return res.status(400).json({
          warning: 'você precisa estar logado para acessar essa area!',
        });
      }
      console.log(user);
      if (user.setor === 'ambulatorio' && user.role === 'STAFFAMBULATORY') {
        next();
      } else {
        return res.status(401).json({ warning: 'acesso não autorizado' });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'erro interno ao verificar setor autorizado',
    });
  }
};
