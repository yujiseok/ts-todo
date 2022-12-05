# Todo App ✅

<br/>

---

<br/>

### :exclamation: 필수

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] jQuery, React, Vue 등 JS 라이브러리와 프레임워크는 사용하지 않아야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### :grey_question: 선택

- [x] 가능하다면, 타입스크립트를 사용해보세요.
- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요.
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [x] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [x] 할 일 항목의 최신 수정일을 표시해보세요.
- [x] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [] 할 일과 관련된 기타 기능도 고려해보세요.

## 🌏 실제 사이트 & 배포 사이트

<h3><a href="https://deluxe-duckanoo-cec80e.netlify.app/">https://deluxe-duckanoo-cec80e.netlify.app/</a></h3>

<br/>

## 🔧 기술 스택

<div>
  
<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white">
<img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white">
</div>

<br/>

## ⛔ 마주한 에러

### **런타임 에러 & 컴파일 에러**

1. 수정 요청시 이벤트가 중복해서 발생해 모든 값이 똑같이 수정되는 오류

   - forEach 안에서 계속 함수가 생성되어서 이벤트가 계속 발생
   - submit과 관련된 함수를 빼줘서 해결

<br/>
2. 모두 삭제 클릭 시 삭제할 수 없는 데이터라고 오류가 발생함

- 모두 삭제 클릭 시 삭제할 수 없는 데이터라고 오류가 발생함 -> 해결 request 함수가 transitionend 이벤트 안에 있어서 생김 밖으로 빼서 해결

 <br/>

3. 필터가 적용 됐을때 추가하면 전부 불러와짐
   `filter.value` 이거에 따라서 조건부 렌더링을?

   - 렌더링하기 전에 `value`에 따라 todo 데이터를 filter, sort
   - filter ,sort 된 데이터를 렌더링

<br/>

4. src/utils/editTodo.ts - error TS7006: Parameter 'e' implicitly has an 'any' type.

- `"noImplicitAny": false` 를 써서 해결.. 다른 방법은 없을지?

<br/>

### **빌드시**

1. Top-level await is not available in the configured target environment

```ts
export default {
  build: {
    target: "esnext",
  },
};
```

`vite.config.ts`에 추가

<br/>

---

<br/>

## 📝 후기

투두 앱이라 엄청 간단할 줄 알았는데, 생각보다 처리해야 할 분기들이 많아서 고생을 했던 것 같다. 처음에는 자바스크립트로 만들다, 타입스크립트로 마이그레이션을 해보았는데
확실히 컴파일 시에 에러를 볼 수 있어, 어떤 에러가 발생했는지 쉽게 찾을 수 있었다.
하지만 잡아줘야 할 에러들이 너무 많아서 정신이 없었다. 결국 any를 못 잡아서 `"noImplicitAny": false`를 써서 해결했는데, 다른 방법들을 찾아봐야겠다.

타입 명시를 통해 각종 api, 메서드 등이 자동완성으로 보여 오타도 줄이고 좀 더 생산성 높게 코드를 작성할 수 있었다.

<br/>

---

<br/>

## 🧰 개선하고 싶은 점 & 보완해야할 점

- 조건문 줄이기
- **typescript**랑 더 친해지기
- **if**와 **switch** 차이점 제대로 알기
- 렌더링 과정 공부하기
