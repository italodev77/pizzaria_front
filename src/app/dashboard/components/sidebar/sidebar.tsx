// components/sidebar/sidebar.tsx
import { FiMenu, FiX } from "react-icons/fi";
import styles from "./sidebar.module.scss";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}{" "}
      </button>

      {isOpen && (
        <div className={styles.content}>
          <h2>Bem-vindo</h2>
          <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/dashboard/pedidos">Pedidos</a>
            <a href="/dashboard/product">Produtos</a>
            <a href="#">Clientes</a>
            <a href="/dashboard/category">Categorias</a>
            <a href="#">Estoque</a>
            <a href="#">Configurações</a>
          </nav>
        </div>
      )}
    </div>
  );
}
