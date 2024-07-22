const radioButtons = document.querySelectorAll('input[type="radio"]'),
    form = document.querySelector("form"),
    result = document.querySelector("#monthly-payment"),
    result2 = document.querySelector("#total-repayments"),
    mortage_amount = document.querySelector("#mortage-amount"),
    mortage_term=document.querySelector("#mortage-term"),
    interest_rate=document.querySelector("#interest-rate"),
    deafult_result = document.querySelector("#default-result"),
    resultbox = document.querySelector(".result"),
    inputs = document.querySelectorAll("input"),
    error_msg=document.querySelector("#error-msg")

let method = null;
const formatter = new Intl.NumberFormat('en-US');


const validateInput = (method) => {
    try {
        if(mortage_amount.value === ""){
             mortage_amount.classList.add("border-red-500","bg-red-100")
             setTimeout(()=>mortage_amount.classList.remove("border-red-500","bg-red-100"),1000)
             throw "Mortage Amount is required"
        }else if(mortage_term.value===""){
            mortage_term.classList.add("border-red-500","bg-red-100")
            setTimeout(()=>mortage_term.classList.remove("border-red-500","bg-red-100"),1000)
            throw "Mortage term is required"
        }else if(interest_rate.value===""){
            interest_rate.classList.add("border-red-500","bg-red-100")
            setTimeout(()=>interest_rate.classList.remove("border-red-500","bg-red-100"),1000)
            throw "Interest rate is required"
        }else if(method === null){
            throw "Select a mortgage type"
        }else{
            throw ""
        }
       
    } catch (error) {
        error_msg.innerHTML=error;  
    }   
}

const check = () => {
    radioButtons.forEach(button => {
        button.parentElement.classList.remove('border-yellow-400', 'bg-yellow-100');

        if (button.checked) {
            button.parentElement.classList.add('border-yellow-400', 'bg-yellow-100');
        }
    });
};


const mortageCalc = () => {

    radioButtons.forEach(e => {
        if (e.checked)
            method = e.id;
    })
    validateInput(method);


    const amount = parseFloat(mortage_amount.value),
        terms = parseInt(mortage_term.value, 10),
        interest = parseFloat(interest_rate.value) / 100;

    const monthlyInterestRate = interest / 12;
    const totalPayments = terms * 12;

    

    let monthly_payments, total_repayments;

    if (method === "interest") {
        monthly_payments = amount * monthlyInterestRate;
        total_repayments = (monthly_payments * totalPayments) + amount;
    } else if(method==="repayments"){
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
    mortageCalc();
    e.preventDefault();
})

radioButtons.forEach(button => {
    button.addEventListener("change", check);
});







