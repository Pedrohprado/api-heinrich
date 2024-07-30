import express from 'express';
import { deleteImageById } from '../controllers/controllerImagens';
export const routerImagem = express.Router();

routerImagem.delete('/deleteuniqueimage/:imageId', deleteImageById);
