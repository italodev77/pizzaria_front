"use server";

import { api } from "@/services/api";

export async function handleRegisterOrder(
  formData: FormData
): Promise<string | null> {
  const name = formData.get("name") as string | null;
  const table = formData.get("table") as string | null;

  if (!name || !table) {
    console.error("Nome ou número da mesa ausentes");
    return null;
  }

  const orderData = { name, table };

  try {
    const response = await api.post("/orders", orderData);

    // Depuração para verificar o conteúdo da resposta
    console.log("Resposta da API ao criar pedido:", response.data);

    // Certifique-se que o campo `id` está sendo retornado pela API
    if (!response.data || !response.data.id) {
      console.error("ID do pedido não encontrado na resposta da API");
      return null;
    }

    return response.data.id;
  } catch (err) {
    console.error("Erro ao criar pedido:", err);
    return null;
  }
}
export async function handleAddItem(
  formData: FormData,
  orderId: string
): Promise<string> {
  const productId = formData.get("productId") as string | null;
  const amount = formData.get("amount") as string | null;

  if (!orderId || !productId || !amount) {
    console.error("Dados insuficientes para adicionar item");
    throw new Error("Dados insuficientes para adicionar item ao pedido");
  }

  const itemData = { orderId, productId, amount };

  try {
    await api.post("/OrderItems/AddItem", itemData);
    console.log("Item adicionado ao pedido");
    return "Item adicionado ao pedido com sucesso!";
  } catch (err) {
    console.error("Erro ao adicionar item:", err);
    throw new Error("Erro ao adicionar item");
  }
}
