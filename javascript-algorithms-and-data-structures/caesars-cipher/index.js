function rot13(str) {
    let arr = str.toUpperCase();
    let regex = /[A-Z]/;
    let res = [];
    for (let i in arr) {
        if (regex.test(arr[i]) === true) {
            let char = arr.charCodeAt(i);
            if (char - 13 < 65) {
                char += 13;
            }
            else char -= 13;
            res.push(String.fromCharCode(char));
        }
        else { res.push(arr[i]); }
    }
    return res.join('');
}

console.log(rot13("SERR! PBQR PNZC"));