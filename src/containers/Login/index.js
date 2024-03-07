import React from "react";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { useUser } from "../../hooks/UserContext";
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
  const { putUserData } = useUser();

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
    const { data } = await toast.promise(
      api.post("sessions", {
        email: clientData.email,
        password: clientData.password,
      }),
      {
        pending: "Verificando seus dados...",
        success: "Seja bem-vindo(a)! 👌",
        error: "Verifique seu e-amil e senha. 🤯",
      }
    );

    putUserData(data);
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

          <Button type="submit" style={{ marginTop: 35, marginBottom: 15 }}>
            Sign In
          </Button>
        </form>
        <SignInLink>
          Não possui conta? <a href="http://">Sign Up</a>
        </SignInLink>
      </ContainerItems>
    </Container>
  );
}

export default Login;
