export default function setCookie({
  cookieName,
  cookieValue,
  validDays,
}: {
  cookieName: string
  cookieValue: string
  validDays: number
}) {
  document.cookie = `${encodeURIComponent(cookieName)}=${encodeURIComponent(cookieValue)}; max-age=${
    validDays * 24 * 60 * 60
  }; path=/`
}
