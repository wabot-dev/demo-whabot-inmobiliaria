import { whatsAppWeb } from '@/channels/whatsapp-web'
import { MyMindset } from '@/mindsets/MyMindset'
import { chatBot, ChatBot, chatController, cmd, whatsapp, type IReceivedMessage } from '@wabot-dev/framework'

@chatController()
export class MyController {
  constructor(@chatBot(MyMindset) private myBot: ChatBot) {}

  @whatsAppWeb({
    number: '3178511192'
  })
  onMessage(context: IReceivedMessage) {
    this.myBot.sendMessage(context.message, (replyMessage) => {
        context.reply(replyMessage)
    })
  }
}
