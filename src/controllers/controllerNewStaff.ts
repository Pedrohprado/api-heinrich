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
    const body = req.body;

    if (body) {
      const statusRegisterNewStaff = await prisma.staff.create({
        data: body,
      });

      if (statusRegisterNewStaff) {
        console.log(statusRegisterNewStaff);
        res.status(200).json({
          warning: 'registrado com sucesso!',
        });
      }
    }
  } catch (error) {
    console.log('Erro ao criar registrar staff', error);
    res.status(500).json({
      error: 'Erro ao criar registrar staff',
    });
  }
};
