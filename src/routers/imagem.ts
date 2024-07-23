import express from 'express';
import { checkTokenUser } from '../middleware/checkuser';
import { deleteImageById } from '../controllers/controllerImagens';
export const routerImagem = express.Router();

routerImagem.delete('/deleteuniqueimage', checkTokenUser, deleteImageById);
