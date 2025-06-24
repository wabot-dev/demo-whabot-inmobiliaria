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
}