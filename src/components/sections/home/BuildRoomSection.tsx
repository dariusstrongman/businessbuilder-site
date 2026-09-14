import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { BuildRoom } from "@/components/product/BuildRoom";
import styles from "./BuildRoomSection.module.css";

const notes = [
  {
    title: "Four states, not two",
    text: "Nothing is simply “done”. Each system moves from Proposed to Executed to Tested to Verified, and you can see which.",
  },
  {
    title: "Founder Actions are kept separate",
    text: "The few things only you can do are prepared, explained and tracked beside the build, never buried in it.",
  },
  {
    title: "Readiness is computed",
    text: "Ready and Fully Set are not labels we apply. They turn on when the evidence says they should.",
  },
];

type Props = {
  index?: string;
  eyebrow?: string;
  title?: string;
  lead?: string;
};

export function BuildRoomSection({
  index = "04",
  eyebrow = "The Build Room",
  title = "Watch your company being assembled.",
  lead = "Every system has a status. Every founder action is explained. Readiness comes from the evidence, not from us saying so.",
}: Props) {
  return (
    <Section aria-labelledby="buildroom-title" className={styles.section}>
      <Container>
        <SectionHeader index={index} eyebrow={eyebrow} id="buildroom-title" title={title} lead={lead} />
        <BuildRoom variant="full" />
        <ol className={styles.notes}>
          {notes.map((n, i) => (
            <li key={n.title} className={styles.note}>
              <span className={styles.noteIndex}>{i + 1}</span>
              <h3 className={styles.noteTitle}>{n.title}</h3>
              <p className={styles.noteText}>{n.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
