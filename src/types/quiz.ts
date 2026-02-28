export interface QuizOption {
  id: string
  label: string
}

export interface QuizQuestion {
  id: string
  title: string
  options: QuizOption[]
}
