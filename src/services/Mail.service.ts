import EmailQueue from "../queue/EmailQueue";

class MailService {
  public sendMail(): void {
    const mailObject = {
      to: "email@gmail.com", // Change to your recipient
      subject: "Sending with SendGrid is Fun",
      text: "and easy to do anywhere, even with Node.js",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
    };

    return EmailQueue.add(mailObject);
  }
}

export default new MailService();
