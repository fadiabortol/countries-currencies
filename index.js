var apiCountries = [];
var CurrVal = [];
fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(Countries => {
        console.log(Countries);
        apiCountries = Countries;

        for (let i = 0; i < Countries.length; i++) {
            var option = document.createElement('option');
            option.innerHTML = Countries[i].name.common;
            document.getElementById('Countries').appendChild(option);
        }
    })

function ExchangeRate() {
    var selectedValue = document.getElementById('Countries').value;
    result = apiCountries.find((x) => x.name.common == selectedValue);
    console.log(result);

    var img = document.createElement('img');
    img.src = result.flags.png;
    document.getElementById('img').innerHTML = '';
    document.getElementById('img').appendChild(img);
    var currency = result.currencies;
    currency = Object.entries(currency);

    console.log('currency', currency);
    for (let i = 0; i < currency.length; i++) {
        var button = document.createElement('button');
        var span = document.createElement('span')
        document.getElementById('bi').innerHTML = '';
        document.getElementById('bi').appendChild(button).addEventListener('click', clickHandler);
        document.getElementById('bi').appendChild(span).setAttribute('id', 'inp');;
        button.innerHTML = currency[i][0];;

        CurrVal = currency[i][0];
    }
}
function clickHandler() {
    console.log('currency', CurrVal);
    fetch('https://api.fastforex.io/fetch-multi?from=' + CurrVal + '&to=USD&api_key=8e1e6065c8-62b4789eb3-rqe2ww')
        .then(response => response.json())
        .then(response => {
            console.log(response);
            console.log(response.results);
            console.log(response.results.USD);
            document.getElementById('inp').innerHTML = response.results.USD + ' $';
        })
}
