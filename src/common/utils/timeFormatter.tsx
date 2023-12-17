export function formatStringToSeconds(time: string) {
  const [hours = "0", minutes = "0", seconds = "0"] = time.split(":", 3);
  const hoursInSeconds = Number(hours) * 3600;
  const minutesInSeconds = Number(minutes) * 60;
  const secondsInSeconds = Number(seconds);

  return hoursInSeconds + minutesInSeconds + secondsInSeconds;
}

export function formatTwoDigits(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatSecondsToString(timeInSeconds: number) {
  const hours = Math.floor(timeInSeconds / 3600);
  timeInSeconds %= 3600;
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return (
    formatTwoDigits(hours) +
    ":" +
    formatTwoDigits(minutes) +
    ":" +
    formatTwoDigits(seconds)
  );
}
