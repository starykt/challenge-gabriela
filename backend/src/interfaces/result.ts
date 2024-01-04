
export enum Bimesters {
  primeiro = 'PRIMEIRO',
  segundo = 'SEGUNDO',
  terceiro = 'TERCEIRO',
  quarto = 'QUARTO',
}

export enum Lessons {
  Biologia = 'Biologia',
  Artes = 'Artes',
  Geografia = 'Geografia',
  Sociologia = 'Sociologia',
}

export interface IResult {
  id: string,
  createdAt: Date | null,
  updatedAt: Date | null,
  grade: number | null,
  lesson: Lessons | null,
  bimester: Bimesters | null,
}