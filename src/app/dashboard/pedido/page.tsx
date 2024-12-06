"use client";
import styles from "./style.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
import { toast } from "sonner";
export default function Pedido() {
  async function handleRegisterOrder(formData: FormData) {
    const table = formData.get("table");
    const name = formData.get("name");

    if (table === "" || name === "") return;

    const data = {
      table: table,
      name: name,
    };

    await api.post("/orders", data).catch((err) => {
      toast.warning("Falha ao abrir comanda!");
      return;
    });
    toast.success("Comanda aberta com sucesso!");
  }
  return (
    <main className={styles.container}>
      <h1>Nova comanda:</h1>
      <form className={styles.form} action={handleRegisterOrder}>
        <input
          type="text"
          name="table"
          required
          placeholder="ex: Número da mesa"
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          required
          placeholder="ex: Nome do cliente"
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
