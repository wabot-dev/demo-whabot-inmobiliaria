import { param } from "@wabot-dev/framework"


export class FindAdvisor {
  @param({
    description: 'Name of advisor',
  })
  name: string = ''
  @param({
    description: 'Date of appointment',
  })
  date: string = ''
  @param({
    description: 'Start time of appointment',
  })
  start: string = ''
  @param({
    description: 'End time of appointment',
  })
  end: string = ''
}

export class MakeAppoiment  {
  @param({
    description: 'Name of advisor',
  })
  name: string = ''
  @param({
    description: 'Name of client',
  })
  client: string = ''
    @param({
    description: 'Date of appointment, can be a date or a day of week, or relative date like, today, or tomorrow',
  })
  date: string = ''
  @param({
    description: 'Start time of appointment',
  })
  start: string = ''
  @param({
    description: 'End time of appointment',
  })
  end: string = ''
}