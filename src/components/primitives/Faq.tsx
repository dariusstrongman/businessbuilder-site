import { PlusIcon } from "./Icons";
import styles from "./Faq.module.css";

type Item = { q: string; a: string };

/** Native disclosure list. No JavaScript, fully keyboard-accessible. */
export function Faq({ items, label = "Questions" }: { items: Item[]; label?: string }) {
  return (
    <div className={styles.faq} aria-label={label}>
      {items.map((item) => (
        <details key={item.q} className={styles.item}>
          <summary className={styles.summary}>
            <span>{item.q}</span>
            <PlusIcon className={styles.icon} />
          </summary>
          <p className={styles.answer}>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
