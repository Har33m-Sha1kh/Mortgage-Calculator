const radioButtons = document.querySelectorAll('input[type="radio"]'),
    form = document.querySelector("form"),
    result = document.querySelector("#monthly-payment"),
    result2 = document.querySelector("#total-repayments"),
    calculate = document.querySelector("#calculate"),
    mortage_amount = document.querySelector("#mortage-amount"),
    deafult_result = document.querySelector("#default-result"),
    resultbox = document.querySelector(".result"),
    inputs = document.querySelectorAll("input")

let method;
const formatter = new Intl.NumberFormat('en-US');

const check = () => {
    radioButtons.forEach(button => {
        button.parentElement.classList.remove('border-yellow-400', 'bg-yellow-100');

        if (button.checked) {
            button.parentElement.classList.add('border-yellow-400', 'bg-yellow-100');
        }
    });
};


const mortageCalc = () => {

    const amount = parseFloat(Number(mortage_amount.value)),
        terms = parseInt(document.querySelector("#mortage-term").value, 10),
        interest = parseFloat(document.querySelector("#interest-rate").value) / 100;

    const monthlyInterestRate = interest / 12;
    const totalPayments = terms * 12;

    radioButtons.forEach(e => {
        if (e.checked)
            method = e.id;
    })

    let monthly_payments, total_repayments;

    if (method === "interest") {
        monthly_payments = amount * monthlyInterestRate;
        total_repayments = (monthly_payments * totalPayments) + amount;
    } else {
        monthly_payments = amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments)) / (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
        total_repayments = monthly_payments * totalPayments;
    }

    if (!isNaN(monthly_payments) && !isNaN(total_repayments)) {

        deafult_result.classList.add("hidden");
        resultbox.classList.remove("hidden");
        result.innerHTML = `$ ${formatter.format(monthly_payments.toFixed(2))}`;
        result2.innerHTML = `$ ${formatter.format(total_repayments.toFixed(2))}`;
    }



}


form.addEventListener("reset", () => {
    radioButtons.forEach(e => e.parentElement.classList.remove('border-yellow-400', 'bg-yellow-100'))
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

radioButtons.forEach(button => {
    button.addEventListener("change", check);
});



calculate.addEventListener("click", mortageCalc);




