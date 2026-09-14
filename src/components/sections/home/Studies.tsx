import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { StudyGrid } from "@/components/diagrams/StudyGrid";
import { studiesCopy } from "@/content/studies";
import { routes } from "@/config/brand";
import styles from "./Studies.module.css";

export function Studies({ index = "06" }: { index?: string }) {
  return (
    <Section aria-labelledby="studies-title" className={styles.section}>
      <Container>
        <div className={styles.head}>
          <SectionHeader
            index={index}
            eyebrow={studiesCopy.eyebrow}
            id="studies-title"
            title={studiesCopy.title}
            lead={studiesCopy.lead}
          />
          <div className={styles.headAction}>
            <Button href={routes.work} variant="secondary" arrow>
              See the studies
            </Button>
          </div>
        </div>
        <StudyGrid variant="strip" limit={3} />
      </Container>
    </Section>
  );
}
