document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById("modal");
    const closeBtn = document.getElementsByClassName("close")[0];
    const suggestionForm = document.getElementById('suggestion-form');

    modal.style.display = "none";

    suggestionForm.addEventListener('submit', async function(event) {
        event.preventDefault();  

        const name = document.getElementById('name').value;
        const comment = document.getElementById('comment').value;

        const response = await fetch('/api/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, comment }),
        });

        const modalMessage = modal.querySelector("p");

        if (response.ok) {
            modalMessage.textContent = 'Gracias por tu recomendación!';
        } else {
            modalMessage.textContent = 'Hubo un error al enviar tu recomendación.';
        }

        modal.style.display = "block";

        suggestionForm.reset();
    });

    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
});
