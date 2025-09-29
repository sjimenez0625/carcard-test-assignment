import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as fs from 'fs';
import * as path from 'path';
import { EMAIL_TEMPLATES } from '../constants/email.constant';
import { AppLogger } from 'src/shared/logger/logger.service';

@Injectable()
export class EmailService {
  constructor(
    private readonly logger: AppLogger,
    private readonly mailerService: MailerService,
  ) {
    this.logger.setContext(EmailService.name);
  }

  async sendTemplateEmail(
    to: string,
    subject: string,
    template: EMAIL_TEMPLATES,
    context: Record<string, any>,
  ): Promise<void> {
    try {
      const templatePath = path.join(
        __dirname,
        '..',
        'templates',
        `${template}.html`,
      );

      if (!fs.existsSync(templatePath)) {
        throw new Error(`Template file not found: ${templatePath}`);
      }

      const templateFile = fs.readFileSync(templatePath, 'utf-8');

      const html = templateFile.replace(/{{(\w+)}}/g, (_, key: string) => {
        if (!context[key]) {
          console.warn(`Missing or invalid context key: ${key}`);
          return '';
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return context[key];
      });

      await this.mailerService.sendMail({
        to,
        subject,
        html,
      });
      this.logger.debug('Email sent successfully', { to, subject, html });
    } catch (error) {
      this.logger.error('Error sending email', error as Record<string, any>);
      throw new Error('Failed to send email. Please try again later.');
    }
  }
}
