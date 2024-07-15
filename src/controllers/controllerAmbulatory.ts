import { RequestHandler } from 'express';
import { prisma } from '../services/prisma';

export const showAllRegisterNeedValidationAmbulatory: RequestHandler = async (
  req,
  res
) => {
  try {
    const allRegisterNeedValidation = await prisma.register.findMany({
      where: {
        validadorAmbulatorioId: null,
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
      dataEntradaNoAmbulatorio: Date;
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
      body.validadorAmbulatorioId = +userId;
      body.dataValidacaoAmbulatorio = new Date();
      const registro = await prisma.register.update({
        where: {
          id: +registerId,
        },

        data: body,
      });

      res.status(201).json(registro);
    }
  } catch (error) {
    console.log('Erro ao validar registro', error);
    res.status(500).json({ error: 'Erro ao validar registro' });
  }
};
