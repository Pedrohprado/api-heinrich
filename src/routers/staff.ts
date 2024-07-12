import express from 'express';
import { checkAuthorizedSetor } from '../middleware/checkSetor';
import {
  deleteStaff,
  loginStaff,
  registerNewStaff,
  updateStaff,
} from '../controllers/controllerStaff';

export const routerStaff = express.Router();

routerStaff.delete('/deletestaff/:idStaff', checkAuthorizedSetor, deleteStaff);
routerStaff.put('/updatestaff/:idStaff', checkAuthorizedSetor, updateStaff);
routerStaff.post(
  '/registerstaff/:userId',
  checkAuthorizedSetor,
  registerNewStaff
);
routerStaff.post('/loginstaff', loginStaff);
