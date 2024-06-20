import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const deleteRegister = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const statusDeleteRegister = await prisma.register.delete({
        where: {
          id: +id,
        },
      });
      if (statusDeleteRegister)
        res.json(200).json({
          warning: 'Registro deletado com sucesso!',
        });
    }
  } catch (error) {
    console.error('Erro ao deletar registro', error);
    res.status(500).json({ error: 'Erro ao deletar registro' });
  }
};

export const updateRegister = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    if (id && body) {
      const statusUpdateRegister = await prisma.register.update({
        where: {
          id: +id,
        },
        data: body,
      });

      if (statusUpdateRegister)
        res.status(201).json({
          warning: 'registro atualizado com sucesso!',
        });
    }
  } catch (error) {
    console.error('Erro ao atualizar registro', error);
    res.status(500).json({ error: 'Erro ao atualizar registro' });
  }
};

export const showByIdRegister = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id) {
      const register = await prisma.register.findUnique({
        where: {
          id: +id,
        },
      });

      if (register) res.status(200).json(register);
    }
  } catch (error) {
    console.error('Erro ao mostrar registro', error);
    res.status(500).json({ error: 'Erro ao mostrar registro' });
  }
};

export const showAllRegister = async (req: Request, res: Response) => {
  try {
    const allRegister = await prisma.register.findMany();

    if (allRegister) res.status(200).json(allRegister);
  } catch (error) {
    console.error('Erro ao mostrar registros', error);
    res.status(500).json({ error: 'Erro ao mostrar registros' });
  }
};

export const createNewRegister = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    if (body) {
      const statusNewRegister = await prisma.register.create({
        data: body,
      });

      if (statusNewRegister) {
        console.log(statusNewRegister);
        res.status(200).json({
          warning: 'novo registro criado com sucesso!',
        });
      }
    }
  } catch (error) {
    console.error('Erro ao criar novo registro', error);
    res.status(500).json({ error: 'Erro ao criar novo registro' });
  }
};
