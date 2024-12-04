import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { api } from "@/services/api";
export default function Category() {
  async function handleRegisterCategory(formData: FormData) {
    "use server";
    const name = formData.get("name");

    if (name === "") return;

    const data = {
      description: name,
    };

    const response = await api.post("/Categories/create", data).catch((err) => {
      console.log(err);
    });

    console.log(response);
  }
  return (
    <main className={styles.container}>
      <h1>Nova Categoria:</h1>
      <form className={styles.form} action={handleRegisterCategory}>
        <input
          type="text"
          name="name"
          required
          placeholder="ex: Pizza"
          className={styles.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
