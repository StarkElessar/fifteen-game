export const timer = (minutePLace, secondPlace, timeObject) => {
  timeObject.seconds++

  secondPlace.innerText = timeObject.seconds <= 9 ? `0${timeObject.seconds}` : timeObject.seconds

  if (timeObject.seconds >= 59) {
    timeObject.minutes++

    minutePLace.innerText = `0${timeObject.minutes}`
    timeObject.seconds = 0
    secondPlace.innerText = `0${timeObject.seconds}`
  }

  minutePLace.innerText = timeObject.minutes <= 9 ? `0${timeObject.minutes}` : timeObject.minutes
}