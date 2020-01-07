export default function parseHumanizedDuration(humanizedDuration) {
  // (grupa liczb) (dopuszczalne spacje) (słowo lub znak oznaczający wymiar czasu) (od razu po musi być albo biały znak albo nic)
  const hoursRegex = /([0-9]+)([ ]*)(h|hour|hours|godzina|godzin|godziny)(?!\w)/;
  const minutesRegex = /([0-9]+)([ ]*)(m|minute|minutes|minuta|minut|minuty)(?!\w)/;
  const secondsRegex = /([0-9]+)([ ]*)(s|second|seconds|sekunda|sekundy|sekund)(?!\w)/;
  const millisecondsRegex = /([0-9]+)([ ]*)(ms|milisecond|miliseconds|milisekunda|milisekundy|milisekund)(?!\w)/;

  const hours = humanizedDuration.match(hoursRegex);
  const minutes = humanizedDuration.match(minutesRegex);
  const seconds = humanizedDuration.match(secondsRegex);
  const milliseconds = humanizedDuration.match(millisecondsRegex);

  let parsedDuration = 0;

  if(hours) {
    parsedDuration += parseInt(hours[0]) * 60 * 60 * 1000;
  }
  if(minutes) {
    parsedDuration += parseInt(minutes[0]) * 60 * 1000;
  }
  if(seconds) {
    parsedDuration += parseInt(seconds[0]) * 1000;
  }
  if(milliseconds) {
    parsedDuration += parseInt(milliseconds[0]);
  }

  return parsedDuration;
}