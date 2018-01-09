document.getElementById('confirm-rate').addEventListener('submit', function(event) {
    event.preventDefault();
    let euro = document.getElementById('final-rate');
    let input = event.target[0];
    euro.innerText = input.value;
    input.value = '';
});

document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();
    let input = document.getElementById('transaction');
    if (input.value) addItemToList(input.value);
    input.value = '';
} );


let addItemToList = (text) => {
    let list = document.getElementById('transaction-list');
    let item = document.createElement('div');
    item.innerText = text;
    item.className = 'justify-content-between d-flex list-item';
    let button = document.createElement('div');
    button.addEventListener('click', function(event) {
        item.remove();
    });

    button.className = 'btn';
    button.setAttribute('type', 'submit');
    item.appendChild(button);
    list.appendChild(item);
};

