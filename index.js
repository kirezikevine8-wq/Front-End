document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const messageBox = document.getElementById("formMessage");
    messageBox.style.display = "none";

    const payload = {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch("https://milk-api-l8fd.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const raw = await response.text();
        let data;

        try {
            data = JSON.parse(raw);
        } catch {
            showMessage("Invalid server response", "error");
            return;
        }

        if (response.ok && data.status === "success") {
            showMessage(data.message, "success");

            // Save user info
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect based on role
            setTimeout(() => {
                if (data.user.role === "admin") {
                    window.location.href = "admin_dashboard.html";
                } else {
                    window.location.href = "user_dashboard.html";
                }
            }, 1200);

        } else {
            showMessage(data.message || "Login failed", "error");
        }

    } catch (error) {
        showMessage("Server error. Please try again.", "error");
        console.error(error);
    }

    function showMessage(message, type) {
        messageBox.innerText = message;
        messageBox.className = `message ${type}`;
        messageBox.style.display = "block";
    }
});
