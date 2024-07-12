import { Router } from 'express';

import { verifyToken } from '../middleware/checkToken';
import { routerAmbulatory } from './ambulatory';
import { routerStaff } from './staff';
import { routerRegister } from './register';

export const apiRouter = Router();

apiRouter.use('/ambulatory', routerAmbulatory);
apiRouter.use('/staff', routerStaff);
apiRouter.use('/register', routerRegister);

apiRouter.get('/verifytoken', verifyToken);
