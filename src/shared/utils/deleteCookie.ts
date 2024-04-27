export default function deleteCookie({ cookieName }: { cookieName: string }) {
  document.cookie = `${encodeURIComponent(cookieName)}="" ; max-age=${-1 * 24 * 60 * 60}; path=/;}`
}
