import { type Nationality } from './nationality'

export class User {
  constructor (
    public name: string,
    public avatar: string,
    public elo: number,
    public nationality: Nationality
  ) {}
}
