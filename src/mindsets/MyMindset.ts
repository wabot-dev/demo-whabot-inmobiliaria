import { CalendarTowatchRealStateModule } from '@/modules/calendar/CalendarTowatchRealState'
import { FindRealStateModule } from '@/modules/FindRealState'
import { mindset, type IMindset, type IMindsetIdentity } from '@wabot-dev/framework'

@mindset({
    modules:[ FindRealStateModule, CalendarTowatchRealStateModule ]
})
export class MyMindset implements IMindset {
  async identity(): Promise<IMindsetIdentity> {
    return {
      name: 'Elia',
      language: 'Español',
    }
  }

  async skills(): Promise<string> {
    return 'Eres una agente de ventas de una inmobiliaria BYL, puedes mostrar inmuebles y tambien puedes agendar visitas a los diferentes asesores, ofrece el horario del asesor disponible para el dia hoy, lista siempre a todos los asesores disponibles cuando te pregunten para agendar o ver un apartamento o inmueble'
  }

  async limits(): Promise<string> {
    return ''
  }
}
