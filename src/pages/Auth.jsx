import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../context";
import { HOME_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from "../utils/consts";
import {login, registration, fetchCategories} from "../http/userAPI";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [i_sport_category, setISportCategory] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchCategories().then(data => user.setCategories(data))
  }, [])

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
      } else {
        data = await registration(username, password, surname, name, address, phone, sex, i_sport_category);
      }
      console.log(data);
      user.setUser(user);
      user.setIsAuth(true);
      navigate(HOME_ROUTE);
    } catch (e) {
      if (e.response?.data?.message) {
        alert(e.response.data.message);
      } else {
        alert("Произошла ошибка: " + (e.message || "Неизвестная ошибка"));
        console.error(e);
      }
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="shadow-lg p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className="d-flex flex-column" onSubmit={(e) => {
          e.preventDefault();
          click();
        }}>
          {!isLogin && (
            <>
              <Form.Control
                className="mt-3"
                placeholder="Введите вашу фамилию..."
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваше имя..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш адрес..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш телефон..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Form.Select
                className="mt-3"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <option value="">Выберите пол...</option>
                <option value="Мужской">Мужской</option>
                <option value="Женский">Женский</option>
              </Form.Select>
              <Form.Select
                className="mt-3"
                value={i_sport_category || ""}
                onChange={(e) => setISportCategory(e.target.value ? parseInt(e.target.value) : null)}
              >
                <option value="">Выберите спортивную категорию...</option>
                {user.categories.map(category => (
                  <option key={category.ID} value={category.ID}>
                    {category.Title}
                  </option>
                ))}
              </Form.Select>
            </>
          )}
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш login..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите ваш пароль..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <button 
              type="submit"
              className="text-[#0D1B2A] border border-gray-300 rounded-md font-medium px-4 py-2 h-9 hover:bg-gray-100 flex items-center justify-center">
              {isLogin ? "Войти" : "Регистрация"}
            </button>
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
