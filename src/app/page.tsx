import styles from "./page.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function Page() {
  async function handleLogin(formData: FormData) {
    "use server";
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await api.post("/accounts/login", {
        email: email,
        password: password,
      });

      const expressTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStore = await cookies();
      cookieStore.set("session", response.data.token, {
        maxAge: expressTime,
        path: "/",
        httpOnly: false,
      });
    } catch (err) {
      console.log(err);
    }

    redirect("/dashboard");
  }
  return (
    <>
      <div className={styles.containerCenter}>
        <Image className={styles.image} src={logoImg} alt="Logo" />

        <section className={styles.login}>
          <form action={handleLogin}>
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
              placeholder="*******"
              className={styles.input}
            />

            <button type="submit" className={styles.loginButton}>
              Acessar
            </button>
          </form>

          <Link href={"/signup"} className={styles.text}>
            Não possui uma conta? Cadastra-se
          </Link>
        </section>
      </div>
    </>
  );
}
