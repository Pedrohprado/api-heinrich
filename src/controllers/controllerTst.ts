import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';

export const showRegistersValidationTstById: RequestHandler = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const allRegisterValidationById = await prisma.register.findMany({
        where: {
          validadorTSTId: +userId,
        },
      });

      if (allRegisterValidationById) {
        res.status(200).json(allRegisterValidationById);
      } else {
        res.status(400).json({
          warning: 'nenhum registro validado por esse usuário ainda',
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ warning: 'nenhum registro validado por aqui!' });
  }
};

export const showAllRegisterNeedValidationByTst: RequestHandler = async (
  req,
  res
) => {
  try {
    const allRegisterNeedValidation = await prisma.register.findMany({
      where: {
        validadorTSTId: null,
        NOT: {
          validadorAmbulatorioId: null,
        },
      },
    });
    if (allRegisterNeedValidation) {
      res.status(200).json(allRegisterNeedValidation);
    } else {
      res.status(400).json({
        warning: 'nenhum registro encontrado',
      });
    }
  } catch (error) {
    console.error('Erro ao mostrar registros', error);
    res.status(500).json({ error: 'Erro ao mostrar registros' });
  }
};

export const validationRegisterByTst: RequestHandler = async (req, res) => {
  try {
    const { registerId, userId } = req.params;
    console.log(registerId);
    const body: {
      probabilidade: number;
      gravidade: number;
      fatorRiscoAcidente: number;
      dataValidacaoTST: Date;
      validadorTSTId: number;
    } = req.body;

    if (registerId && req.body) {
      body.dataValidacaoTST = new Date();
      body.validadorTSTId = +userId;
      const register = await prisma.register.update({
        where: {
          id: +registerId,
        },
        data: body,
      });

      if (register) {
        res.status(200).json({
          warning: 'registro validado com sucesso!',
        });
      } else {
        res.status(400).json({
          warning: 'erro ao validar registro',
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao validar registro' });
  }
};
