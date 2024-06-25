import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const verifyToken = async (req: Request, res: Response) => {
  try {
    console.log('teste');
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    const decoded = jwt.verify(token, 'secrete') as {
      id: number;
      cartao: string;
    };

    const user = await prisma.staff.findUnique({
      where: {
        id: decoded.id,
        cartao: decoded.cartao,
      },
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json({
      id: user.id,
      nome: user.nome,
      cartao: user.cartao,
    });
  } catch (error) {
    console.error('Erro ao verificar token', error);
    res.status(500).json({ error: 'Erro ao verificar token' });
  }
};
