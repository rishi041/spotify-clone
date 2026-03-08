export function truncateString(inputString, maxLength) {
  if (!inputString) return "";
  if (inputString.length <= maxLength) {
    return inputString;
  }
  return `${inputString.substring(0, maxLength)}...`;
}

export function msToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
