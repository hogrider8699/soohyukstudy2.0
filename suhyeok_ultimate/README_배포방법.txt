수혁 공부 사이트 2.0 - AI 학습 코치
====================================

[포함된 주요 기능]
- 중2 7개 과목(수학, 국어, 영어, 과학, 역사, 사회, 한문) AI 개념 설명
- 시험 범위 기반 핵심 요약 / 예시 설명 / 예상문제
- AI 객관식 5·10문제 생성, 직접 선택하는 퀴즈, 자동 채점과 해설
- 틀린 문제 오답 노트 저장
- 암기 카드와 간격 반복 복습(아는 카드의 다음 복습 간격 조정)
- 오늘의 체크리스트, 공부 계획, 집중/휴식 타이머
- 공부일, XP, 집중 시간, 과목별 학습 기록
- 다크 모드, 모바일 하단 메뉴, 반응형 화면, PWA 홈 화면 설치 지원
- 공부 기록 JSON 백업/복원

[중요: 배포 방식]
이 프로젝트는 Netlify Functions를 사용하므로 Netlify Drop(정적 파일 업로드)만으로는 AI가 작동하지 않습니다.
GitHub 저장소에 이 폴더의 내용물(public, netlify, netlify.toml, package.json)을 저장소 최상위에 올리고,
Netlify에서 해당 GitHub 저장소를 연결해 배포하세요.
Netlify Build settings:
  Base directory: 비워 둠
  Publish directory: public
  Functions directory: netlify/functions
  Build command: 비워 둠 (필요 시 npm install)

[API 키 설정]
Netlify 사이트 → Site configuration → Environment variables → Add a variable
  Key: OPENAI_API_KEY
  Value: OpenAI API secret key
선택 사항:
  Key: OPENAI_MODEL
  Value: gpt-4.1-mini
환경 변수 저장 후 반드시 새 배포를 실행하세요.
API 키를 HTML/JS 파일, GitHub 저장소, 공개 문서에 절대 넣지 마세요.
API 사용에는 별도 비용이 발생할 수 있습니다. 계정 및 결제 설정은 보호자와 함께 확인하세요.

[학습 데이터와 한계]
공부 기록은 localStorage에 저장되며 같은 브라우저/기기에서만 유지됩니다. 다른 기기와 자동 동기화되지 않습니다.
브라우저 데이터 삭제 시 기록이 사라질 수 있으므로 백업 기능을 사용하세요.
PWA 캐시는 기본 화면을 오프라인에서 열도록 도울 뿐, AI 답변은 인터넷과 서버가 필요합니다.
AI가 만든 문제는 연습용이며 실제 학교 시험 문제나 시험 범위를 보장하지 않습니다.
학교별 교과서/시험 범위는 학생이 직접 입력하고 교사 안내와 대조해야 합니다.
이 사이트는 개인 학습 보조용이며 공식 학교 서비스가 아닙니다.

[배포 후 확인]
1. 사이트 홈 화면이 열리는지 확인
2. AI 선생님에 과목/단원/질문을 넣어 답변 확인
3. 문제 풀이에서 AI 퀴즈 생성 및 채점 확인
4. 휴대폰에서 하단 메뉴, 입력창, 버튼을 확인
5. 환경 변수 변경 후에는 재배포
