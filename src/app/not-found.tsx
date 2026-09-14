import { Container, Eyebrow, Heading } from "@/components/primitives/Layout";
import { Button } from "@/components/primitives/Button";
import { routes } from "@/config/brand";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.page} aria-labelledby="nf-title">
      <Container>
        <div className={styles.inner}>
          <Eyebrow>Not found</Eyebrow>
          <Heading level={1} size="h2" id="nf-title">
            That page is not part of the build.
          </Heading>
          <p className={styles.text}>
            The link may be old, or the page may have moved. Everything on the site is reachable from the navigation.
          </p>
          <Button href={routes.home} arrow>
            Back to the start
          </Button>
        </div>
      </Container>
    </section>
  );
}
