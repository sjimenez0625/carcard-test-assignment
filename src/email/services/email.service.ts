import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import { EMAIL_TEMPLATES } from '../constants/email.constant';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      text,
      html,
    });
  }

  async sendTemplateEmail(
    to: string,
    subject: string,
    template: EMAIL_TEMPLATES,
    context: Record<string, any>,
  ): Promise<void> {
    const templatePath = path.join(
      __dirname,
      '..',
      'templates',
      `${template}.html`,
    );
    const templateFile = fs.readFileSync(templatePath, 'utf-8');

    const html = templateFile.replace(
      /{{(\w+)}}/g,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      (_, key) => context[key] || '',
    );

    await this.mailerService.sendMail({
      to,
      subject,
      html,
    });
  }
}
