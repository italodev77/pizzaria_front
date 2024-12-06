"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/app/dashboard/components/button";
import { handleRegisterOrder, handleAddItem } from "./serverActions";
import { api } from "@/services/api"; // Importe a API para realizar a requisição
import { toast } from "sonner";

export default function Orders() {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [categoryId, setCategoryId] = useState<string | null>(null); // Armazena a categoria selecionada
  const [categories, setCategories] = useState<any[]>([]); // Armazena as categorias
  const [products, setProducts] = useState<any[]>([]); // Adiciona o estado para os produtos
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null); // Armazena o produto selecionado
  const [query, setQuery] = useState(""); // Para armazenar o texto digitado na pesquisa

  // Função para buscar as categorias
  const fetchCategories = async () => {
    try {
      const response = await api.get("/Categories/all"); // Alterado o endpoint para "/Categories/all"
      setCategories(response.data); // Atualiza as categorias com os dados recebidos
    } catch (err) {
      toast.error("Falha ao buscar as categorias.");
    }
  };

  // Função para buscar os produtos com base na categoria
  const fetchProducts = async (categoryId: string) => {
    try {
      const response = await api.get(`/products?categoryId=${categoryId}`);
      setProducts(response.data); // Atualiza os produtos com os dados recebidos
    } catch (err) {
      toast.error("Falha ao buscar os produtos.");
    }
  };

  // Função para lidar com a mudança de categoria
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedCategoryId = event.target.value;
    setCategoryId(selectedCategoryId);
    setQuery(""); // Limpa a pesquisa quando a categoria muda
    setProducts([]); // Limpa os produtos
    if (selectedCategoryId) {
      fetchProducts(selectedCategoryId); // Busca os produtos da categoria selecionada
    }
  };

  // Função para lidar com a seleção do produto
  const handleProductSelect = (product: any) => {
    setSelectedProduct(product); // Armazena o produto selecionado
  };

  useEffect(() => {
    fetchCategories(); // Busca as categorias ao carregar o componente
  }, []);

  return (
    <main className={styles.container}>
      <h1>Novo Pedido:</h1>

      {/* Formulário para criar a ordem */}
      <form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const id = await handleRegisterOrder(formData);

          if (id) {
            setOrderId(id);
          } else {
            alert("Erro ao criar pedido. Verifique os dados.");
          }
        }}
      >
        <input
          type="text"
          name="table"
          required
          placeholder="Número da mesa"
          className={styles.input}
        />
        <input
          type="text"
          name="name"
          required
          placeholder="Nome do cliente"
          className={styles.input}
        />
        <Button name="Iniciar Pedido" />
      </form>

      {/* Formulário para adicionar itens */}
      {orderId ? (
        <>
          <h2>Adicionar Itens:</h2>
          <form
            className={styles.form}
            onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);

              if (selectedProduct) {
                // Adiciona o preço junto com os outros dados
                formData.append("price", selectedProduct.price);
              }

              try {
                const message = await handleAddItem(formData, orderId);
                alert(message);
              } catch (error) {
                alert("Erro ao adicionar item. Tente novamente.");
              }
            }}
          >
            {/* Select para categorias */}
            <select
              name="categories"
              required
              className={styles.input}
              onChange={handleCategoryChange} // Lida com a mudança da categoria
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.description}
                </option>
              ))}
            </select>

            {/* Select para produtos com base na categoria selecionada */}
            <select
              name="productId"
              required
              className={styles.input}
              onChange={(e) => {
                const productId = e.target.value;
                const product = products.find((prod) => prod.id === productId);
                handleProductSelect(product);
              }}
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.description} - R${product.price.toFixed(2)}
                </option>
              ))}
            </select>

            {/* Input para quantidade */}
            <input
              type="number"
              name="amount"
              required
              placeholder="Quantidade"
              className={styles.input}
              min="1"
            />

            <Button name="Adicionar Item" />
          </form>
        </>
      ) : (
        <p>Crie um pedido para adicionar itens.</p>
      )}
    </main>
  );
}
