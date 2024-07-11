import { PrismaClient } from '@prisma/client';
import { RequestHandler } from 'express';

const prisma = new PrismaClient();

export const checkAuthorizedForAmbulatory: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const user = await prisma.staff.findUnique({
        where: {
          id: +userId,
        },
        select: {
          setor: true,
        },
      });

      if (!user)
        return res.status(400).json({
          warning: 'você precisa estar logado para acessar essa area!',
        });
      if (user.setor !== 'ambulatorio')
        return res.status(401).json({ warning: 'acesso não autorizado' });

      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'erro interno ao verificar setor autorizado',
    });
  }
};

export const checkAuthorizedSetor: RequestHandler = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const user = await prisma.staff.findUnique({
        where: { id: +userId },
        select: { setor: true },
      });

      if (
        !user ||
        (user.setor !== 'segurança' && user.setor !== 'ambulatorio')
      ) {
        return res.status(403).json({
          error: 'acesso não autorizado',
        });
      }

      next();
    }
  } catch (error) {
    console.error('Erro ao verificar setor autorizado:', error);
    res
      .status(500)
      .json({ error: 'Erro interno ao verificar setor autorizado' });
  }
};
