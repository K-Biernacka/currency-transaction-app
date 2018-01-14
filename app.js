(function () {
    let rate;

    let updateRate = () => {
        let newAmount = document.querySelectorAll('.list-item');
        for (let i = 0; i < newAmount.length; i++) {
            let oldAmountInEur = newAmount[i].getElementsByClassName('amount-in-eur')[0].innerText;
            oldAmountInEur = parseFloat(oldAmountInEur);
            newAmount[i].getElementsByClassName('amount-in-pln')[0].innerText = `${(oldAmountInEur * rate).toFixed(2)} PLN`;
        }
    };
    let highAmount = () => {
        document.getElementById('biggest-amount').innerHTML = '';
        let transactionList = document.querySelectorAll('#transaction-list > .list-item');
        if (transactionList.length) {
            let max = parseFloat(transactionList[0].getElementsByClassName('amount-in-eur')[0].innerText);
            let maxItem = transactionList[0];
            for (let i = 1; i < transactionList.length; i++) {

                if (max < parseFloat(transactionList[i].getElementsByClassName('amount-in-eur')[0].innerText)) {
                    max = parseFloat(transactionList[i].getElementsByClassName('amount-in-eur')[0].innerText);
                    maxItem = transactionList[i];
                }
            }
            let biggestAmount = maxItem.cloneNode(true);
            biggestAmount.getElementsByTagName('button')[0].remove();
            document.getElementById('biggest-amount').appendChild(biggestAmount);
        }
    };

    document.getElementById('confirm-rate').addEventListener('submit', function (event) {
            event.preventDefault();
            let euro = document.getElementById('final-rate');
            let input = event.target[0];

        if (isNaN(input.value)) {
            return alert('Rate has to be a number!');
        } else {
            euro.innerText = input.value;
            rate = input.value;
            input.value = '';
            updateRate();
        }
    });

    document.getElementById('transaction-form').addEventListener('submit', function (event) {
        event.preventDefault();
        let input = document.getElementById('transaction');
        let amount = document.getElementById('amount');
        if (input.value && amount.value) {
            addItemToList(input.value, amount.value);
            input.value = '';
            amount.value = '';
        }
    });

    let addItemToList = (text, amountInEur) => {
        let list = document.getElementById('transaction-list');
        let item = document.createElement('div');
        let name = document.createElement('div');
        name.className = 'name';
        name.innerText = text;
        item.className = 'justify-content-between d-flex list-item';
        let button = document.createElement('button');
        let amount = document.createElement('div');
        let exchange = document.createElement('div');
        exchange.className = 'amount-in-pln';
        let amountInPln = parseFloat(amountInEur * rate).toFixed(2);
        exchange.innerText = `${amountInPln} PLN`;
        amountInEur = parseFloat(amountInEur).toFixed(2);
        amount.innerText = `${amountInEur} EUR`;
        amount.className = 'amount-in-eur';
        button.addEventListener('click', function () {
            item.remove();
            totalAmount();
            highAmount();
        });
        button.className = 'btn button-delete';
        button.setAttribute('type', 'submit');
        button.innerText = 'delete';

        list.appendChild(item);
        item.appendChild(name);
        item.appendChild(amount);
        item.appendChild(exchange);
        item.appendChild(button);
        totalAmount();
        highAmount();
    };

    let totalAmount = () => {
        let listEur = document.querySelectorAll('#transaction-list .amount-in-eur');
        let sum = 0;
        for (let i = 0; i < listEur.length; i++) {
            let value = listEur[i].innerText;
            let totalEur = parseFloat(value);
            sum += totalEur;
        }
        let sumEur = document.getElementById('euro-sum');
        sumEur.innerText = `${sum.toFixed(2)} Total EUR`;
    };
})();