import styles from './home.module.scss';
import { Landing } from '@/src/components/home/landing/landing';
import { Foreground } from '@/src/components/home/foreground/foreground';
import { Feature } from '@/src/components/home/feature/feature';
import { Community } from '@/src/components/home/community/community';

export default function Home() {
  return (
    <div className={`${styles.home}`}>
     <Landing />
     <Foreground />
     <Feature />
     <Community />
    </div>
  );
}