import { Container, Section, SectionHeader } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { deliverables } from "@/content/deliverables";
import { routes } from "@/config/brand";
import styles from "./WhatWeBuild.module.css";

export function WhatWeBuild({ index = "05" }: { index?: string }) {
  const total = deliverables.reduce((n, g) => n + g.items.length, 0);
  return (
    <Section aria-labelledby="bom-title" className={styles.section}>
      <Container>
        <SectionHeader
          index={index}
          eyebrow="What we build"
          id="bom-title"
          title="The bill of materials."
          lead={`Everything in a Build my business handoff, grouped the way the Build Room groups it. ${total} line items, each one verified or recorded before you take the keys.`}
        />
        <dl className={styles.manifest}>
          {deliverables.map((group) => (
            <div key={group.id} className={styles.row}>
              <dt className={styles.group}>
                <span className={styles.groupLabel}>{group.label}</span>
                <span className={styles.count}>
                  {String(group.items.length).padStart(2, "0")} items
                </span>
                {group.note ? <span className={styles.note}>{group.note}</span> : null}
              </dt>
              <dd className={styles.items}>
                <ul className={styles.itemList}>
                  {group.items.map((item) => (
                    <li key={item} className={styles.item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <div className={styles.footer}>
          <p className={styles.footerText}>Want the website first? The Website package is the first two groups, verified live.</p>
          <Button href={routes.pricing} variant="ghost" arrow>
            Compare the three packages
          </Button>
        </div>
      </Container>
    </Section>
  );
}
