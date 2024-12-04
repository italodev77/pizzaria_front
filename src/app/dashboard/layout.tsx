"use client";
import { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
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
