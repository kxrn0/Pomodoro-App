export default function format_time(seconds) {
  const secsInMin = 60;
  const secsInHour = 60 * secsInMin;
  const hours = ~~(seconds / secsInHour);
  seconds %= secsInHour;
  const minutes = ~~(seconds / secsInMin);
  seconds %= secsInMin;

  return [hours, minutes, seconds];
}
