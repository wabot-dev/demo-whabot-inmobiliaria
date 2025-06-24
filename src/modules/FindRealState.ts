import { mindsetFunction, mindsetModule } from '@wabot-dev/framework'

import { realEstateData } from "@/data-mocked/ListRealState"
import type { IRealEstateApiResponse } from '@/models/RealStateResponse'

@mindsetModule({
  description: 'Provide functions about real state',
  language: 'Spanish',
})
export class FindRealStateModule {

  @mindsetFunction({
    description: 'list realty properties available for sale',
  })
  async listRealties() {
    
    const jsonData = realEstateData as IRealEstateApiResponse
    
    const properties = jsonData.data.map((property) => {
      return `*${property.title}*
      ${property.description}
      ${property.location.address}
      ${property.price}
      ${property.contact.phone}`
    })
    
    return properties
    

  }
}
