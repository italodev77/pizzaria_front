// components/sidebar/sidebar.tsx
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do react-icons
import styles from "./sidebar.module.scss"; // Importe os estilos

interface SidebarProps {
  isOpen: boolean; // Prop para saber se o sidebar está aberto ou fechado
  toggleSidebar: () => void; // Função para alternar o estado do sidebar
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      {/* Botão de Abrir/Fechar Sidebar */}
      <button className={styles.toggleButton} onClick={toggleSidebar}>
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}{" "}
        {/* Exibe o ícone correto */}
      </button>

      {/* Conteúdo do Sidebar */}
      {isOpen && (
        <div className={styles.content}>
          <h2>Pizzaria</h2>
          <nav>
            <a href="#">Dashboard</a>
            <a href="#">Pedidos</a>
            <a href="#">Cardápio</a>
            <a href="#">Clientes</a>
            <a href="/dashboard/sales">Vendas</a>
            <a href="#">Configurações</a>
          </nav>
        </div>
      )}
    </div>
  );
}
