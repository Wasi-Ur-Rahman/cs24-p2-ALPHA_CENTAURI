// useSignup.js
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { message } from 'antd';

const useLogin = () => {
    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loginUser = async (values) => {

        try {
            setError(null);
            setLoading(true);
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            });

            const data = await res.json();
            const {user} = data;

            if (res.ok) {
                message.success(data.message);
                login(data.token, data.user);
            } else {
                let errorMessage = data.message || "Registration failed";
                if (errorMessage === "User logged in successfully!") 
                    errorMessage = "Permission Denied";
                setError(errorMessage);
                message.error(errorMessage);
            }
        } catch (error) {
            message.error("An error occurred while registering.");
            console.error("Registration error:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser };
};

export default useLogin;
