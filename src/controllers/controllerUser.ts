import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../services/prisma';

export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { nome, cartao, password } = req.body;

    if (req.body) {
      const user = await prisma.user.findUnique({
        where: {
          cartao,
          nome,
        },
      });

      if (!user)
        return res.status(404).json({ warning: 'usuário não encontrado' });

      const passwordMatch = await bcrypt.compare(password, user.passwordHash);

      if (!passwordMatch)
        return res.status(401).json({ warning: 'credenciais incorretas' });

      const token = jwt.sign(
        {
          id: user.id,
          nome: user.nome,
          cartao: user.cartao,
        },
        'secrete',
        { expiresIn: '2h' }
      );

      res.status(200).json({
        id: user.id,
        nome: user.nome,
        cartao: user.cartao,
        token,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'erro ao realizar login com usuário',
    });
  }
};

export const createNewUser: RequestHandler = async (req, res) => {
  try {
    const { nome, cartao, setor, password } = req.body;

    if (req.body) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const registerNewUser = await prisma.user.create({
        data: {
          nome,
          cartao,
          setor,
          passwordHash,
        },
      });

      res.status(201).json({
        warning: 'Usuário criado com sucesso!',
        user: registerNewUser.nome,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      warning: 'usuário já cadastrado',
    });
  }
};
