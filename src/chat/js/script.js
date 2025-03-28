function addText() {
            let input = document.getElementById("textInput");
            let container = document.getElementById("scrollContainer");

            if (input.value.trim() !== "") {
                let newItem = document.createElement("div");
                newItem.classList.add("alert", "alert-secondary", "fade-in");
                newItem.textContent = input.value;
                container.appendChild(newItem);
                input.value = ""; // Очистка поля ввода

                // Автопрокрутка вниз
                container.scrollTop = container.scrollHeight;
            }
        }