// ======================
// ЭКРАНЫ
// ======================

const startScreen =
document.getElementById("startScreen");

const questionScreen =
document.getElementById("questionScreen");

const formScreen =
document.getElementById("formScreen");

const successScreen =
document.getElementById("successScreen");

const yesBtn =
document.getElementById("yesBtn");

const noBtn =
document.getElementById("noBtn");

// ======================
// ПОКАЗ ВОПРОСА
// ======================

function showQuestion(){

    startScreen.classList.remove("active");

    questionScreen.classList.add("active");

}

// ======================
// КНОПКА НЕТ
// ======================

let posX = 0;
let posY = 0;
let noCounter = 0;

const funnyMessages = [

    "Эй 😳",
    "Так нельзя 🙈",
    "Попробуй ещё раз 😅",
    "Кнопка сломалась 🤭",
    "Кажется, выбора нет 😎",
    "Нажми лучше Да ❤️"

];

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);

noBtn.addEventListener(
    "click",
    function(){

        noBtn.style.opacity = "0";

        setTimeout(() => {

            const msg =
                document.createElement("div");

            msg.classList.add(
                "funny-message"
            );

            msg.innerHTML =

            funnyMessages[
                Math.floor(
                    Math.random() *
                    funnyMessages.length
                )
            ];

            document
            .querySelector(
                ".question-buttons"
            )
            .appendChild(msg);

            setTimeout(() => {

                msg.remove();

                noBtn.style.opacity = "1";

            },2000);

        },300);

    }
);



function moveNoButton(){

    const moveX =
        (Math.random() - 0.5) * 500;

    const moveY =
        (Math.random() - 0.5) * 500;

    posX += moveX;
    posY += moveY;

    const limitX =
        window.innerWidth / 3;

    const limitY =
        window.innerHeight / 3;

    posX =
        Math.max(
            -limitX,
            Math.min(limitX,posX)
        );

    posY =
        Math.max(
            -limitY,
            Math.min(limitY,posY)
        );

    noBtn.style.transform =
        `translate(${posX}px, ${posY}px)`;

    noCounter++;

    if(noCounter === 5){

        noBtn.innerHTML =
        "Ну пожалуйста 🥺";

    }

    if(noCounter === 10){

        noBtn.innerHTML =
        "Ты точно уверена? 😢";

    }

    if(noCounter === 15){

        noBtn.innerHTML =
        "Я очень старался ❤️";

    }

}

noBtn.addEventListener(
    "mouseenter",
    moveNoButton
);

noBtn.addEventListener(
    "touchstart",
    function(e){

        e.preventDefault();

        moveNoButton();

    }
);

// ======================
// КНОПКА ДА
// ======================

yesBtn.addEventListener(
    "click",
    () => {

        questionScreen.classList.remove("active");

        formScreen.classList.add("active");

    }
);

// ======================
// СЕРДЕЧКИ ФОНА
// ======================

function createHeart(){

    const heart =
        document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        15 + Math.random() * 25 + "px";

    heart.style.animationDuration =
        4 + Math.random() * 4 + "s";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },8000);

}

setInterval(
    createHeart,
    800
);

// ======================
// TELEGRAM
// ======================

const BOT_TOKEN =
"8871441990:AAHOgAKJK8FjC0txnsk1soDS7zPPhvFwOxs";

const CHAT_ID =
"972285618";

// ======================
// ОТПРАВКА ФОРМЫ
// ======================

document
.getElementById("dateForm")
.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    const date =
    document
    .getElementById("date")
    .value;

    const time =
    document
    .getElementById("time")
    .value;

    const comment =
    document
    .getElementById("comment")
    .value;

    const foods = [];

    document
    .querySelectorAll(
        '.food-card input:checked'
    )
    .forEach(item => {

        foods.push(
            item.value
        );

    });

    const dateType =

    document
    .querySelector(
        'input[name="dateType"]:checked'
    )?.value || "Не выбрано";

    const message =

`❤️ Она согласилась на свидание ❤️

📅 Дата:
${date}

🕒 Время:
${time}

✨ Формат:
${dateType}

🍽️ Еда:
${foods.join(", ") || "Не выбрано"}

💌 Пожелания:
${comment || "Нет пожеланий"}
`;

    try{

        const response =

        await fetch(

        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,

        {

            method:"POST",

            headers:{
                "Content-Type":
                "application/json"
            },

            body:JSON.stringify({

                chat_id:CHAT_ID,

                text:message

            })

        });

        const result =
        await response.json();

        if(result.ok){

            formScreen.classList.remove("active");

            successScreen.classList.add("active");

            createCelebration();

        }else{

            alert(
                "Ошибка отправки в Telegram"
            );

            console.log(result);

        }

    }catch(error){

        console.error(error);

        alert(
            "Ошибка соединения"
        );

    }

});

// ======================
// ФИНАЛЬНЫЙ САЛЮТ
// ======================

function createCelebration(){

    for(
        let i = 0;
        i < 150;
        i++
    ){

        setTimeout(() => {

            createHeart();

        }, i * 60);

    }

}