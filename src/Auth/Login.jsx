import React, { useState } from 'react';
import {
    Flex, Card, CardBody, CardHeader, Center, Divider, Box, VStack, FormControl, FormLabel, Input, Button, Heading, Text
} from '@chakra-ui/react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Pastikan axios diimpor

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const [handleFormUsername, setHandleFormUsername] = useState(false);
    const [handleFormPassword, setHandleFormPassword] = useState(false);

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
            localStorage.setItem("token", token);

            // Ambil detail pengguna
            const userResponse = await axios.get("http://localhost:8000/auth/user/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setHandleFormPassword(false);
            setHandleFormUsername(false);
            const userDetails = userResponse.data;
            localStorage.setItem("user", JSON.stringify(userDetails));

            login(); // Update state autentikasi di context
            navigate("/dashboard"); // Redirect ke dashboard
        } catch (error) {
            if (error.response) {
                console.log(error.response.data);

                setErrorMessage(() => {
                    const details = error.response.data.detail;

                    if (details && details.length > 0) {
                        if (details.length === 2 && details[0].msg === "Field required" && details[1].msg === "Field required") {
                            return "Masukkan Username dan Password";
                        }
                        if (details.length === 1 && details[0].msg === "Field required") {
                            return "Harap Di Isi Secara Lengkap";
                        }
                    }

                    return details;
                });
            }

        }
    };

    return (

        <Box
            minH="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="gray.100"
            p={6}>
            <Box
                maxW="md"
                w="full"
                bg="white"
                p={8}
                borderRadius="md"
                boxShadow="md"
            >
                <Heading mb={6} textAlign="center">
                    Login
                </Heading>
                <form onSubmit={handleLogin}>
                    <VStack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                            />
                        </FormControl>

                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </FormControl>

                        {errorMessage && <Text color="red.500">{errorMessage}</Text>}

                        <Button
                            mt={4}
                            colorScheme="teal"
                            type="submit"
                            width="full"
                        >
                            Log In
                        </Button>
                    </VStack>
                </form>
            </Box>
        </Box>

    );
}

export default Login;
