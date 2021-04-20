import React from "react";
import { USER_POST } from "../../api";
import useFetch from "../../Hooks/useFetch";
import useForm from "../../Hooks/useForm";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import { UserContext } from "./../../UserContext";

const LoginCreate = () => {
  const username = useForm();
  const email = useForm("email");
  const password = useForm();

  const { userLogin } = React.useContext(UserContext);
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();

    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response} = await request(url, options);

    if (response.ok) {
      userLogin(username.value, password.value);
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Crie sua conta"></Head>
      <h1 className="title">cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Usuario"
          type="text"
          name="username"
          {...username}
        ></Input>
        <Input label="Email" type="email" name="email" {...email}></Input>
        <Input
          label="Senha"
          type="password"
          name="password"
          {...password}
        ></Input>
        {loading ? <Button disabled>Cadastrando...</Button> : <Button>Cadastrar</Button>}
        <Error error={error}></Error>
      </form>
    </section>
  );
};

export default LoginCreate;
