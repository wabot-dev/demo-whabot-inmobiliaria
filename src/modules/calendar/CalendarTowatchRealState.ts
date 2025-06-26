import { mindsetFunction, mindsetModule } from '@wabot-dev/framework'

import { getAllAdvisors, getByName, getAvailability, generateAppointmentId, convertRelativeDate, isSlotAvailable, type Advisor, advisors, type Appointment } from '@/data-mocked/Advisors';
import { FindAdvisor, MakeAppoiment } from './request/RequestCalendar';


@mindsetModule({
  description: 'Provide functions to list advidor, find advidor and schedule a viewing with advisor',
  language: 'Spanish',
})
export class CalendarTowatchRealStateModule {
  @mindsetFunction({
    description: 'show all advisors',
  })
  async listAdvisors() {
    return advisors
  }

  @mindsetFunction({
    description: 'Search for the advisor schedule and available times by name',
  })
  getAdvisor(request: FindAdvisor) {

    const advisor = getByName(request.name)
 
    return advisor
  }

   @mindsetFunction({
    description: 'verify availability of advisor by name',
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

  @mindsetFunction({
    description: 'make a appoiment with advisor by name',
  })
  makeAppoiment(request: MakeAppoiment) {

    const date = convertRelativeDate(request.date)
    if (!date) {
      return {
        message: 'Fecha inválida'
      }
    }
    const advisor = getByName(request.name) as Advisor

     const advisorIndex = advisors.findIndex(a => a.id === advisor.id);

    

    const isSlot = isSlotAvailable(advisors[advisorIndex], date, request.start, 60);
    if (!isSlot) {
      return {
        message: 'El asesor no está disponible en ese horario'
      }
    }

     const [startHour, startMinute] = request.start.split(':').map(Number);
  const endMinutes = startMinute + 60;
  const endHour = startHour + Math.floor(endMinutes / 60);
  const end = `${endHour.toString().padStart(2, '0')}:${endMinutes % 60}`.padEnd(5, '0')
    

    const newAppointment: Appointment = {

      id: generateAppointmentId(),
      client: request.client,
      date: request.date,
      start: request.start,
      end,
      status: 'pendiente',
    }
     advisors[advisorIndex].appointments.push(newAppointment);




    return {
      message: 'Cita agendada con éxito',
      newAppointment
    }
  }


}
