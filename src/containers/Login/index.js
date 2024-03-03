import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import LoginImg from "../../assets/login-image.svg";
import Logo from "../../assets/logo1.svg";
import Button from "../../components/Button";
import api from "../../services/api";

import {
  Container,
  LoginImage,
  ContainerItems,
  Label,
  Input,
  SignInLink,
  ErrorMessage,
} from "./styles";

function Login() {
  const schema = Yup.object().shape({
    email: Yup.string()
      .email("Por favor, digite um e-mail válido!")
      .required("O e-mail é obrigatório!"),
    password: Yup.string()
      .required("A senha é obrigatória!")
      .min(6, "A senha deve conter pelo menos 6 caracteres!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientData) => {
    const response = await api.post("sessions", {
      email: clientData.email,
      password: clientData.password,
    });

    console.log(response);
  };

  return (
    <Container>
      <LoginImage src={LoginImg} alt="Imagem de login" />
      <ContainerItems>
        <img src={Logo} alt="Logo" />
        <h1>Login</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label>Email:</Label>
          <Input {...register("email")} error={errors.email?.message} />
          <ErrorMessage>{}</ErrorMessage>

          <Label>Senha:</Label>
          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <ErrorMessage>{}</ErrorMessage>

          <Button type="submit">Sign In</Button>
        </form>
        <SignInLink>
          Não possui conta? <a href="http://">Sign Up</a>
        </SignInLink>
      </ContainerItems>
    </Container>
  );
}

export default Login;
