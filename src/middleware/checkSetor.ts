import { PrismaClient } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

const prisma = new PrismaClient();

export const checkAuthorizedSetor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
