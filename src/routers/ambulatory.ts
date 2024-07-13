import express from 'express';
import {
  showAllRegisterNeedValidationAmbulatory,
  validationRegisterByAmbulatory,
} from '../controllers/controllerAmbulatory';
import { checkAuthorizedForAmbulatory } from '../middleware/checkambulatory';

export const routerAmbulatory = express.Router();

routerAmbulatory.get(
  '/showallregister/:userId',
  checkAuthorizedForAmbulatory,
  showAllRegisterNeedValidationAmbulatory
);

routerAmbulatory.put(
  '/validationregister/:registerId/:userId',
  checkAuthorizedForAmbulatory,
  validationRegisterByAmbulatory
);
