export default function isEmptyText(input: string | number) {
  const Text = String(input)
  return Text.trim() === ''
}
