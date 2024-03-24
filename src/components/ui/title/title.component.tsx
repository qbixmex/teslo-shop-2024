import { titleFont } from "@/config/fonts";
import styles from "./title.module.css";

const titleClasses = [titleFont.className, styles.title].join(' ');
const subTitleClasses = [titleFont.className, styles.subtitle].join(' ');

type Props = {
  title: string;
  subtitle?: string;
  className?: string;
};

const Title: React.FC<Readonly<Props>> = ({ title, subtitle, className }) => {

  return (
    <hgroup>
      <h1 className={titleClasses}>{ title }</h1>
      {
        subtitle && (
          <h2 className={subTitleClasses}>{ subtitle }</h2>
        )
      }
    </hgroup>
  );

};

export default Title;
