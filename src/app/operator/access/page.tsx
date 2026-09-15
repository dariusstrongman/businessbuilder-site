import { Container, Eyebrow } from "@/components/primitives/Layout";
import { SupportAccessForm } from "./SupportAccessForm";
import styles from "../../login/page.module.css";

export default function OperatorAccessPage() {
  return <section className={styles.page} aria-labelledby="operator-title"><Container><div className={styles.card}>
    <Eyebrow>Operator access</Eyebrow><h1 id="operator-title" className={styles.title}>Open a scoped review session.</h1><SupportAccessForm />
  </div></Container></section>;
}
