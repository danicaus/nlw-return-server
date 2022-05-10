import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/Feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {type, comment, screenshot} = request;

    if(!type) {
      throw new Error('Falta o tipo de feedback')
    }
    
    if(!comment) {
      throw new Error('Faltando comentário')
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Screenshot inválido')
    }
    
    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })
    
    await this.mailAdapter.sendMail({
      subject: "Novo feedback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>Tipo de feedback: ${type} </p>`,
          `<p>Comentário: ${comment} </p>`,
          screenshot ? `<img src=${screenshot} alt="Imagem enviada pelo usuário" />` : null,
        `</div>`,
      ].join('\n')
    })
  }

}