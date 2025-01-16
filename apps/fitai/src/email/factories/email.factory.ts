import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class EmailFactory {

  private async loadTemplate(templateName: string): Promise<string> {
    // Updated path to point to the dist directory
    const templatePath = path.join(__dirname, `../../../apps/fitai/fitai/src/email/templates/${templateName}.template.html`);
    console.log(templatePath);
    try {
      return await fs.readFile(templatePath, 'utf-8');
    } catch (err) {
      console.log(err);
      throw new Error(`Could not read the template file: ${templateName}.html`);
    }
  }
  
  private injectData(template: string, data: { [key: string]: string }): string {
    let result = template;
    for (const key in data) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), data[key]);
    }
    return result;
  }

  async createWelcomeEmail(userName: string): Promise<string> {
    const template = await this.loadTemplate('welcome');
    const data = { userName };
    return this.injectData(template, data);
  }

  async createForgotPasswordEmail(userName: string, resetLink: string): Promise<string> {
    console.log(resetLink);
    const template = await this.loadTemplate('forget-password');
    const data = { userName, resetLink };
    return this.injectData(template, data);
  }

  async createVerifyEmailEmail(userName: string, verificationLink: string): Promise<string> {
    const template = await this.loadTemplate('verifiy-email');
    const data = { userName, verificationLink };
    return this.injectData(template, data);
  }

  async createPasswordChangedEmail(userName: string): Promise<string> {
    const template = await this.loadTemplate('password-changed');
    const data = { userName };
    return this.injectData(template, data);
  }
}
