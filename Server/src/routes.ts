import express from 'express';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { SubmitFeedbackFunction } from './functions/submit-feedback-function';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';

 export const routes = express.Router()


routes.post('/feedbacks', async (req, res) => {
    const {type, comment, screenshot} = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackFunction = new SubmitFeedbackFunction(
        prismaFeedbackRepository,
        nodemailerMailAdapter)

    await submitFeedbackFunction.execute({
        type, comment, screenshot
    })

    return res.status(201).send()
})