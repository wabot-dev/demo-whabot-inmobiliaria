import { injectable } from "@wabot-dev/framework";

export interface IWhatsAppWebChannelConfig {
  number: string
}
@injectable()
export class WhatsAppWebChannelConfig implements IWhatsAppWebChannelConfig {
  constructor(public number: string) { }
}