import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showUser, setShowUser] = useState<boolean>(false);

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    setShowUser(false);
    e.preventDefault();
    if (validateEmail(email)) {
      setShowUser(true);
      setError("");
      return;
    }
    setError("メールアドレスが有効ではありません");
    return false;
  };

  return (
    <>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>メールアドレス</Form.Label>
          <Form.Control
            type="email"
            placeholder="メールアドレス入力"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>パスワード</Form.Label>
          <Form.Control
            type="password" //type="text"にしてみる
            placeholder="パスワード入力"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {showUser && (
          <Alert data-testid="user" variant="success">
            {email}
          </Alert>
        )}
        {error && (
          <Alert data-testid="error" variant="danger">
            {error}
          </Alert>
        )}

        <Button data-testid="submit" variant="primary" type="submit">
          送信
        </Button>
      </Form>
    </>
  );
};

export const validateEmail = (email:string):boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export default Login;