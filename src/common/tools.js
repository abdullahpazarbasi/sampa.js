export function convertFractionalHourToClockNotation(fractionalHour) {
    const exactHours = Math.trunc(fractionalHour);
    const minutes = 60 * (fractionalHour - exactHours);
    const exactMinutes = Math.trunc(minutes);
    const seconds = 60 * (minutes - exactMinutes);
    const exactSeconds = Math.trunc(seconds);
    const formattedHours = exactHours.toString().padStart(2, '0');
    const formattedMinutes = exactMinutes.toString().padStart(2, '0');
    const formattedSeconds = exactSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}
