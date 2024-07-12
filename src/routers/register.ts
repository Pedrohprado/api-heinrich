import express from 'express';
import {
  createNewRegister,
  deleteRegister,
  showAllRegister,
  showByIdRegister,
  updateRegister,
} from '../controllers/controllerRegister';
import { checkAuthorizedSetor } from '../middleware/checkSetor';

export const routerRegister = express.Router();

routerRegister.delete('/deleteregister/:id', deleteRegister);
routerRegister.put('/updateregister/:id', updateRegister);
routerRegister.get('/showuniqueregister/:id', showByIdRegister);
routerRegister.get(
  '/showallregisterneedvalidation/:userId',
  checkAuthorizedSetor
);
routerRegister.get('/showallregister', showAllRegister);
routerRegister.post('/createnewregister', createNewRegister);
