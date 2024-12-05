"use client";
import { Button } from "@/app/dashboard/components/button";
import style from "./style.module.scss";
import { api } from "@/services/api";
import { toast } from "sonner";
import { error } from "console";
interface ICategoryProps {
  id: string;
  description: string;
}

interface Props {
  categories: ICategoryProps[];
}
export function Form({ categories }: Props) {
  async function handleRegisterProduct(formData: FormData) {
    const categories = formData.get("categories");
    const description = formData.get("description");
    const price = formData.get("price");
    const amount = formData.get("amount");

    if (!description || !categories || !price || !amount) {
      toast.warning("Preencha todos os campos!");
      return;
    }

    const data = {
      description: description,
      price: price,
      amount: amount,
      categoryId: categories,
    };

    await api.post("/products", data).catch(() => {
      toast.warning("Falha ao cadastrar esse produto");
      return;
    });

    toast.success("Produto cadastrado com sucesso");
  }
  return (
    <main className={style.container}>
      <h1>Novo Produto:</h1>

      <form className={style.form} action={handleRegisterProduct}>
        <select name="categories">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.description}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="description"
          placeholder="Informe o nome do produto"
          required
          className={style.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Informe o preço do produto"
          required
          className={style.input}
        />
        <input
          type="text"
          name="amount"
          placeholder="Informe o estoque do produto"
          required
          className={style.input}
        />

        <Button name="Cadastrar" />
      </form>
    </main>
  );
}
