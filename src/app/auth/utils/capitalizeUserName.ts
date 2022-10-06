export const capitalizeUserName = (nameInput: string): string => {
  let nameArray = nameInput.split(' ')
  return nameArray
    .map((char) => char[0].toUpperCase() + char.slice(1))
    .join(' ')
}
