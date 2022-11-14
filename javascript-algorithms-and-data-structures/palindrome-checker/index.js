function palindrome(str) {
    let regex = /[a-z0-9]/gi; //Regex  
    let arr = str.toLowerCase().match(regex);
    let len = arr.length - 1;

    for (let i = 0; i < arr.length / 2; i++) {
        if (arr[i] !== arr[len - i])
            return false;
    }
    return true;
}

console.log(palindrome("eybiribye"));