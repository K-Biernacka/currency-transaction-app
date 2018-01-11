(function () {
    let rate;

    let updateRate = () => {
        let newAmount = document.querySelectorAll('#transaction-list > div');
        for (let i = 0; i < newAmount.length; i++) {
        let oldAmountInEur = newAmount[i].getElementsByClassName('amount-in-eur')[0].innerText;
        oldAmountInEur = parseFloat(oldAmountInEur);
        newAmount[i].getElementsByClassName('amount-in-pln')[0].innerText = `${(oldAmountInEur * rate).toFixed(2)} PLN`;
        }
    };
    let highAmount = () => {
        let maxAmount = document.querySelectorAll('#transaction-list > div');
        let max = parseFloat(maxAmount[0].getElementsByClassName('amount-in-eur')[0].innerText);
        let maxItem = maxAmount[0];
        for (let i = 1; i < maxAmount.length; i++) {

            if (max < parseFloat(maxAmount[i].getElementsByClassName('amount-in-eur')[0].innerText)) {
                max = parseFloat(maxAmount[i].getElementsByClassName('amount-in-eur')[0].innerText);
                maxItem = maxAmount[i];
            }

        }






    };

    document.getElementById('confirm-rate').addEventListener('submit', function(event) {
        event.preventDefault();
        let euro = document.getElementById('final-rate');
        let input = event.target[0];
        euro.innerText = input.value;
        rate = input.value;
        input.value = '';
        updateRate();

    });

    document.getElementById('transaction-form').addEventListener('submit', function(event) {
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
        item.innerText = text;
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
        button.addEventListener('click', function(event) {
            item.remove();
            totalAmount();
            highAmount();
        });
        button.className = 'btn button-delete';
        button.setAttribute('type', 'submit');
        button.innerText = 'delete';

        list.appendChild(item);
        item.appendChild(amount);
        item.appendChild(exchange);
        item.appendChild(button);
        totalAmount();
        highAmount();
    };

    let totalAmount = () => {
        let listEur = document.querySelectorAll('.amount-in-eur');
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