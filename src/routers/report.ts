import express from 'express';
import {
  countLevelOfAcident,
  listAllPartsOfBody,
} from '../controllers/controllerReport';

export const routerReport = express.Router();

routerReport.get('/countbodyparts', listAllPartsOfBody);
routerReport.get('/countlevelofacident', countLevelOfAcident);
