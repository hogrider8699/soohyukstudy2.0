import OpenAI from "openai";

const subjects = ["역사", "국어", "수학", "과학", "사회", "영어", "한문"];
const json = (body, status = 200) => new Response(JSON.stringify(body), {
  status, headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
});

export default async (req) => {
  if (req.method !== "POST") return json({ error: "POST 요청만 사용할 수 있어요." }, 405);
  try {
    const { subject, unit = "", question, mode = "ask", count = 5 } = await req.json();
    if (!subjects.includes(subject)) return json({ error: "과목을 다시 선택해 주세요." }, 400);
    if (typeof question !== "string" || !question.trim()) return json({ error: "질문을 입력해 주세요." }, 400);
    if (question.length > 3000 || String(unit).length > 180) return json({ error: "입력 내용이 너무 길어요. 짧게 줄여 주세요." }, 400);
    const apiKey = Netlify.env.get("OPENAI_API_KEY");
    if (!apiKey) return json({ error: "Netlify 환경 변수 OPENAI_API_KEY를 설정해 주세요." }, 503);

    const client = new OpenAI({ apiKey });
    const instructions = `
너는 대한민국 중학교 2학년 학생을 위한 전문적이고 다정한 개인 공부 코치다.
학생의 학습과 이해를 돕는 것이 목적이며 정답만 던지지 말고 풀이 과정과 사고 방법을 설명한다.
반드시 지킬 규칙:
- 한국어로 중2가 이해할 수 있는 쉬운 말로 답한다. 필요하면 어려운 용어를 먼저 풀어 설명한다.
- 선택 과목은 ${subject}이다. 질문이 이 과목과 무관하면 정확히 "이 과목과 관련이 없는 것 같아요. ${subject} 과목의 질문을 입력해 주세요."라고 답하고 다른 과목 내용은 가르치지 않는다.
- 중학교 2학년 수준을 벗어난 심화 내용은 피하고, 선수 개념은 짧게 설명한다.
- 시험 범위/단원은 사용자가 입력한 "${unit || "입력되지 않음"}"이다. 입력 범위가 있으면 최대한 그 범위 안에서 답한다.
- 학교·교사·교과서의 실제 시험 범위를 안다고 주장하지 않는다. 범위가 모호하면 교과서와 선생님 안내를 확인하라고 알린다.
- 사실을 지어내지 않는다. 확실하지 않으면 불확실하다고 밝힌다. 계산 문제는 계산 과정을 검산한다.
- 설명형 답변은 핵심 한 줄 → 쉬운 설명 → 예시/풀이 → 시험 포인트 → 스스로 확인할 질문 순서로 구성한다.
- 요약 요청은 반드시 한눈에 보이도록 핵심 개념, 꼭 외울 것, 자주 틀리는 점, 시험 포인트, 3줄 최종 정리로 구분한다.
- 학생이 직접 생각해 볼 기회를 주고, 학습과 무관한 개인정보를 요구하지 않는다.
`;
    const model = Netlify.env.get("OPENAI_MODEL") || "gpt-4.1-mini";
    if (mode === "quiz_json") {
      const n = Math.min(10, Math.max(3, Number(count) || 5));
      const schema = {
        type: "array", minItems: n, maxItems: n,
        items: { type: "object", additionalProperties: false, required: ["question", "options", "answer", "explanation"], properties: {
          question: { type: "string" }, options: { type: "array", minItems: 4, maxItems: 4, items: { type: "string" } },
          answer: { type: "integer", minimum: 0, maximum: 3 }, explanation: { type: "string" }
        }}
      };
      const response = await client.responses.create({
        model, instructions: instructions + " 객관식 문항은 정확한 개념에 근거하고 보기마다 오답이 그럴듯하되 정답은 하나만 존재해야 한다. 정답 인덱스는 0부터 센다. 해설은 정답 근거와 오답 주의점을 짧게 설명한다.",
        input: `과목 ${subject}, 시험 범위 ${unit}. 다음 요청을 수행해라: ${question}`,
        text: { format: { type: "json_schema", name: "middle_school_quiz", strict: true, schema } }
      });
      return json({ answer: response.output_text || "[]" });
    }
    const response = await client.responses.create({ model, instructions, input: `과목: ${subject}\n시험 범위/단원: ${unit || "입력되지 않음"}\n요청 유형: ${mode}\n학생 요청: ${question}` });
    return json({ answer: response.output_text || "답변을 만들지 못했어요. 질문을 조금 바꿔서 다시 시도해 주세요." });
  } catch (err) {
    console.error("study function error:", err?.message || err);
    return json({ error: "AI 연결 중 문제가 생겼어요. Netlify 환경 변수, API 사용 한도, 모델 설정을 확인해 주세요." }, 500);
  }
};
