import React, { useState } from "react";
import { Card, Form, Input, Button, Alert, Spin } from "antd";
import { useHistory } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const [resetToken, setResetToken] = useState(null);
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  const handleInitiateResetPassword = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/auth/reset-password", values);
      setResetToken(response.data.resetToken);
      setStep(2);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleConfirmResetPassword = async (values) => {
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/auth/reset-password/confirm", {
        resetToken,
        previousPassword: values.previousPassword, // Include previous password
        newPassword: values.newPassword,
      });
      setSuccess(true);
      setTimeout(() => {
        history.push("/auth/login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card className="form-container">
      <Form
        layout="vertical"
        onFinish={step === 1 ? handleInitiateResetPassword : handleConfirmResetPassword}
        autoComplete="off"
      >
        {step === 1 ? (
          <>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email",
                },
                {
                  type: "email",
                  message: "Please input a valid email",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
                loading={loading}
              >
                {loading ? <Spin /> : "Initiate Reset Password"}
              </Button>
            </Form.Item>
          </>
        ) : (
            <>
            <Form.Item
              label="Previous Password"
              name="previousPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your previous password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your previous password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
              ]}
            >
              <Input.Password size="large" placeholder="Enter your new password" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="btn"
                loading={loading}
              >
                {loading ? <Spin /> : "Confirm Reset Password"}
              </Button>
            </Form.Item>
          </>
        )}
         {error && <Alert message={error} type="error" />}
        {success && (
          <Alert
            message="Password reset successful! Redirecting to login page..."
            type="success"
          />
        )}
      </Form>
    </Card>
  );
};

export default ResetPassword;