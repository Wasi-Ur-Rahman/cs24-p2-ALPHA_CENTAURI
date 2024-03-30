import { Alert, Button, Card, Flex, Form, Input, Radio, Spin, Typography } from "antd";
import React from "react";
import registerImage from "../../assets/registerImage.jpg";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import useSignup from "../../hooks/useSignup";


const Registration = () => {
  const {loading, error, registerUser} = useSignup();
  const handleRegister = (values) => {
    registerUser(values);
  };
  return (
    <Card className="form-container">
      <Flex gap="large" align="center">
        {/* form */}
        <Flex vertical flex={1}>
          <Typography.Title level={3} strong className="title">
            Create an account
          </Typography.Title>
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full name"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your full name!",
                },
              ]}
            >
              <Input size="large" placeholder="Enter your full name"></Input>
            </Form.Item>
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
            <Form.Item
              label="Password"
              name="passwordConfirm"
              rules={[
                {
                  required: true,
                  message: "Please input your confirm password",
                },
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Re-Enter your password"
              ></Input.Password>
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[
                {
                  required: true,
                  message: "Please select a role",
                },
              ]}
            >
              <Radio.Group>
                <Radio value="STS Manager">STS Manager</Radio>
                <Radio value="Landfill Manager">Landfill Manager</Radio>
                <Radio value="User">User</Radio>
              </Radio.Group>
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
                {loading ? <Spin/> : 'Create Account'}
              </Button>
            </Form.Item>
 
            <Form.Item>
              <Link to="/dashboard">
                <Button size="large" className="btn">
                  Dashboard
                </Button>
              </Link>
            </Form.Item>
          </Form>
        </Flex>
 
        {/* image */}
        <Flex flex={1}>
          <img src={registerImage} className="auth-image" />
        </Flex>
      </Flex>
    </Card>
  );
};
 
export default Registration;