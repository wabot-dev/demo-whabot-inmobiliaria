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

export class MakeAppoiment extends FindAdvisor {
  @param({
    description: 'Name of client',
  })
  client: string = ''
}