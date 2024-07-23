import { Router } from 'express';

import { routerAmbulatory } from './ambulatory';
import { routerRegister } from './register';
import { routerUser } from './user';
import { routerTst } from './tstrouter';
import { routerImagem } from './imagem';

export const apiRouter = Router();

apiRouter.use('/imagens', routerImagem);
apiRouter.use('/ambulatory', routerAmbulatory);
apiRouter.use('/register', routerRegister);
apiRouter.use('/user', routerUser);
apiRouter.use('/tst', routerTst);
