import { Router } from 'express';
import {
  createNewRegister,
  deleteRegister,
  showAllRegister,
  showByIdRegister,
  updateRegister,
} from '../controllers/controllerNewRegister';

export const apiRouter = Router();

apiRouter.delete('/deleteregister/:id', deleteRegister);
apiRouter.put('/updateregister/:id', updateRegister);
apiRouter.get('/showuniqueregister/:id', showByIdRegister);
apiRouter.get('/showallregister', showAllRegister);
apiRouter.post('/createnewregister', createNewRegister);

// Rota para validar um registro por um staff
// app.put('/registros/:registroId/validar/:staffId', async (req: Request, res: Response) => {
//     const { registroId, staffId } = req.params;
//     try {
//       const registro = await prisma.register.update({
//         where: { id: parseInt(registroId, 10) },
//         data: {
//           validadorId: parseInt(staffId, 10),
//           dataValidacao: new Date(),
//         },
//       });

//       await prisma.staff.update({
//         where: { id: parseInt(staffId, 10) },
//         data: {
//           registrosValidados: {
//             increment: 1,
//           },
//         },
//       });

//       res.json(registro);
//     } catch (error) {
//       console.error('Erro ao validar registro:', error);
//       res.status(500).json({ error: 'Erro ao validar registro' });
//     }
//   });
