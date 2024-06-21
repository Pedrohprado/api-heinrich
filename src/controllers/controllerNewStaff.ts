import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    const { idStaff } = req.params;

    if (idStaff) {
      const statusDeleteStaff = await prisma.staff.delete({
        where: {
          id: +idStaff,
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

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const { idStaff } = req.params;
    const body = req.body;

    if (idStaff && body) {
      const statusUpdateStaff = await prisma.staff.update({
        where: {
          id: +idStaff,
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

export const registerNewStaff = async (req: Request, res: Response) => {
  try {
    const { nome, cartao, setor, password } = req.body;

    if (req.body) {
      const existingStaff = await prisma.staff.findUnique({
        where: {
          cartao,
        },
      });

      if (existingStaff)
        return res.status(409).json({
          warning: 'Usuário já existente!',
        });

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const registerNewStaff = await prisma.staff.create({
        data: {
          nome,
          cartao,
          setor,
          passwordHash,
        },
      });

      res.status(201).json({
        warning: 'Staff criado com sucesso',
        user: registerNewStaff,
      });
    }
  } catch (error) {
    console.log('Erro ao criar registrar staff', error);
    res.status(500).json({
      error: 'Erro ao criar registrar staff',
    });
  }
};

export const loginStaff = async (req: Request, res: Response) => {
  try {
    const { nome, cartao, setor, password } = req.body;

    if (req.body) {
      const staff = await prisma.staff.findUnique({
        where: {
          cartao,
          nome,
        },
      });

      if (!staff) {
        return res.status(404).json({
          warning: 'Staff não encontrado',
        });
      }

      const passwordMatch = await bcrypt.compare(password, staff.passwordHash);

      if (!passwordMatch)
        return res.status(401).json({ warning: 'credenciais incorreta' });

      const token = jwt.sign(
        {
          id: staff.id,
          cartao,
        },
        'secrete',
        { expiresIn: '1h' }
      );

      res.status(200).json({
        token,
        staff,
      });
    }
  } catch (error) {
    console.log('Erro ao realizar login', error);
    res.status(500).json({
      error: 'Erro ao realizar login',
    });
  }
};
