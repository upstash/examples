import Link from "next/link";

interface HeadingProps {
  title: string;
  description: string;
  source: string;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  source,
}) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
      <Link
        href={source}
        className="text-sm underline text-muted-foreground hover:cursor-pointer hover:text-indigo-400"
      >
        Source code on Github
      </Link>
    </div>
  );
};
