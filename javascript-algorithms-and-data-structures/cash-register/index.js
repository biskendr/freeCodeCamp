const checkCashRegister = (price, cash, cid) => {
    const UNIT_AMOUNT = {
        "PENNY": .01,
        "NICKEL": .05,
        "DIME": .10,
        "QUARTER": .25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    }

    let changeToGive = Number((cash - price).toFixed(2));
    let totalCID = cid.reduce((sum, group) => sum + group[1], 0).toFixed(2);

    let changeArray = [];

    if (changeToGive > totalCID)
        return { status: "INSUFFICIENT_FUNDS", change: changeArray };
    else if (changeToGive.toFixed(2) === totalCID)
        return { status: "CLOSED", change: cid };
    else {
        cid = cid.reverse();
        for (let elem of cid) {
            let temp = [elem[0], 0];
            while (changeToGive >= UNIT_AMOUNT[elem[0]] && elem[1] > 0) {
                temp[1] += UNIT_AMOUNT[elem[0]];
                elem[1] -= UNIT_AMOUNT[elem[0]];
                changeToGive -= UNIT_AMOUNT[elem[0]];
                changeToGive = changeToGive.toFixed(2);
            }
            if (temp[1] > 0) {
                changeArray.push(temp);
            }
        }
    }
    if (changeToGive > 0) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
    return { status: "OPEN", change: changeArray };

}


console.log(checkCashRegister(18.50, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));