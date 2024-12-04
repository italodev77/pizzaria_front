import { api } from "@/services/api";
import { Form } from "./component/form";

export default async function Product() {
  const response = await api.get("/Categories/all");

  return <Form categories={response.data} />;
}
