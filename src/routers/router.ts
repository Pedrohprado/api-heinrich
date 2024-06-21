import { Router } from 'express';
import {
  createNewRegister,
  deleteRegister,
  showAllRegister,
  showAllRegisterNeedValidation,
  showByIdRegister,
  updateRegister,
} from '../controllers/controllerNewRegister';
import {
  deleteStaff,
  loginStaff,
  registerNewStaff,
  updateStaff,
} from '../controllers/controllerNewStaff';

export const apiRouter = Router();

//routes for register
apiRouter.delete('/deleteregister/:id', deleteRegister);
apiRouter.put('/updateregister/:id', updateRegister);
apiRouter.get('/showuniqueregister/:id', showByIdRegister);
apiRouter.get('/showallregisterneedvalidation', showAllRegisterNeedValidation);
apiRouter.get('/showallregister', showAllRegister);
apiRouter.post('/createnewregister', createNewRegister);

// routes for Staff
apiRouter.delete('/deletestaff/:idStaff', deleteStaff);
apiRouter.put('/updatestaff/:idStaff', updateStaff);
apiRouter.post('/registerstaff', registerNewStaff);
apiRouter.post('/loginstaff', loginStaff);
