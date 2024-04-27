/** cookie 값을 or undefined 반환  */
export default function getCookie({ cookieName }: { cookieName: string }) {
  const matches = document.cookie.match(
    new RegExp(`(?:^|; )${cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`)
  )

  return matches ? decodeURIComponent(matches[1]) : undefined
}
