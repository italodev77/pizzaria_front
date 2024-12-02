import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.scss";
import logoImg from "../../../public/logo.svg";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

export default function Signup() {
  async function handleRegister(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    console.log(formData);

    console.log(email);
    console.log(password);
    console.log(confirmPassword);

    try {
      await api.post("/accounts/register", {
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });
    } catch (err) {
      console.log("erro:");
      console.log(err);
    }

    redirect("/");
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.image} src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <h1>Criar sua conta</h1>
          <form action={handleRegister}>
            <input
              type="email"
              required
              name="email"
              placeholder="Informe o seu email...."
              className={styles.input}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="senha"
              className={styles.input}
            />
            <input
              type="password"
              required
              name="confirmPassword"
              placeholder="confirmar senha"
              className={styles.input}
            />

            <button type="submit" className={styles.loginButton}>
              Cadastrar
            </button>
          </form>

          <Link href={"/"} className={styles.text}>
            Já possui uma conta? Faça o seu login
          </Link>
        </section>
      </div>
    </>
  );
}
