import { quizQuestions } from '../mocks/quiz'
import { resultProfiles, type ResultProfile, type ResultType } from '../mocks/results'
import { defaultTicketInfo, type TicketInfo } from '../mocks/ticket'
import type { QuizQuestion } from '../types/quiz'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL ?? '').trim()

async function fetchJSON<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return (await response.json()) as T
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  if (!API_BASE_URL) return quizQuestions
  try {
    return await fetchJSON<QuizQuestion[]>('/quiz/questions')
  } catch {
    return quizQuestions
  }
}

export async function getResultProfile(type: ResultType): Promise<ResultProfile> {
  if (!API_BASE_URL) return resultProfiles[type]
  try {
    return await fetchJSON<ResultProfile>(`/result/${type}`)
  } catch {
    return resultProfiles[type]
  }
}

export async function getTicketInfo(): Promise<TicketInfo> {
  if (!API_BASE_URL) return defaultTicketInfo
  try {
    return await fetchJSON<TicketInfo>('/ticket')
  } catch {
    return defaultTicketInfo
  }
}
