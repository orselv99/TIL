/*

문제:
- 사토르 마방진
- 상하, 좌우대칭을 확인하는 함수를 작성하세요.

WOW
OEO
WOW
`true`

HEL
LOO
OLE
`false`

SATOR
AREPO
TENET
OPERA
ROTAS
`true`

ABCDE
FGHIJ
KLMNO
PQRST
UVWXY
`false`

조건:
1. 주어진 배열은 N개의 요소를 가지며, 각 요소는 길이가 N 인 문자열입니다.
2. N 은 항상 홀수이며, 3 이상입니다.
3. 입력 배열이 N x N 크기를 벗어나느 경우는 없습니다.

*/

function foo(value) {
  const n = value.length;
  var result = true;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (value[i][j] !== value[j][i] ||                // 좌우 대칭
        value[i][j] !== value[n - i - 1][n - j - 1]) {  // 상하 대칭
        result = false;
      }
    }
  }

  return result;
}

// test case
const cases = [
  ["WOW", "OEO", "WOW"], // true
  ["HEL", "LOO", "OLE"], // false
  ["SATOR", "AREPO", "TENET", "OPERA", "ROTAS"], // true
  ["ABCDE", "FGHIJ", "KLMNO", "PQRST", "UVWXY"], // false
];

console.log("--- result ---");
cases.forEach(x => console.log(foo(x)));
