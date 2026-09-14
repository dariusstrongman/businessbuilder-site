import { Container, Section } from "@/components/primitives/Layout";
import { IntakeField } from "@/components/product/IntakeField";
import type { PackageId } from "@/content/packages";
import styles from "./CtaBand.module.css";

type Props = {
  title?: string;
  text?: string;
  label?: string;
  /** Package to pre-select in the intake. */
  packageId?: PackageId;
  /** Pre-filled idea text, e.g. from an archetype page. */
  defaultValue?: string;
  chips?: boolean;
};

/** The closing intake. Every page ends where the product begins. */
export function CtaBand({
  title = "Describe the company you want.",
  text = "One sentence is enough to start. We will come back with research, a recommendation, and a plan you can approve or change before anything is built.",
  label = "Your company, in a sentence",
  packageId,
  defaultValue,
  chips = true,
}: Props) {
  return (
    <Section aria-labelledby="cta-title" className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
          </div>
          <div className={styles.field}>
            <IntakeField size="lg" chips={chips} label={label} packageId={packageId} defaultValue={defaultValue} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
