import express from 'express';
import { checkAuthorizedForTst } from '../middleware/checktst';
import {
  showAllRegisterNeedValidationByTst,
  showRegistersValidationTstById,
  validationRegisterByTst,
} from '../controllers/controllerTst';

export const routerTst = express.Router();

routerTst.get(
  '/showallregister/:userId',
  checkAuthorizedForTst,
  showAllRegisterNeedValidationByTst
);

routerTst.get(
  '/showregistervalidationbyid/:userId',
  checkAuthorizedForTst,
  showRegistersValidationTstById
);

routerTst.put(
  '/validationregister/:registerId/:userId',
  checkAuthorizedForTst,
  validationRegisterByTst
);
