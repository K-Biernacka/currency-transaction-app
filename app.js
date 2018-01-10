(function () {
    let rate;


    document.getElementById('confirm-rate').addEventListener('submit', function(event) {
        event.preventDefault();
        let euro = document.getElementById('final-rate');
        let input = event.target[0];
        euro.innerText = input.value;
        rate = input.value;
        input.value = '';
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

    } );

    let addItemToList = (text, amountInEur) => {
        let list = document.getElementById('transaction-list');
        let item = document.createElement('div');
        item.innerText = text;
        item.className = 'justify-content-between d-flex list-item';
        let button = document.createElement('i');
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
        });

        button.className = 'fa fa-trash';
        button.setAttribute('type', 'submit');

        list.appendChild(item);
        item.appendChild(amount);
        item.appendChild(exchange);
        item.appendChild(button);
        totalAmount();
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
        sumEur.innerText = `${sum} Total EUR`;

        // let listPln = document.querySelectorAll('.amount-in-pln');
        // let plnSum = 0;
        // for (let i = 0; i < listPln.length; i++) {
        //     let pln = listPln[i].innerText;
        //     let totalPln = parseFloat(pln);
        //     plnSum += totalPln;
        // }
        // let sumPln = document.getElementById('plnSum');
        // sumPln.innerText = `${plnSum} Total PLN`
    };


})();