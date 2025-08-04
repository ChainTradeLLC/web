import styles from "./Bento.module.scss";
import Image from "next/image";

type BentoProps = {
  title: string;
  content: string;
  number: number;
  image?: string;
};

const Bento = ({ title, content, number, image }: BentoProps) => (
  <div className={styles.bento}>
    <div className={styles.inner}>
      <div className={styles.number}>
        <span>{number}</span>
      </div>
      <div className={styles.preview}>
        <Image
          alt="illustration"
          src={image}
          fill
          style={{
            objectFit: "fill",
          }}
        />
      </div>
      <div className={styles.details}>
        <h4 className={styles.subtitle}>{title}</h4>
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  </div>
);

export default Bento;
