
import { injectable, type ChatResolver, type IChatChannel, type IChatConnection, type IChatMessage, type IReceivedMessage, type IUserConnection, type UserResolver } from '@wabot-dev/framework'
import qrcode from 'qrcode-terminal'
import { Client } from 'whatsapp-web.js'

@injectable()
export class WhatsAppWebChannel implements IChatChannel {
  private client = new Client({})
  private callback: ((message: IReceivedMessage) => void) | null = null

  constructor(
    private chatResolver: ChatResolver,
    private userResolver: UserResolver,
  ) {}

  listen(callback: (message: IReceivedMessage) => void): void {
    this.callback = callback
  }

  connect(): void {
    this.client.once('ready', () => {
      console.log('Client is ready!')
    })

    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true })
    })

    this.client.on('message_create', async (message) => {
      debugger
      console.log(message.body)
      if (!this.callback) {
        return
      }

      const chatConnection: IChatConnection = {
        id: message.from,
        chatType: 'PRIVATE',
        channelName: WhatsAppWebChannel.name,
      }

      const chat = await this.chatResolver.resolve(chatConnection)

      const userConnection: IUserConnection = {
        id: message.from,
        channelName: WhatsAppWebChannel.name,
      }

      const user = await this.userResolver.resolve(userConnection)

      this.callback({
        chat,
        user,
        message: {
          chatConnection,
          userConnection,
          senderName: message.author ?? 'Unknown',
          text: message.body,
        },
        reply: (replyMessage: IChatMessage) => {
          this.client.sendMessage(message.from, replyMessage.text ?? '')
        },
      })
    })

    this.client.initialize()
  }
}
