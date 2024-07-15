import { RequestHandler } from 'express';

export const showAllRegisterNeedValidationByTst: RequestHandler = async (
  req,
  res
) => {
  try {
    const { userId } = req.params;
  } catch (error) {}
};
