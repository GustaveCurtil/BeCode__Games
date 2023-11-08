let submitNumber = document.querySelector('input[type="button"]')
let reset = document.querySelector('button')
let number = document.querySelector('input[type="number"]')
let magicNumber = Math.floor(Math.random() * 25);

let message = document.querySelector("#message")
console.log(message.innerHTML)

reset.addEventListener('click', function() {
    console.log(magicNumber)
    magicNumber = Math.floor(Math.random() * 25);
    message.innerHTML="New magic number, good luck!"
})

submitNumber.addEventListener('click', function() {
    if (number.value == "" || number.value < 0 || number.value > 24) {
        console.log("please enter a number between 0 and 25")
    }
    else {
        if (magicNumber == number.value) {
            message.innerHTML = "Congratz, the magic number is " + magicNumber;
        } else {
            message.innerHTML = "take another guess"
        }
    }
});

console.log("The magic number is " + magicNumber)

