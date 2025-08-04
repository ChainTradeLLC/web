import { Parallax } from "react-scroll-parallax";
import Image from "next/image";
import styles from "./Item.module.scss";

type ItemProps = {
  className?: string;
  classOvarlay?: string;
  title: string;
  content: string;
  icon: string;
  gradient: string;
  children: React.ReactNode;
};

const Item = ({
  className,
  classOvarlay,
  title,
  content,
  icon,
  gradient,
  children,
}: ItemProps) => (
  <div className={styles.item}>
    <div className={styles.row}>
      <div className={styles.details}>
        <div className={styles.iconPreview}>
          <Image
            className={styles.image}
            src={icon}
            width={24}
            height={24}
            alt=""
          />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.content}>{content}</div>
      </div>
      <div className={styles.preview}>
        <div className={styles.in}>
          <Parallax className={styles.gradient} speed={-6}>
            <Image className={styles.image} src={gradient} fill alt="" />
          </Parallax>
          <div className={styles.overlay}></div>
        </div>
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  </div>
);

export default Item;
