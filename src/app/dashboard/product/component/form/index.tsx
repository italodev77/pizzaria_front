"use client";
import { Button } from "@/app/dashboard/components/button";
import style from "./style.module.scss";

interface ICategoryProps {
  id: string;
  description: string;
}

interface Props {
  categories: ICategoryProps[];
}
export function Form({ categories }: Props) {
  return (
    <main className={style.container}>
      <h1>Novo Produto:</h1>

      <form className={style.form}>
        <select name="categories">
          {categories.map((category, index) => (
            <option key={category.id} value={index}>
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
