import express from 'express';
import {
  createNewRegister,
  deleteRegister,
  ListRegisterByUser,
  // showAllRegister,
  showByIdRegister,
  updateRegister,
} from '../controllers/controllerRegister';
import { checkTokenUserForNext } from '../middleware/checkuser';
import { upload } from '../services/multer';

export const routerRegister = express.Router();

routerRegister.get(
  '/showregisterbyuser/:idUser',
  checkTokenUserForNext,
  ListRegisterByUser
);

routerRegister.post(
  '/createnewregister/:userId',
  checkTokenUserForNext,
  upload.array('imagens', 3),
  createNewRegister
);

routerRegister.put(
  '/updateregister/:id',
  checkTokenUserForNext,
  updateRegister
);
routerRegister.delete(
  '/deleteregister/:id',
  checkTokenUserForNext,
  deleteRegister
);
routerRegister.get(
  '/showuniqueregister/:id',
  checkTokenUserForNext,
  showByIdRegister
);

// routerRegister.get('/showallregister', showAllRegister);
