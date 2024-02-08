export type BCMMachine = 'BCM1' | 'BCM2' | 'BCM3'

export const selectedMachine = (value) => {
  let selected
  switch (value) {
    case 1:
      selected = "BCM1"
      break;
    case 2:
      selected = "BCM2"
      break;
    case 3:
      selected = "BCM3"
      break;
    default:
      selected = "BCM1"
      break;
  }
  return selected
}

export interface BCMLog {
  id?: number
  machineNumber: BCMMachine
  user: string
  timeRecords?: number[]
  timeElapsed: number
  category: string
  subCategory: string
}