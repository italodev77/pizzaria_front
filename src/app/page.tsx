"use client";

import styles from "./page.module.scss";
import logoImg from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/services/api";
import { useRouter } from "next/navigation"; // Use router para redirecionamento

export default function Page() {
  const router = useRouter(); // Para redirecionamento no client-side

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Enviar dados de login para o backend
      const response = await api.post("/accounts/login", {
        email: email,
        password: password,
      });

      // Aqui, o token é armazenado no cookie via backend com a flag HttpOnly
      // Não é necessário fazer nada no front-end para isso, pois o backend já vai configurá-lo.

      // Redirecionar para o dashboard após o login bem-sucedido
      router.push("/dashboard");
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      alert("Usuário ou senha incorretos.");
    }
  }

  return (
    <div className={styles.containerCenter}>
      <Image className={styles.image} src={logoImg} alt="Logo" />
      <section className={styles.login}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            required
            name="email"
            placeholder="Informe o seu email..."
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
        <Link href="/signup" className={styles.text}>
          Não possui uma conta? Cadastre-se
        </Link>
      </section>
    </div>
  );
}
