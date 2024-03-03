import styled from "styled-components";
import Background from "../../assets/background.svg";

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background: url("${Background}");
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginImage = styled.img`
  height: 80%;
`;

export const ContainerItems = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #373737;
  border-radius: 0 10px 10px 0;
  height: 80%;
  padding: 25px 75px;

  form {
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #fff;
    text-align: center;
    margin-top: 80px;
  }
`;

export const Label = styled.p`
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  color: #fff;
  margin-top: 28px;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 390px;
  height: 40px;
  background: #fff;
  box-shadow: 3px 3px 10px rgba(74, 144, 226, 0.19);
  border-radius: 5px;
  border: ${(props) => (props.error ? "2px solid #cc1717" : "none")};
  padding-left: 8px;
`;

export const SignInLink = styled.p`
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  color: #fff;

  a {
    color: #fff;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const ErrorMessage = styled.p`
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  color: #cc1717;
  margin-top: 8px;
`;
