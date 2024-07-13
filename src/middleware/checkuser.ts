import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';
import jwt from 'jsonwebtoken';

//eu preciso criar uma rota que verifica o TOKEN gerado pelo loginUser
//para através do msm pegar informações do usuário

export const checkTokenUser: RequestHandler = async (req, res) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, 'secrete') as {
        id: number;
        nome: string;
        cartao: string;
      };

      const user = await prisma.user.findUnique({
        where: {
          id: decoded.id,
          nome: decoded.nome,
          cartao: decoded.cartao,
        },
      });

      if (!user)
        return res.status(404).json({ warning: 'Usuário não encontrado' });

      res.status(200).json({
        id: user.id,
        nome: user.nome,
        cartao: user.cartao,
      });
    } else {
      res.status(400).json({ warning: 'token não encontrado' });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'token inválido' });
  }
};
