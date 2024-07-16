import { Router } from 'express';

import { routerAmbulatory } from './ambulatory';
import { routerRegister } from './register';
import { routerUser } from './user';
import { routerTst } from './tstrouter';

export const apiRouter = Router();

apiRouter.use('/ambulatory', routerAmbulatory);
apiRouter.use('/register', routerRegister);
apiRouter.use('/user', routerUser);
apiRouter.use('/tst', routerTst);
