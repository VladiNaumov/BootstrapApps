document.addEventListener("DOMContentLoaded", function () {
    // Список вопросов: предложение и правильный ответ
    const questions = [
        { sentence: "I ___ to school every day.", answer: "go" },
        { sentence: "She ___ a book yesterday.", answer: "read" },
        { sentence: "They ___ playing football now.", answer: "are" },
		{ sentence: "I ___ to school every day.", answer: "go" },
        { sentence: "She ___ a book yesterday.", answer: "read" },
        { sentence: "They ___ playing football now.", answer: "are" },
		{ sentence: "I ___ to school every day.", answer: "go" },
        { sentence: "She ___ a book yesterday.", answer: "read" },
        { sentence: "They ___ playing football now.", answer: "are" }
    ];

    let currentQuestion = 0;
    let score = 0;
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const restartBtn = document.getElementById("restartBtn");

    // Проверка на наличие элементов
    if (!chatBox || !userInput || !restartBtn) {
        console.error("Не удалось найти необходимые элементы DOM");
        return;
    }

    // Показать первый вопрос
    addMessage(questions[currentQuestion].sentence, "bot");

    // Функция для добавления сообщений в чат
    function addMessage(text, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.textContent = text;
        chatBox.appendChild(message);
        // Прокрутка к последнему сообщению
        message.scrollIntoView({ behavior: "smooth", block: "end" });
    }

    // Функция для отправки ответа
    function sendAnswer() {
        const answer = userInput.value.trim().toLowerCase();
        if (answer === "") return;

        // Добавить ответ пользователя в чат
        addMessage(answer, "user");
        userInput.value = ""; // Очистить поле ввода

        // Проверка правильности ответа
        const correctAnswer = questions[currentQuestion].answer;
        if (answer === correctAnswer) {
            score++;
            setTimeout(() => {
                addMessage(`Правильно! ✅ Твой счёт: ${score}`, "bot");
                nextQuestion();
            }, 500);
        } else {
            setTimeout(() => {
                addMessage(`Неправильно. Правильный ответ: ${correctAnswer} ❌`, "bot");
                nextQuestion();
            }, 500);
        }
    }

    // Функция для перехода к следующему вопросу
    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            setTimeout(() => {
                addMessage(questions[currentQuestion].sentence, "bot");
            }, 1000);
        } else {
            setTimeout(() => {
                addMessage(`Тест завершён! Твой счёт: ${score}/${questions.length} 🎉`, "bot");
                restartBtn.style.display = "block"; // Показать кнопку перезапуска
                userInput.disabled = true; // Отключить ввод
            }, 1000);
        }
    }

    // Функция для перезапуска теста
    function restartTest() {
        currentQuestion = 0;
        score = 0;
        chatBox.innerHTML = "";
        userInput.disabled = false;
        restartBtn.style.display = "none";
        addMessage(questions[currentQuestion].sentence, "bot");
    }

    // Отправка по Enter
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendAnswer();
    });

    // Глобальная функция для вызова из HTML
    window.sendAnswer = sendAnswer;
    window.restartTest = restartTest;
});