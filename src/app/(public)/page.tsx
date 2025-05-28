import styles from './home.module.scss';
import { Landing } from '@/components/home/landing/landing';
import { Foreground } from '@/components/home/foreground/foreground';
import { Feature } from '@/components/home/feature/feature';
import { Community } from '@/components/home/community/community';

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