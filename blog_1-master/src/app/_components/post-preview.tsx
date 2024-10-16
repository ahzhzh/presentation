import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import './Profile.css';
import './guide.css';

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div>
      <div className="profileContainer">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="profileContainer">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="body">
        <DateFormatter dateString={date} />
      </div>
      <p className="body">{excerpt}</p>
      {/*-<Avatar name={author.name} picture={author.picture} />*/}
    </div>
  );
}

