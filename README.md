# vanilla-todo

## 에러

1. 수정 하는 중에 삭제 하면 input value와 addBtn의 edit 아이콘이 그대로 남아있음

2. classList로 돔을 제어해서 이벤트가 중복해서 발생함 / querySelector로 선택해도 중복발생하네? -> toast를 한번만?
   요청이 여러번 들어감

3. ~~모두 삭제 클릭 시 삭제할 수 없는 데이터라고 오류가 발생함~~, 모두 삭제 버튼은 todos.length 가 1이상일때 나와야함

   - 모두 삭제 클릭 시 삭제할 수 없는 데이터라고 오류가 발생함 -> 해결 request 함수가 transitionend 이벤트 안에 있어서 생김 밖으로 빼주면 해결됨

4. 투두리스트가 없을 경우?

5. 미완, 완료 필터 적용일때 추가하면 전부 불러와짐
   `doneFilter.value` 이거에 따라서 컨디션렌더링을?

6. 최신 오래된 순 역시 필터 적용 되었을 때 어떻게 처리할지?

7. toast 애니메이션

8. src/utils/editTodo.ts - error TS7006: Parameter 'e' implicitly has an 'any' type.

빌드시

1. Top-level await is not available in the configured target environment

```ts
export default {
  build: {
    target: "esnext",
  },
};
```

vite.config.ts에 추가

---

## 개선하고 싶은 점

1. 조건문 줄이기
