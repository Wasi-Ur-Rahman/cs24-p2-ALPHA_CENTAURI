import { Alert, Button, Card, Flex, Form, Input, Spin, Typography } from "antd";
import React from "react";
import loginImage from "../../assets/login.jpg";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
const Login = () => {
    const {error, loading, loginUser} = useLogin();
    const handleLogin = async (values) => {
        await loginUser(values);
    };
    return (
        <Card className="form-container">
      <Flex gap="large" align="center">
      <Flex flex={1}>
          <img src={loginImage} className="auth-image" />
        </Flex>
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Log In
          </Typography.Title>
          <Typography.Text type="secondary" strong className="slogan">
            Unlock the experience
          </Typography.Text>
          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
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
              <Input size="large" placeholder="Enter your email"></Input>
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Enter your password"
              ></Input.Password>
            </Form.Item>
 
            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="Alert"
              ></Alert>
            )}
 
            <Form.Item>
              <Button
                type={`${loading ? '' : 'primary'}`}
                htmlType="submit"
                size="large"
                className="btn"
              >
                {loading ? <Spin/> : 'Login'}
              </Button>
            </Form.Item>
 
            <Form.Item>
              <Link to="/auth/reset-password">
                <Button size="large" className="btn">
                  Reset Password
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
      </Flex>
    </Card>
    );
};
 
export default Login;