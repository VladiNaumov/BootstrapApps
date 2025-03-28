document.addEventListener("DOMContentLoaded", function () {
    // Список вопросов: предложение и правильный ответ
    const questions = [
        { sentence: "I ___ to school every day.", answer: "go" },
        { sentence: "She ___ a book yesterday.", answer: "read" },
        { sentence: "They ___ playing football now.", answer: "are" }
    ];

    let currentQuestion = 0;
    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");

    // Показать первый вопрос
    addMessage(questions[currentQuestion].sentence, "bot");

    // Функция для добавления сообщений в чат
    function addMessage(text, sender) {
        const message = document.createElement("div");
        message.classList.add("message", sender);
        message.textContent = text;
        chatBox.appendChild(message);
        chatBox.scrollTop = chatBox.scrollHeight; // Прокрутка вниз к новым сообщениям
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
            setTimeout(() => {
                addMessage("Правильно! ✅", "bot");
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
            }, 1000); // Задержка перед следующим вопросом
        } else {
            setTimeout(() => {
                addMessage("Тест завершён! Спасибо за участие! 🎉", "bot");
            }, 1000);
        }
    }

    // Отправка по Enter
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendAnswer();
    });
});
