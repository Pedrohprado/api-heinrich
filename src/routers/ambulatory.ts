import express from 'express';
import {
  showAllRegisterNeedValidationAmbulatory,
  showRegistersValidationById,
  validationRegisterByAmbulatory,
} from '../controllers/controllerAmbulatory';
import { checkAuthorizedForAmbulatory } from '../middleware/checkambulatory';

export const routerAmbulatory = express.Router();

routerAmbulatory.get(
  '/showallregister/:userId',
  checkAuthorizedForAmbulatory,
  showAllRegisterNeedValidationAmbulatory
);

routerAmbulatory.get(
  '/showregistervalidationbyid/:userId',
  checkAuthorizedForAmbulatory,
  showRegistersValidationById
);

//rota para deletar o registro, posso utilizar o   '/deleteregister/:id'
//rota para alterar o registro utilizar a /updateregister/:id

routerAmbulatory.put(
  '/validationregister/:registerId/:userId',
  checkAuthorizedForAmbulatory,
  validationRegisterByAmbulatory
);
