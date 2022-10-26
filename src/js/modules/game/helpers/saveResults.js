export const saveResults = (stepCount, minutes, seconds, timeToVictory, dimension) => ({
    step: stepCount,
    time: `${minutes}:${seconds}`,
    victoryTime: timeToVictory,
    sizeBoard: `${dimension}x${dimension}`,
})