# ✍️Simple Diary

#### 배포 URL

- https://diary-sable.vercel.app/

#### 프로젝트 만든 계기

- 본 프로젝트는 NextJs를 공부하면서 배운 내용을 활용하면서 몸에 체화시키기 위해 제작했습니다.
- 어떤 서비스를 만드는 것이 좋을까 고민하던 와중에 평소 기재하는 것을 좋아하는 사람으로 간단하게 일기장 서비스를 만들어 활용하면 좋겠다는 생각을 하게 되어 Simple diary를 제작 했습니다.

#### 기능

- 구글 계정을 이용한 로그인
- 원하는 날짜에 일기장 기록/삭제/수정 기능
- 데스크탑 ~ 모바일 대응 가능

#### 프로젝트 세팅

```bash
yarn add
# dependency install
yarn dev
# run dev server
yarn build
# build
```

#### 기간
- 약 2달 (퇴근 후, 주말 이용)
- 2023.12.10 ~ 2023.2.10

#### 추가 작업기간
- 리팩토링 2주 ( 2024.4.13 ~ 2024.27 )


#### 멤버

- 혼자 제작
- 최대한 많은 작업시간을 확보하고 제가 해보고 싶은 기술을 사용하기 위해서 혼자 제작 하였습니다.

#### 기술

- ⏺️작업 환경
  - vscode 이용
  - yarn berry, prettier, eslint 이용
- ⏺️Front
  - language
    - ✔️typescript
  - framework
    - ✔️Nextjs 14 (app route)
      - server component 이용   
      - middle ware 이용
        - 로그인 여부(cookie 값)에 따른 리다이렉팅 처리
      - nextJs 기본 routing 이용
      - useSearchParams 이용
        - query string 값을 참조하여 특정 날짜의 diary 정보 확보, 수정, 삭제
  - dependency
    - ✔️MUI Material
      - 컴포넌트 사용 ( 디자인 작업 최소화 )
    - ✔️emotion 사용
      - Mui 컴포넌트 스타일 수정 시 사용 ( MUI와 호환성을 고려해 emotion 사용 )
  - etc
    - ✔️React context 이용
      - 로그인한 사용자 정보, 로딩 상태 관리
      - 별도의 상태관리 라이브러리 설치 없이 context만을 이용해도 충분히 커버 가능할 정도의 서비스라 판단하여 react context 이용
- ⏺️Backend & DB
  - Firebase를 이용 ( 백엔드, DB 작업 최소화, 사용해보고 싶었던 기술 )
    - ✔️Firestore (DB)
      - DB 로 이용 (NO-sql)
      - Google로 부터 받은 유니크 정보를 기반으로 사용자를 식별하여 유저별 data에 접근
    - ✔️FireBase auth (Backend)
      - 로그인(Google login) 기능 이용
        - 구글 계정으로 로그인 성공시 구글로부터 사용자에 대한 정보(유니크한 uid, 유저이름, 유저 이메일 등...) 확보 및 해당정보를 react context에 저장
        - 서비스내에 "로그아웃" 하지 않는 이상 웹브라우저에서 로그인 상태 유지 (유효기간 100일)
- ⏺️deploy (배포)

  - ✔️vercel 이용

##### 부연 설명

- 로그인 관련
  - 구글 계정을 이용해 첫 로그인 성공시 유효기간 100일인 cookie 가 설정되고 로그아웃 버튼을 클릭시 해당 cookie값은 삭제 되며 이 cookie 값을 기준으로 middle ware에서 redirection 처리 합니다.

##### 후기

- 평소에 구현해보고 싶었던 기능들을 구현 해볼 수 있는 값진 경험이었습니다😊

##### 개선 사항 
- 네트워크 요청 수 간소화 및 대체 전략 수립
  - 캐싱처리?      
- alert -> snackbar와 dialog component 이용
- 특정 달을 한꺼번에 불러 올 수 있는 ui 추가 
