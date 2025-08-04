import styles from "./Illustration1.module.scss";
import Image from "next/image";

type Illustration2Props = {};

const Illustration1 = ({}: Illustration2Props) => (
  <div className={styles.illustration}>
    <div className={styles.inner}>
      <Image
        alt="ethereum illustration"
        src="/cloud.svg"
        fill
        style={{
          objectFit: "fill",
        }}
        className={styles.image}
      />
    </div>
  </div>
);

export default Illustration1;
