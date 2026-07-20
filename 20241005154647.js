/*

문제:
주어진 값이 비어있는지를 검사하는 함수를 작성하세요.

조건:
1. 객체의 모든 속성 값이 비어있거나, 속성 자체가 없으면 비어있다고 간주합니다.
2. 배열의 모든 요소가 비어있으면 비어있다고 간주합니다.
3. 원시 타입은 비어있지 않다고 간주합니다.
4. 빈 문자열은 비어있다고 간주합니다.
5. null 과 undefined 는 비어있다고 간주합니다. null 과 undefined 를 제외한 falsey value 는 비어있지 않습니다.

비어있는 경우에만 `true` 를 반환하고, 그 외에는 `false` 를 반환하세요.

*/

function foo(value) {
    if (value === null ||       // null
        value === undefined ||  // undefined
        value === "") {         // empty string
        return true;
    }

    // object
    if (typeof value === 'object') {
        const keys = Object.keys(value);
        // object key-value 확인
        return keys.every(x => foo(value[x])) === true;
    }

    // array
    if (Array.isArray(value) === true) {
        return value.every(x => foo(x)) === true;
    }

    // 여기까지 왔으면 값이 있음
    return false;
}

// test case
const cases = [
    null,                   // true
    undefined,              // true
    "",                     // true
    {},                     // true
    [],                     // true
    { a: "", b: null },     // true (모든 속성이 비어있음)
    [{}, { a: [] }],        // true (모든 요소가 비어있음)

    0,                      // false
    false,                  // false
    "hello",                // false
    { a: 0 },               // false
    [1, 2, 3]               // false
];

console.log("--- result ---")
cases.forEach(x => console.log(foo(x)));
