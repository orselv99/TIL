/*

문제:
입력값에 민감 정보가 포함된 경우에만 마스킹 처리해야 합니다.
민감 정보가 아닌 경우 입력값을 그대로 반환합니다.
주어진 입력이 객체일 경우,
객체의 속성 중 민감 정보가 포함된 값이 있다면 해당 속성의 값을 마스킹된 값으로 변환해야 합니다.
입력값으로는 문자열 또는 값을 문자열로 가지는 객체만 주어집니다.

조건:
- 전화번호
  - 하이픈으로 연결된 000-0000-0000, 000-000-0000 또는 00-000-0000, 00-0000-0000
  - 객체 프로퍼티 이름이 phone 이 포함된 문자열 값
- 이름
  - `님` 으로 끝나는 문자열
- 카드 유효기간
  - 슬래시로 연결된 00/00 의 카드 유효기간
- 금액
  - 원으로 끝나는 문자열
  - 객체 프로퍼티 이름이 amount 가 포함된 문자열 값
- 이메일
  - 영문 대소문자 또는 숫자, . 이나 - 으로 구성되고, @ 이 존재하며, 계정 이름과 도메인이 있고, 
    도메인에 . 을 포함하는 문자열

*/

function foo(value) {
  function maskPhoneNumber(str) {
    const hyphenPattern = /^(0\d{1,2})-(\d{3,4})-(\d{4})$/;
    if (hyphenPattern.test(str)) {
      return str.replace(hyphenPattern, (_, p1, p2, p3) => {
        return p1 + '-' + '*'.repeat(p2.length) + '-' + p3;
      });
    }

    const noHyphenPattern = /^(0\d{1,2})(\d{3,4})(\d{4})$/;
    if (noHyphenPattern.test(str)) {
      return str.replace(noHyphenPattern, (_, p1, p2, p3) => {
        return p1 + '*'.repeat(p2.length) + p3;
      });
    }

    return str.replace(/\d/g, '*');
  }

  function maskName(str) {
    if (str.endsWith('님')) {
      const namePart = str.slice(0, -1);

      if (namePart.length === 0) {
        return str;
      }
      if (namePart.length === 1) {
        return namePart + '님';
      }
      if (namePart.length === 2) {
        return namePart[0] + '*' + '님';
      }

      return namePart[0] + '*'.repeat(namePart.length - 2) + namePart[namePart.length - 1] + '님';
    }

    return str;
  }

  function maskCardExpiry(str) {
    const expiryPattern = /^\d{2}\/\d{2}$/;
    if (expiryPattern.test(str)) {
      return '**/**';
    }

    return str;
  }

  function maskAmount(str) {
    return str.replace(/\d/g, '*');
  }

  function maskEmail(str) {
    const parts = str.split('@');
    if (parts.length === 2) {
      const id = parts[0];
      const domain = parts[1];
      let maskedId = '';

      if (id.length === 1) {
        maskedId = '*';
      } else if (id.length === 2) {
        maskedId = id[0] + '*';
      } else {
        maskedId = id.slice(0, 2) + '*'.repeat(id.length - 2);
      }
      return maskedId + '@' + domain;
    }
    return str;
  }

  function maskSensitiveString(str) {
    // 전화번호
    const hyphenPhonePattern = /^(0\d{1,2})-(\d{3,4})-(\d{4})$/;
    if (hyphenPhonePattern.test(str)) {
      return maskPhoneNumber(str);
    }

    // `님` 으로 끝나는 문자열
    if (str.endsWith('님')) {
      return maskName(str);
    }

    // 카드 유효기간 (00/00)
    const cardExpiryPattern = /^\d{2}\/\d{2}$/;
    if (cardExpiryPattern.test(str)) {
      return maskCardExpiry(str);
    }

    // `원` 금액
    if (str.endsWith('원')) {
      return maskAmount(str);
    }

    // 이메일
    const emailPattern = /^[a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9.-]+$/;
    if (emailPattern.test(str)) {
      return maskEmail(str);
    }

    return str;
  }

  if (typeof value === 'string') {
    return maskSensitiveString(value);
  }
  else if (value && typeof value === 'object') {
    const result = {};

    for (const key of Object.keys(value)) {
      const val = value[key];
      if (typeof val === 'string') {
        if (key.includes('phone')) {
          result[key] = maskPhoneNumber(val);
        }
        else if (key.includes('amount')) {
          result[key] = maskAmount(val);
        }
        else {
          result[key] = maskSensitiveString(val);
        }
      }
      else {
        result[key] = val;
      }
    }

    return result;
  }

  return value;
}

// test cases
console.log("--- result ---");
console.log(foo('010-1234-5678')); // '010-****-5678'
console.log(foo('02-123-4567'));   // '02-***-4567'
console.log(foo('오르셀님'));       // '오*셀님'
console.log(foo('르셀님'));         // '르*님'
console.log(foo('12/25'));         // '**/**'
console.log(foo('12,300원'));      // '**,***원'
console.log(foo('orselv99@gmail.com')); // 'or******@gmail.com'
console.log(foo('일반 텍스트'));     // '일반 텍스트'
console.log(foo({
  phone: '01012345678',             // '010****5678'
  amount: '12345',                  // '*****'
  name: '오르셀님',                  // '오*셀님'
  expiry: '05/26',                  // '**/**'
  email: 'orselv99@gmail.com',      // 'or******@gmail.com'
  other: 'hello'                    // 'hello'
}));
