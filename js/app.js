const totalBalanceEl = document.querySelector('#totalBalance');
const incomesEl = document.querySelector('#incomes');
const outcomesEl = document.querySelector('#outcomes');
const profileUsernameEl = document.querySelector('#profileUsername');
const userTransactionsBoxEl = document.querySelector('.user-transactions-box');

const user = {
    username: 'Yenko',
    movements: [
                [4000, 'Foody Company', 'Salaries', '9/15/2023'],
                [-500, 'Iphone XS 256GB', 'Products','9/19/2023'],
                [-20, 'Netflix', 'Subscriptions', '9/22/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '9/30/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '10/7/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '10/11/2023']
            ]
}

// calc functions

const calcTotalBalance = function(movements) {
    return movements.reduce((acc, curr) => acc + curr[0], 0);
}
const calcIncomes = function(movements) {
    return movements.map((el) => el[0]).filter((el) => el > 0).reduce((acc, curr) => acc + curr, 0);
}

const calcOutcomes = function(movements) {
    return movements.map((el) => el[0]).filter((el) => el < 0).reduce((acc, curr) => acc + curr, 0);
}

// format value functions

const formatNum = function(number) {
    return new Intl.NumberFormat('en-US', {'style':'currency', 'currency':'USD'}).format(Math.abs(number));
}

// display functions
const displayTotalBalance = function() {
    const totalBalance = calcTotalBalance(user.movements);
    totalBalanceEl.innerHTML = formatNum(totalBalance);
}

const displayIncomes = function () {
    const incomes = calcIncomes(user.movements);
    incomesEl.innerHTML = formatNum(incomes)
}

const displayOutcomes = function () {
    const outcomes = calcOutcomes(user.movements);
    outcomesEl.innerHTML = formatNum(outcomes);
}

const displayUsername = function () {
    profileUsernameEl.innerHTML = `Welcome, ${user.username}`
}

const displayMovements = function () {
    user.movements.forEach((el) =>  {
        const movType = el[0] > 0 ? 'text-green' : 'text-red';

        const adjHtml = `<div class="user-transaction">
                            <div class="date-box">
                                <h3>JUN</h3>
                                <h4>2023</h4>
                            </div>
                            <h5>${el[1]}</h5>
                            <h5 class="${movType}">${formatNum(el[0])}</h5>
                        </div>`

        userTransactionsBoxEl.insertAdjacentHTML('beforeend', adjHtml)
    })
}

displayTotalBalance();
displayIncomes();
displayOutcomes();
displayUsername();
displayMovements();