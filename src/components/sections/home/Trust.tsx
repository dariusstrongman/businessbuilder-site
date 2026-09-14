import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { honestScope, trustItems } from "@/content/trust";
import { routes } from "@/config/brand";
import styles from "./Trust.module.css";

export function Trust() {
  return (
    <Section aria-labelledby="trust-title" className={styles.section}>
      <Container>
        <SectionHeader
          index="14"
          eyebrow="Trust"
          id="trust-title"
          title="No testimonials. No logos. Just how it works."
          lead="We are new, and we would rather show you the system than borrow credibility. Here is what you can hold us to."
        />
        <ol className={styles.items}>
          {trustItems.map((item, i) => (
            <li key={item.id} className={styles.item}>
              <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ol>
        <div className={styles.scope}>
          <h3 className={styles.scopeTitle}>What we do not claim</h3>
          <ul className={styles.scopeList}>
            {honestScope.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <Button href={routes.trust} variant="ghost" arrow>
            Read the full trust page
          </Button>
        </div>
      </Container>
    </Section>
  );
}
