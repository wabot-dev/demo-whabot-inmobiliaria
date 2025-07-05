
import { WhatsAppWebChannel } from './WhatsAppWebChannel'
import { container, ControllerMetadataStore, type IConstructor } from '@wabot-dev/framework'

export function whatsAppWeb() {
  return function (target: object, propertyKey: string | symbol) {
    const store = container.resolve(ControllerMetadataStore)
    store.saveChannelMetadata({
      channelConstructor: WhatsAppWebChannel,
      functionName: propertyKey.toString(),
      controllerConstructor: target.constructor as IConstructor<any>,
    })
  }
}
