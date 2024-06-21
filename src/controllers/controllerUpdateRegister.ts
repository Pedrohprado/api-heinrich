import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const validationRegister = async (req: Request, res: Response) => {
  try {
    const { registroId, staffId } = req.params;

    if (registroId && staffId) {
      const registro = await prisma.register.update({
        where: {
          id: +registroId,
        },

        data: {
          validadorId: +staffId,
          dataValidacao: new Date(),
        },
      });

      await prisma.staff.update({
        where: { id: +staffId },
        data: {
          registrosValidados: {
            increment: 1,
          },
        },
      });

      res.status(201).json(registro);
    }
  } catch (error) {
    console.error('Erro ao validar registro', error);
    res.status(500).json({ error: 'Erro ao validar registro' });
  }
};
