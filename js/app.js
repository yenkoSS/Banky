const totalBalanceEl = document.querySelector('#totalBalance');
const incomesEl = document.querySelector('#incomes');
const outcomesEl = document.querySelector('#outcomes');
const profileUsernameEl = document.querySelector('#profileUsername');
const userTransactionsBoxEl = document.querySelector('.user-transactions-box');

const user = {
    username: 'Yenko',
    movements: [
                [1000, 'Foody Company', 'Salaries', '2/15/2023'],
                [-500, 'Iphone XS 256GB', 'Products','9/19/2023'],
                [-20, 'Netflix', 'Subscriptions', '9/22/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '9/30/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '10/7/2023'],
                [200, 'Libra Bank ATM', 'Deposits', '10/11/2023']
            ],
    currency: "USD",
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

const formatMonthtoString = function (monthIndex) {
    const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthsNames[monthIndex];
}

const calcDate = function(date) {

    const today = new Date();
    const movDate = new Date(date);
    const passedDays = Math.round((today - movDate) / (1000 * 60 * 60 * 24));
    const passedMonths = today.getMonth() - movDate.getMonth();


    if (passedDays <= 1) {
        return '<h4>today</h4>'
    } else if (passedDays <= 2) {
        return '<h4>yesterday</h4>'
    } else if (passedMonths <= 6) {
        return `<h4>${new Intl.DateTimeFormat('en-us').format(movDate)}</h4>`;
    } else if (passedMonths > 7) {
        return `<h3>${formatMonthtoString(movDate.getMonth())}</h3>
                <h4>${movDate.getFullYear()}</h4>`;
    }

}

// format value functions

const formatNum = function(number, currency) {
    return new Intl.NumberFormat('en-US', {'style':'currency', 'currency': currency}).format(number);
}

// display functions
const displayTotalBalance = function() {
    const totalBalance = calcTotalBalance(user.movements);
    totalBalanceEl.innerHTML = formatNum(totalBalance, user.currency);
}

const displayIncomes = function () {
    const incomes = calcIncomes(user.movements);
    incomesEl.innerHTML = formatNum(incomes, user.currency)
}

const displayOutcomes = function () {
    const outcomes = calcOutcomes(user.movements);
    outcomesEl.innerHTML = formatNum(outcomes, user.currency);
}

const displayUsername = function () {
    profileUsernameEl.innerHTML = `Welcome, ${user.username}`
}

const displayMovements = function () {
    user.movements.reverse().forEach((el) =>  {
        const movType = el[0] > 0 ? 'text-green' : 'text-red';
        const dateformat = calcDate(el[3]);
        const adjHtml = `<div class="user-transaction">
                            <div class="date-box">
                                ${dateformat}
                            </div>
                            <h5>${el[1]}</h5>
                            <h5 class="${movType}">${formatNum(el[0], user.currency)}</h5>
                        </div>`

        userTransactionsBoxEl.insertAdjacentHTML('beforeend', adjHtml)
    })
}

displayTotalBalance();
displayIncomes();
displayOutcomes();
displayUsername();
displayMovements();


// CHARTS

const mychart = document.querySelector('#mychart');
const doughnutChart = document.querySelector('#doughnutChart')

new Chart("mychart", {
    type: "line",
    data: {
        labels: user.movements.map((el) => el[3]).reverse(),
        datasets: [{
        backgroundColor:"rgba(0,120,255,1.0)",
        borderColor: "rgba(0,0,220,0.1)",
        data: user.movements.map((el) => el[0]).reverse(),
        options: {
            plugins: {
                legend: {
                    labels: {
                        font: {
                            family: 'Roboto'
                        }
                    }

                }
            }
        }
        }]
    },
});

const barColors = [
    "rgba(41, 245, 39, 0.8)",
    "rgba(34, 187, 33, 0.8)",
    "rgba(255,0,94)",
    "rgba(255, 173, 0, 0.8)",
    "rgba(0,0,255,0.2)",
];

new Chart("doughnutChart", {
    type: "doughnut",
    data: {
        labels: user.movements.map((el) => el[3]),
        datasets: [{
        backgroundColor: barColors,
        data: user.movements.map((el) => el[0])
        }]
    },
    options: {
        title: {
        display: true,
        text: "World Wide Wine Production"
        }
    }
});