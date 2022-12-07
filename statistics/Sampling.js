
function rouletteWheelSelection(values = [], prob = x => x, random){
    let f = [];
    let previous = 0;
    values.forEach((x, i) => f[i] = previous + prob(x));
    let r = random.nextDouble();
    
}
