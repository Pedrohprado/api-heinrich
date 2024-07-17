import express from 'express';
import { createNewUser, loginUser } from '../controllers/controllerUser';
import { checkTokenUser } from '../middleware/checkuser';

export const routerUser = express.Router();

routerUser.post('/createnewuser', createNewUser);
routerUser.post('/login', loginUser);

//use this router for validation token, when user stay log by token
routerUser.get('/token', checkTokenUser);
