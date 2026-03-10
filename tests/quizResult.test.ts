import { describe, expect, it } from 'vitest'
import { calculateMbtiResult, QUIZ_QUESTION_IDS } from '../src/utils/quizResult'

function buildAnswerMap(input: string) {
  if (input.length !== QUIZ_QUESTION_IDS.length) {
    throw new Error(`input length mismatch: ${input}`)
  }

  const map: Record<string, number> = {}
  for (let i = 0; i < input.length; i += 1) {
    const answerNum = Number(input[i])
    map[QUIZ_QUESTION_IDS[i]] = answerNum
  }
  return map
}

function caseExpect(input: string, expected: string) {
  const selectedAnswerNums = buildAnswerMap(input)
  const result = calculateMbtiResult(QUIZ_QUESTION_IDS, selectedAnswerNums)
  expect(result.mappedType).toBe(expected)
}

const caseMap = {
  '111111': 'ESTJ',
  '222222': 'ESTJ',
  '333333': 'ESTJ',
  '114111': 'ISFJ',
  '114251': 'ESFP',
  '141111': 'INTJ',
  '141251': 'ENTP',
  '444444': 'INFP',
  '555555': 'INFP',
} as const

type CaseInput = keyof typeof caseMap

function makeCase(input: CaseInput) {
  const expected = caseMap[input]
  it(`input ${input} => ${expected}`, () => {
    caseExpect(input, expected)
  })
}

describe('quiz result mapping', () => {
  ;(Object.keys(caseMap) as CaseInput[]).forEach(makeCase)
})
