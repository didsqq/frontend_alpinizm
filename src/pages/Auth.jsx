import { observer } from "mobx-react-lite";
import React, { useContext, useState, useEffect } from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import { useLocation, useNavigate } from "react-router-dom";
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
  const [registrationStatus, setRegistrationStatus] = useState({ message: '', type: '' });
  const [errors, setErrors] = useState({
    surname: '',
    name: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    fetchCategories().then(data => user.setCategories(data))
  }, [])

  useEffect(() => {
    setRegistrationStatus({ message: '', type: '' });
  }, [isLogin]);

  const validateName = (value) => {
    // Проверка на только буквы (русские и английские) без пробелов и цифр
    return /^[a-zA-Zа-яА-ЯёЁ]+$/.test(value);
  };

  const handleNameChange = (value, field) => {
    if (validateName(value) || value === "") {
      if (field === 'name') setName(value);
      if (field === 'surname') setSurname(value);
      setErrors({...errors, [field]: ''});
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!isLogin) {
      if (!surname) {
        newErrors.surname = 'Фамилия обязательна';
        isValid = false;
      } else if (!validateName(surname)) {
        newErrors.surname = 'Фамилия должна содержать только буквы';
        isValid = false;
      }

      if (!name) {
        newErrors.name = 'Имя обязательно';
        isValid = false;
      } else if (!validateName(name)) {
        newErrors.name = 'Имя должно содержать только буквы';
        isValid = false;
      }
    }

    if (!username) {
      newErrors.username = 'Логин обязателен';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const click = async () => {
    if (!validateForm()) return;

    try {
      let data;
      if (isLogin) {
        data = await login(username, password);
        user.setUser(data);
        user.setIsAuth(true);
        navigate(HOME_ROUTE);
      } else {
        data = await registration(username, password, surname, name, address, phone, sex, i_sport_category);
        setRegistrationStatus({
          message: 'Регистрация успешна! Теперь вы можете войти в систему.',
          type: 'success'
        });
        setTimeout(() => {
          navigate(LOGIN_ROUTE);
          setUsername("");
          setPassword("");
          setSurname("");
          setName("");
          setAddress("");
          setPhone("");
          setSex("");
          setISportCategory(null);
          setRegistrationStatus({ message: '', type: '' });
        }, 2000);
      }
    } catch (e) {
      const errorMessage = e.response?.data?.message || 'Произошла ошибка';
      setRegistrationStatus({
        message: isLogin ? `Ошибка входа: ${errorMessage}` : `Ошибка регистрации: ${errorMessage}`,
        type: 'error'
      });
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
              <Form.Group className="mt-3">
                <Form.Control
                  placeholder="Введите вашу фамилию..."
                  value={surname}
                  onChange={(e) => handleNameChange(e.target.value, 'surname')}
                  onBlur={() => {
                    if (!surname) {
                      setErrors({...errors, surname: 'Фамилия обязательна'});
                    } else if (!validateName(surname)) {
                      setErrors({...errors, surname: 'Фамилия должна содержать только буквы'});
                    }
                  }}
                  maxLength={50}
                  isInvalid={!!errors.surname}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.surname}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Control
                  placeholder="Введите ваше имя..."
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value, 'name')}
                  onBlur={() => {
                    if (!name) {
                      setErrors({...errors, name: 'Имя обязательно'});
                    } else if (!validateName(name)) {
                      setErrors({...errors, name: 'Имя должно содержать только буквы'});
                    }
                  }}
                  maxLength={50}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Control
                className="mt-3"
                placeholder="Введите ваш адрес..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                maxLength={50}
              />
              <Form.Control
                className="mt-3"
                placeholder="Введите ваш телефон..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={50}
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
          
          <Form.Group className="mt-3">
            <Form.Control
              placeholder="Введите ваш login..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => {
                if (!username) {
                  setErrors({...errors, username: 'Логин обязателен'});
                }
              }}
              maxLength={50}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Control
              placeholder="Введите ваш пароль..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={() => {
                if (!password) {
                  setErrors({...errors, password: 'Пароль обязателен'});
                }
              }}
              type="password"
              maxLength={50}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="mt-8">
          {registrationStatus.message && (
            <div className={`mb-4 p-4 rounded-lg ${
              registrationStatus.type === 'success' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {registrationStatus.message}
            </div>
          )}
          </div>
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