const select = document.querySelectorAll('select');
const input = document.querySelectorAll('input');
const API_URL = "https://v6.exchangerate-api.com/v6/97cc48727a6e7eaab3ee0d32/latest/USD";
let html = '';

async function currency(){
    const res = await fetch(API_URL);
    const data = await res.json();
    const arrKeys = Object.keys(data.conversion_rates)
    const rates = data.conversion_rates;
    console.log(rates)
    arrKeys.map(item =>{
        return html += `<option value=${item}>${item}</option>`
    });
    console.log(html);
    for(let i=0; i<select.length; i++){
        select[i].innerHTML = html;
    };
    
    input[0].addEventListener('keyup', ()=> {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    });
    input[1].addEventListener('keyup', ()=> {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    });
    
    select[0].addEventListener('change', ()=> {
        input[1].value = input[0].value * rates[select[1].value] / rates[select[0].value];
    });
    select[1].addEventListener('change', ()=> {
        input[0].value = input[1].value * rates[select[0].value] / rates[select[1].value];
    });

};

currency();