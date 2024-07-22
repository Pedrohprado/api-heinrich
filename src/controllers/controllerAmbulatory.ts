import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';

export const showRegistersValidationById: RequestHandler = async (req, res) => {
  try {
    const { userId } = req.params;

    if (userId) {
      const allRegisterValidationById = await prisma.register.findMany({
        where: {
          validadorAmbulatorioId: +userId,
        },
      });

      if (allRegisterValidationById)
        res.status(200).json(allRegisterValidationById);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ warning: 'nenhum registro validado por aqui!' });
  }
};

export const showAllRegisterNeedValidationAmbulatory: RequestHandler = async (
  req,
  res
) => {
  try {
    const allRegisterNeedValidation = await prisma.register.findMany({
      where: {
        validadorAmbulatorioId: null,
        OR: [
          {
            nivelDoOcorrido: 'primeiros socorros',
          },
          {
            nivelDoOcorrido: 'acidente',
          },
        ],
      },
    });
    if (allRegisterNeedValidation)
      res.status(200).json(allRegisterNeedValidation);
  } catch (error) {
    console.error('Erro ao mostrar registros', error);
    res.status(500).json({ error: 'Erro ao mostrar registros' });
  }
};

export const validationRegisterByAmbulatory: RequestHandler = async (
  req,
  res
) => {
  try {
    const { registerId, userId } = req.params;
    const body: {
      dataEntradaNoAmbulatorio: Date | string;
      enfermeiroResponsavel: string;
      parteDoCorpoAtingida: string;
      lateralidadeDoCorpo: string;
      NaturezaDaLesao: string;
      cid: string;
      diasDeAtestado: number;
      diasDeAfastamentoReal: number;
      unidadeDeAtendimento: string;
      descricaoDoAcidente: string;
      validadorAmbulatorioId: number | null;
      dataValidacaoAmbulatorio: Date | null;
    } = req.body; //preciso criar um type para isso
    console.log(body);

    if (req.params && req.body) {
      body.dataEntradaNoAmbulatorio = new Date(body.dataEntradaNoAmbulatorio);
      body.validadorAmbulatorioId = +userId;
      body.dataValidacaoAmbulatorio = new Date();
      const register = await prisma.register.update({
        where: {
          id: +registerId,
        },

        data: body,
      });

      if (register)
        res.status(201).json({ warning: 'registro validado com sucesso!' });
    }
  } catch (error) {
    console.log('Erro ao validar registro', error);
    res.status(500).json({ error: 'Erro ao validar registro' });
  }
};
