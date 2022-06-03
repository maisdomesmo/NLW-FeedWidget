import { Mailadapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackFunctionRequest {
    type: string,
    comment: string,
    screenshot?: string   
}

export class SubmitFeedbackFunction {
    constructor (
       private feedbackRepository: FeedbacksRepository,
       private mailAdapter: Mailadapter
    ){}

    async execute(request: SubmitFeedbackFunctionRequest){
        const {type, comment, screenshot} = request;

        if (screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('Invalid ScreenShot format')
        }

        if (!type){
            throw new Error('Type is required')
        }
        if (!comment){
            throw new Error('Comment is required')
        }


        await this.feedbackRepository.create({
            type,
            comment,
            screenshot
        })

        await this.mailAdapter.sendMail({
            subject: 'Novo Feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,  
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src=${screenshot} />` : ``,
                `</div>`,
            ].join('\n')
        })

    }
}