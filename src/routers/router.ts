import { Router } from 'express';
import {
  createNewRegister,
  deleteRegister,
  showAllRegister,
  showAllRegisterNeedValidation,
  showByIdRegister,
  updateRegister,
} from '../controllers/controllerRegister';
import {
  deleteStaff,
  loginStaff,
  registerNewStaff,
  updateStaff,
} from '../controllers/controllerStaff';
import { checkAuthorizedSetor } from '../middleware/checkSetor';
import { validationRegister } from '../controllers/controllerUpdateRegister';
import { verifyToken } from '../middleware/checkToken';

export const apiRouter = Router();

// routes for Staff
apiRouter.delete('/deletestaff/:idStaff', checkAuthorizedSetor, deleteStaff);
apiRouter.put('/updatestaff/:idStaff', checkAuthorizedSetor, updateStaff);
apiRouter.post(
  '/registerstaff/:userId',
  checkAuthorizedSetor,
  registerNewStaff
);
apiRouter.post('/loginstaff', loginStaff);

//routes for register
apiRouter.put('/updateregister/:id', updateRegister);
apiRouter.get('/showuniqueregister/:id', showByIdRegister);
apiRouter.get(
  '/showallregisterneedvalidation/:userId',
  checkAuthorizedSetor,
  showAllRegisterNeedValidation
);
apiRouter.get('/showallregister', showAllRegister);
apiRouter.post('/createnewregister', createNewRegister);

//routes for validation by staff the register
apiRouter.put(
  '/validationregister/:registroId/:staffId',
  checkAuthorizedSetor,
  validationRegister
);
apiRouter.get('/verifytoken', verifyToken);
