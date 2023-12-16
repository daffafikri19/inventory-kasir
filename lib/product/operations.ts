export const incrementValue = (currentValue : number) => {
    return currentValue + 1;
}

export const decrementValue = (currentValue: number) => {
    return Math.max(0, currentValue - 1); 
}