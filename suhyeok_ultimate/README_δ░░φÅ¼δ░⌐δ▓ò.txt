수혁 공부 사이트 - AI 연결 전체 프로젝트

폴더 구조
- public/index.html : 웹사이트 화면
- public/manifest.webmanifest, public/sw.js, public/icons : 홈 화면 설치용 파일
- netlify/functions/study.mjs : 실제 AI 서버 함수
- netlify.toml : Netlify 설정
- package.json : 필요한 패키지 설정

중요: 이 ZIP은 Netlify Drop 전용이 아닙니다.
Netlify Drop은 정적 파일만 배포하므로 netlify/functions/study.mjs 서버 함수를 실행할 수 없습니다.
실제 AI 답변 기능을 사용하려면 GitHub 저장소에 이 프로젝트의 파일과 폴더(public, netlify, package.json, netlify.toml 등)를 저장소 최상위에 올린 뒤 Netlify에서 해당 GitHub 저장소를 Import/연결해 배포해야 합니다.

Netlify 환경 변수 설정
1. Netlify에서 사이트 선택
2. Site configuration (또는 Project configuration) > Environment variables
3. OPENAI_API_KEY 이름으로 비밀 API 키 추가
4. 저장 후 Deploys에서 새 배포 실행
5. AI 질문을 보내 테스트

선택 사항: OPENAI_MODEL 환경 변수. 지정하지 않으면 gpt-4.1-mini 사용.

보안 주의
- OPENAI_API_KEY를 public 폴더, index.html, GitHub 코드에 절대 입력하지 마세요.
- API 키를 채팅이나 다른 사람에게 보내지 마세요.
- API 사용료가 발생할 수 있으니 보호자와 함께 결제/사용 한도를 확인하세요.
- AI가 만든 예상문제는 실제 학교 시험문제와 같다고 보장하지 않습니다.
