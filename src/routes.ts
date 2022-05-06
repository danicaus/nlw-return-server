import express from 'express';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-usecase';
import { NodeMailerAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const nodeMailerAdapter = new NodeMailerAdapter();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(prismaFeedbacksRepository, nodeMailerAdapter); 

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  
  return res.status(201).send()
})
