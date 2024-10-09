/**
 * 쿠키 가져오기
 * @param name 쿠키 이름
 * @returns 쿠키 값
 */
export function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const part = parts.pop();
    if (part) {
      return part.split(';').shift() || null;
    }
  }
  return null;
}

/**
 * 쿠키 설정
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param maxAge 쿠키 만료 시간
 */
export function setCookie(name: string, value: string, maxAge?: number) { // 수정: maxAge를 선택적 매개변수로 변경
  let cookieString = `${name}=${value}; path=/;`;
  if (maxAge) { // maxAge가 제공된 경우에만 추가
    cookieString += ` max-age=${maxAge}`;
  }
  document.cookie = cookieString;
}

/**
 * 쿠키 삭제
 * @param name 쿠키 이름
 */
export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
}

/**
 * 로그아웃
 */
export function logout() {
  removeCookie('accessToken');
  removeCookie('refresh-token');
}
