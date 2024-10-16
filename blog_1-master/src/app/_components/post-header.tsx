import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";
import './Profile.css';
import './guide.css';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export function PostHeader({ title, coverImage, date, author }: Props) {
  return (
    <><div className="profileContainer">
      <PostTitle>{title}</PostTitle>
      <div>
        <CoverImage title={title} src={coverImage} />
      </div>
      <div>
        <div className="body">
          {/*<Avatar name={author.name} picture={author.picture} />*/}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
      </div>
    </>
  );
}
