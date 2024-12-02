"use client";
import { useState } from "react"; // Para controlar o estado do sidebar
import { Header } from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar"; // Importar o sidebar
import styles from "./styles.module.scss";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // Alterna o estado de abertura do sidebar
  };

  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main
          className={`${styles.mainContent} ${
            isSidebarOpen ? styles.open : ""
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
