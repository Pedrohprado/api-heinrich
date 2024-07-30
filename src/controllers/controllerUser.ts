import { RequestHandler } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../services/prisma';

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;
    const body = req.body;

    if (userId && body) {
      const statusUpdateStaff = await prisma.user.update({
        where: {
          id: +userId,
        },
        data: body,
      });

      if (statusUpdateStaff)
        res.status(201).json({
          warning: 'staff atualizado com sucesso!',
        });
    }
  } catch (error) {
    console.error('Erro ao atualizar staff', error);
    res.status(500).json({ error: 'Erro ao atualizar staff' });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const statusDeleteStaff = await prisma.user.delete({
        where: {
          id: +userId,
        },
      });

      if (statusDeleteStaff)
        res.status(200).json({
          warning: 'Staff deletado com sucesso',
        });
    }
  } catch (error) {
    console.error('Erro ao deletar staff', error);
    res.status(500).json({ error: 'Erro ao deletar staff' });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const SECRETE_KEY: string =
    process.env.SECRETE_KEY || '36a5910394733b975acf825be4b26c5e';
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
          role: user.role,
        },
        SECRETE_KEY,
        { expiresIn: '2h' }
      );

      res.status(200).json({
        id: user.id,
        nome: user.nome,
        cartao: user.cartao,
        role: user.role,
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
    const { nome, cartao, setor, role, password } = req.body;

    if (req.body) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const registerNewUser = await prisma.user.create({
        data: {
          nome,
          cartao,
          setor,
          role,
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
