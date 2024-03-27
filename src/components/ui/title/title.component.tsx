import styles from "./title.module.css";

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

const Title: React.FC<Readonly<Props>> = ({ title, subtitle, className }) => {

  return (
    <hgroup>
      <h1 className={styles.title}>{ title }</h1>
      {
        subtitle && (
          <h2 className={styles.subtitle}>{ subtitle }</h2>
        )
      }
    </hgroup>
  );

};

export default Title;
