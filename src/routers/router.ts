import { Router } from 'express';

import { routerAmbulatory } from './ambulatory';
import { routerRegister } from './register';
import { routerUser } from './user';
import { routerTst } from './tstrouter';
import { routerImagem } from './imagem';
import { routerReport } from './report';

export const apiRouter = Router();

apiRouter.use('/report', routerReport);
apiRouter.use('/imagens', routerImagem);
apiRouter.use('/ambulatory', routerAmbulatory);
apiRouter.use('/register', routerRegister);
apiRouter.use('/user', routerUser);
apiRouter.use('/tst', routerTst);
