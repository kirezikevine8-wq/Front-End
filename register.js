document.getElementById("registerForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const messageBox = document.getElementById("formMessage");
    const btnText = document.getElementById("btnText");
    const btnLoader = document.getElementById("btnLoader");
    const registerBtn = document.getElementById("registerBtn");

    // START loading
    messageBox.style.display = "none";
    btnText.style.display = "none";
    btnLoader.style.display = "inline";
    registerBtn.disabled = true;

    const payload = {
        fullname: document.getElementById("fullname").value,
        phone: document.getElementById("phone").value,
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
        passwordConfirmation: document.getElementById("passwordConfirmation").value
    };

    // Frontend validation
    if (payload.password !== payload.passwordConfirmation) {
        showMessage("Passwords do not match", "error");
        stopLoading();
        return;
    }

    try {
        const response = await fetch("https://milk-api-l8fd.onrender.com/api/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok && data.status === "success") {
            showMessage(data.message, "success");
            document.getElementById("registerForm").reset();
        } else {
            showMessage(data.message || "Registration failed", "error");
        }

    } catch (error) {
        showMessage("Server error. Please try again.", "error");
        console.error(error);
    }

    stopLoading();

    function showMessage(message, type) {
        messageBox.innerText = message;
        messageBox.className = `message ${type}`;
        messageBox.style.display = "block";
    }

    function stopLoading() {
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
        registerBtn.disabled = false;
    }
});
