import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { PermissionsCard } from "@/components/product/PermissionsCard";
import { workers } from "@/content/workers";
import { routes } from "@/config/brand";
import styles from "./BuildAndRun.module.css";

export function BuildAndRun() {
  const featured = workers.find((w) => w.id === "quote") ?? workers[0];
  return (
    <Section tone="paper-2" aria-labelledby="run-title" className={styles.section}>
      <Container>
        <SectionHeader
          index="10"
          eyebrow="Build & Run"
          id="run-title"
          title="AI workers, inside limits you set."
          lead="Build & Run adds a small operating team to your company after handoff. They handle the recurring work, inside permissions, budgets and approval rules you set. They are not magic, and we do not describe them that way."
        />
        <div className={styles.grid}>
          <div className={styles.roster}>
            <h3 className={styles.rosterTitle}>The roster</h3>
            <ul className={styles.rosterList}>
              {workers.map((w, i) => (
                <li key={w.id} className={styles.worker}>
                  <span className={styles.workerIndex}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={styles.workerName}>{w.name}</span>
                  <span className={styles.workerJob}>{w.job}</span>
                </li>
              ))}
              <li className={`${styles.worker} ${styles.workerFuture}`}>
                <span className={styles.workerIndex}>—</span>
                <span className={styles.workerName}>Further operational roles</span>
                <span className={styles.workerJob}>Added as they are proven in real companies, not announced ahead.</span>
              </li>
            </ul>
            <div className={styles.rosterAction}>
              <Button href={routes.buildAndRun} variant="ghost" arrow>
                How Build & Run works
              </Button>
            </div>
          </div>
          <PermissionsCard worker={featured} className={styles.card} />
        </div>
      </Container>
    </Section>
  );
}
