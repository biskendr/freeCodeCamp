function convertToRoman(num) {
    const arr = [["M", 1000], ["CM", 900], ["D", 500], ["CD", 400], ["C", 100], ["XC", 90], ["L", 50], ["XL", 40], ["X", 10], ["IX", 9], ["V", 5], ["IV", 4], ["I", 1]];
    let roman = [];

    for (let i in arr) {
        while (num >= arr[i][1]) {
            roman.push(arr[i][0]);
            num -= arr[i][1];
        }
    }
    return roman.join('');
}

console.log(convertToRoman(16));