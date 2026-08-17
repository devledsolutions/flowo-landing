import type { ReactNode } from "react";
import styles from "./growth-tool-landing.module.css";

export function ToolWindow({
  label,
  title,
  badge,
  children,
}: {
  label: string;
  title: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <div className={styles.toolWindow}>
      <div className={styles.windowBar}>
        <div className={styles.windowDots} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <span>ferramenta.flowo.com.br</span>
      </div>
      <div className={styles.toolBody}>
        <div className={styles.toolTitleRow}>
          <div>
            <small>{label}</small>
            <h2>{title}</h2>
          </div>
          <span>{badge}</span>
        </div>
        {children}
      </div>
    </div>
  );
}

export { styles as growthToolStyles };
