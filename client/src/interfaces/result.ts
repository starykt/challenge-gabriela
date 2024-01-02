
export enum Bimesters {
  first = 'PRIMEIRO',
  second = 'SEGUNDO',
  third = 'TERCEIRO',
  fourth = 'QUARTO',
}

export enum Lessons {
  first = 'Biologia',
  second = 'Artes',
  third = 'Geografia',
  fourth = 'Sociologia',
}

export interface IResult {
  id: string,
  createdAt: Date,
  updatedAt: Date,
  grade: number | null,
  lesson: Lessons | null,
  bimester: Bimesters | null,
}