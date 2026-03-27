export type MbtiAxis = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P'

export const QUIZ_QUESTION_IDS = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6'] as const

export const questionScoreMap: Record<
  string,
  Record<number, Partial<Record<MbtiAxis, number>>>
> = {
  // Q1 1->E+2, 2->E+1, 4->I+1, 5->I+2
  Q1: {
    1: { E: 2 },
    2: { E: 1 },
    3: {},
    4: { I: 1 },
    5: { I: 2 },
  },
  Q2: {
    1: { S: 2 },
    2: { S: 1 },
    3: {},
    4: { N: 1 },
    5: { N: 2 },
  },
  Q3: {
    1: { T: 2 },
    2: { T: 1 },
    3: {},
    4: { F: 1 },
    5: { F: 2 },
  },
  Q4: {
    1: { J: 2 },
    2: { J: 1 },
    3: {},
    4: { P: 1 },
    5: { P: 2 },
  },
  Q5: {
    1: { J: 2 },
    2: { J: 1 },
    3: {},
    4: { P: 1 },
    5: { P: 2 },
  },
  Q6: {
    1: { E: 2 },
    2: { E: 1 },
    3: {},
    4: { I: 1 },
    5: { I: 2 },
  },
}

export const resultTypeMap: Record<string, string> = {
  ESTJ: 'ESTJ',
  ISTJ: 'ESTJ',
  ENTP: 'ENTP',
  ENFP: 'ENTP',
  INTP: 'ENTP',
  ISTP: 'ENTP',
  INFP: 'INFP',
  ISFP: 'INFP',
  ISFJ: 'ISFJ',
  ESFJ: 'ISFJ',
  INFJ: 'ISFJ',
  ESFP: 'ESFP',
  ESTP: 'ESFP',
  ENFJ: 'ESFP',
  INTJ: 'INTJ',
  ENTJ: 'INTJ',
}

export function calculateMbtiResult(
  questionIds: readonly string[],
  selectedAnswerNums: Record<string, number>
) {
  const scores: Record<MbtiAxis, number> = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  }

  for (const id of questionIds) {
    const answerNum = selectedAnswerNums[id]
    if (answerNum === undefined) continue

    const scoreDelta = questionScoreMap[id]?.[answerNum]
    if (!scoreDelta) continue

    for (const axis of Object.keys(scoreDelta) as MbtiAxis[]) {
      scores[axis] += scoreDelta[axis] ?? 0
    }
  }

  const ei = scores.E >= scores.I ? 'E' : 'I'
  const sn = scores.S >= scores.N ? 'S' : 'N'
  const tf = scores.T >= scores.F ? 'T' : 'F'
  const jp = scores.J >= scores.P ? 'J' : 'P'

  const baseType = `${ei}${sn}${tf}${jp}`
  const mappedType = resultTypeMap[baseType] ?? baseType

  return { scores, baseType, mappedType }
}
