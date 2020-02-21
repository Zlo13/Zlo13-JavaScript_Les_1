let startBtn = document.getElementById("start"),
    budgetValue = document.querySelector('.budget-value'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value'),
    expensesItemBtn = document.getElementsByTagName('button')[0],
    expensesItem = document.getElementsByClassName('expenses-item'),
    expensesValue = document.querySelector('.expenses-value'),
    optionalExpensesBtn = document.querySelector('.optionalexpenses-btn'),
    optionalExpensesItem = document.getElementsByClassName('optionalexpenses-item'),
    optionalExpensesValue = document.querySelector('.optionalexpenses-value'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    daybudgetValue = document.querySelector('.daybudget-value'),
    levelValue = document.querySelector('.level-value'),
    incomeItem = document.querySelector('.choose-income'),
    incomeValue = document.querySelector('.income-value'),
    checkSavings = document.querySelector('.checksavings'),
    sumValue = document.querySelector('.choose-sum'),
    procentValue = document.querySelector('.choose-percent'),
    monthSavingsValue = document.querySelector('.monthsavings-value'),
    yearSavingsValue = document.querySelector('.yearsavings-value');

let many, time;

startBtn.addEventListener('click', function () {

    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    many = +prompt("ваш бюджет на месяц");

    while (isNaN(many) || many == null || many == "") {
        many = +prompt("ваш бюджет на месяц");
    }

    appData.budget = many;
    appData.timeDate = time;

    budgetValue.textContent = many.toFixed();

    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();
});

expensesItemBtn.addEventListener('click', function () {
    // функция по наполнению обязательных расходов
    let sum = 0;
    for (let i = 0; i < expensesItem.length; i++) {
        let a = expensesItem[i].value,
            b = expensesItem[++i].value;

        if (a != null && b != null && a != "" && b != "") {
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i = i - 1;
            //перезапускаем цикл заново при не правильном заполнении формы
        }
    }
    expensesValue.textContent = sum;
});
optionalExpensesBtn.addEventListener('click', function () {
    // закоментировал вариант с суммированием введенных значений
    // let sum = 0;
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let opt = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = opt;
        // sum += +opt;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ',  '; //вариант перечисления введенных данных
    }
    // optionalExpensesValue.textContent = sum;
});

countBudgetBtn.addEventListener('click', function () {

    if (appData.budget != undefined) {
        appData.manyPerDay = (appData.budget / 30).toFixed();
        daybudgetValue.textContent = appData.manyPerDay;

        if (appData.manyPerDay < 1000) {
            levelValue.textContent = "Ваш бюджет ниже среднего";
        } else if (appData.manyPerDay > 1000 && appData.manyPerDay < 5000) {
            levelValue.textContent = "У вас средний доход";
        } else if (appData.manyPerDay > 5000) {
            levelValue.textContent = "У вас высокий доход";
        } else {
            levelValue.textContent = "ОШИБКА";
        }
    } else {
        budgetValue.textContent = "ОШИБКА";
    }
});

incomeItem.addEventListener('input', function () { //вместо input можно использовать change

    let items = incomeItem.value;
    appData.income = items.split(", ");

    incomeValue.textContent = appData.income;

});

checkSavings.addEventListener('click', function () {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +procentValue.value;

        appData.monthIncome = (sum / 100 / 12) * percent; // расчитываем доход от накоплений в месяц
        appData.yearIncome = (sum / 100) * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

procentValue.addEventListener('input', function () {
    if (appData.savings == true) {
        let sum = +sumValue.value,
            percent = +procentValue.value;

        appData.monthIncome = (sum / 100 / 12) * percent; // расчитываем доход от накоплений в месяц
        appData.yearIncome = (sum / 100) * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

let appData = {
    budget: many, // общий бюджет
    timeDate: time, //дата
    expenses: {}, // статья и обязательные расходы в месяц
    optionalExpenses: {}, //статья не обязательных расходов
    income: [],
    savings: false, //накопления
};