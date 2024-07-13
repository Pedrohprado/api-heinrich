import { Router } from 'express';

import { verifyToken } from '../middleware/checkToken';
import { routerAmbulatory } from './ambulatory';
import { routerStaff } from './staff';
import { routerRegister } from './register';
import { routerUser } from './user';

export const apiRouter = Router();

apiRouter.use('/ambulatory', routerAmbulatory);
apiRouter.use('/staff', routerStaff);
apiRouter.use('/register', routerRegister);
apiRouter.use('/user', routerUser);

apiRouter.get('/verifytoken', verifyToken);
