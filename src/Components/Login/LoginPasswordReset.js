import React from "react";
import Input from "./../Forms/Input";
import Button from "./../Forms/Button";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../api";
import Error from "./../Helper/Error";
import { useNavigate } from "react-router";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
  const [login, setlogin] = React.useState("");
  const [key, setKey] = React.useState("");
  const password = useForm("");
  const { error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const key = params.get("key");
    const login = params.get("login");

    if (key) setKey(key);
    if (login) setlogin(login);
  }, [key, login]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        password: password.value,
      });

      const { response } = await request(url, options);

      if (response.ok) navigate("/login");
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Nova Senha"></Head>
      <h1 className="title">Resete sua senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Nova Senha"
          type="password"
          name="password"
          {...password}
        ></Input>
        {password.value}
        {loading ? (
          <Button disabled>Resetaando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>

      <Error error={error}></Error>
    </section>
  );
};

export default LoginPasswordReset;
