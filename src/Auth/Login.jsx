import React from 'react'



const Login = () => {
    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            const response = await axios.post(
                "http://localhost:8000/auth/token", new URLSearchParams({
                    username: username,
                    password: password,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            const token = response.data.access_token;
            // console.log(response);

            // console.log(token);

            localStorage.setItem("token", token);

            // Ambil detail pengguna
            const userResponse = await axios.get("http://localhost:8000/auth/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(userResponse);
            const userDetails = userResponse.data;
            localStorage.setItem("user", JSON.stringify(userDetails));

            login(); // Update state autentikasi di context
            navigate("/dashboard"); // Redirect ke dashboard
        } catch (error) {
            if (error.response) {
                // Permintaan berhasil dikirim tetapi server merespons dengan status kode yang tidak dalam rentang 2xx
                setErrorMessage(`Login failed: ${error.response.data.detail || 'Please try again.'}`);
                // console.error('Login error response:', error.response.data);
            }
        }

    };

    return (
        <div>Login Page</div>
    )
}

export default Login