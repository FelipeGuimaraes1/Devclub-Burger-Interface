import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { toast } from "react-toastify";

import RegisterImg from "../../assets/sign-in.svg";
import Button from "../../components/Button";
import api from "../../services/api";

import {
  Container,
  RegisterImage,
  ContainerItems,
  Label,
  Input,
  SignInLink,
  ErrorMessage,
} from "./styles";

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório!"),
    email: Yup.string()
      .email("Digite um e-mail válido!")
      .required("O e-mail é obrigatório!"),
    password: Yup.string()
      .required("A senha é obrigatória!")
      .min(6, "A senha deve conter pelo menos 6 caracteres!"),
    confirmPassword: Yup.string()
      .required("A senha é obrigatória!")
      .oneOf([Yup.ref("password")], "As senhas devem ser iguais!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (clientData) => {
    try {
      const { status } = await api.post(
        "users",
        {
          name: clientData.name,
          email: clientData.email,
          password: clientData.password,
        },
        { validateStatus: () => true }
      );

      if (status === 201 || status === 200) {
        toast.success("Usuário cadastrado com sucesso!");
      } else if (status === 409) {
        toast.error("Usuário já cadastrado. Faça login para continuar!");
      } else {
        throw new Error();
      }
    } catch (err) {
      toast.error("Falha no sistema. Tente novamente");
    }
  };

  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="Register-image" />
      <ContainerItems>
        <h1>Cadastre-se</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Nome:</Label>
          <Input
            type="text"
            {...register("name")}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email:</Label>
          <Input {...register("email")} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha:</Label>
          <Input
            type="password"
            {...register("password")}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label error={errors.confirmPassword?.message}>
            Confirme sua senha:
          </Label>
          <Input
            type="password"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 35, marginBottom: 15 }}>
            Sign Up
          </Button>
        </form>
        <SignInLink>
          Já possui conta?{" "}
          <Link style={{ color: "white" }} to="/login">
            Sign In
          </Link>
        </SignInLink>
      </ContainerItems>
    </Container>
  );
}

export default Register;
