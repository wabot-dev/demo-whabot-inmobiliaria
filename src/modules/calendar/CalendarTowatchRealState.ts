import { mindsetFunction, mindsetModule } from '@wabot-dev/framework'

import { getAllAdvisors, getByName, getAvailability } from '@/data-mocked/Advisors';
import { FindAdvisor } from './request/RequestCalendar';


@mindsetModule({
  description: 'Provide functions to list advidor, find advidor and schedule a viewing with advisor',
  language: 'Spanish',
})
export class CalendarTowatchRealStateModule {
  @mindsetFunction({
    description: 'List all real estate advisors with their availability status and schedules for property viewings',
  })
  async listAdvisors() {
    const data = getAllAdvisors()

    return data
  }

  @mindsetFunction({
    description: 'Search for the real estate advisor schedule and available times by name',
  })
  getAdvisor(request: FindAdvisor) {
    console.log(request);
    
    const advisor = getByName(request.name)
 
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
