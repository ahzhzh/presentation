import markdownStyles from "./markdown-styles.module.css";
import './Profile.css';
import './guide.css';

type Props = {
  content: string;
};

export function PostBody({ content }: Props) {
  return (
    <div className="profileContainer">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
