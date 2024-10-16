import Avatar from "@/app/_components/avatar";
import CoverImage from "@/app/_components/cover-image";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
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

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section>
      <h1><CoverImage title={title} src={coverImage} slug={slug} /></h1>   
      <div className="profileContainer">
        <div>
          <h3>
            <Link href={`/posts/${slug}`} className="hover:underline">
              {title}
            </Link>
          </h3>
          <div>
            <DateFormatter dateString={date} />
          </div>
        </div>
        <div>
          <p>{excerpt}</p>
        
        </div>
      </div>
    </section>
  );
}
