import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailFactory } from './factories/email.factory';

@Injectable()
export class EmailService {
  private transporter;

  constructor(private readonly emailFactory: EmailFactory) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.APP_PASSWORD,  
      },
    });
  }

  private async sendEmail(to: string, subject: string, body: string): Promise<void> {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: to,  
        subject: subject,  
        html: body, 
      };
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  async sendWelcomeEmail(userName: string, to: string): Promise<void> {
    const welcomeEmailBody = await this.emailFactory.createWelcomeEmail(userName);
    await this.sendEmail(to, 'Welcome to Our Service!', welcomeEmailBody);
  }
  async sendForgotPasswordEmail(userName: string, to: string, resetLink: string): Promise<void> {
    const forgotPasswordBody = await this.emailFactory.createForgotPasswordEmail(userName, resetLink);
    await this.sendEmail(to, 'Reset Your Password', forgotPasswordBody);
  }

  async sendVerifyEmail(userName: string, to: string, verificationLink: string): Promise<void> {
    const verifyEmailBody = await this.emailFactory.createVerifyEmailEmail(userName, verificationLink);
    await this.sendEmail(to, 'Verify Your Email Address', verifyEmailBody);
  }

  async sendPasswordChangedEmail(userName: string, to: string): Promise<void> {
    const passwordChangedBody = await this.emailFactory.createPasswordChangedEmail(userName);
    await this.sendEmail(to, 'Your Password Has Been Changed', passwordChangedBody);
  }
}
