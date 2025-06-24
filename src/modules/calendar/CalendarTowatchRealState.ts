import { mindsetFunction, mindsetModule } from '@wabot-dev/framework'

import { getAllAdvisors, getByName, getAvailability } from '@/data-mocked/Advisors';
import type { FindAdvisor } from './request/RequestCalendar';


@mindsetModule({
  description: 'Provide functions to list advidor, find advidor and schedule a viewing with advisor',
  language: 'Spanish',
})
export class CalendarTowatchRealStateModule {
  @mindsetFunction({
    description: 'list all advisors when for availability',
  })
  async listAdvisors() {
    const data = getAllAdvisors()

    return data
  }

  @mindsetFunction({
    description: 'look for advisor by name',
  })
  getAdvisor(request: FindAdvisor) {
    console.log(request);
    
    const advisor = getByName(request.name)
    if (!advisor) {
      return {
        status: 'error',
        message: 'No se encontró al asesor'
      }
    }

    return advisor
  }

   @mindsetFunction({
    description: 'check availability of advisor by name',
  })
  checkAppoimentByAdvisor(request: FindAdvisor) {
    const advisor = getAvailability(request.name, request.date)
    if (!advisor) {
      return {
        status: 'error',
        message: 'No se encontró al asesor'
      }
    }
    return advisor
  }


}
