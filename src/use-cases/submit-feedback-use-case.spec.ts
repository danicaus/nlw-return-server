import { SubmitFeedbackUseCase } from "./submit-feedback-usecase";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
) 

describe("submit feedback", () => {
  it('should be able to submit a feedback', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64eruiqwor8930gru89es0byrf7s0rgvy70',
    })).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  })

  it('Should not be able to submit a feedback without a type', async () => {
    await expect(submitFeedback.execute({
      type: '',
      comment: 'Example comment',
      screenshot: 'data:image/png;base64eruiqwor8930gru89es0byrf7s0rgvy70',
    })).rejects.toThrow();
  })

  it('Should not be able to submit a feedback without a comment', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64eruiqwor8930gru89es0byrf7s0rgvy70',
    })).rejects.toThrow();
  })

  it('Should not be able to submit a feedback without an invalid screenshot', async () => {
    await expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'Test comment',
      screenshot: 'blah.png',
    })).rejects.toThrow();
  })
})
