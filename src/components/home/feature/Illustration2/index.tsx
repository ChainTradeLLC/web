import styles from "./Illustration2.module.scss";
import Image from "next/image";

type Illustration2Props = {};

const Illustration2 = ({}: Illustration2Props) => (
  <div className={styles.illustration}>
    <div className={styles.inner}>
      <Image
        alt="ethereum illustration"
        src="/ethereum.svg"
        fill
        style={{
          objectFit: "fill",
        }}
        className={styles.image}
      />
    </div>
  </div>
);

export default Illustration2;
