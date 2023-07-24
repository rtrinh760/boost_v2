import Link from "next/link";

export type Tab = {
  url: string;
  title: string;
  id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const Tab = (props: Tab) => {
  const tab = props;
  const shortUrl = tab.url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0];

  if (!shortUrl) {
    return null;
  }

  return (
    <div key={tab.id}>
      <div className="p-2 text-white">
        <Link
          href={tab.url}
          target="_blank"
          rel="noopener"
          className="flex flex-row space-x-2"
        >
          <img
            height="16"
            width="24"
            src={`http://www.google.com/s2/favicons?domain=${shortUrl}`}
            alt="favicon"
          />
          <span>{tab.title}</span>
        </Link>
      </div>
    </div>
  );
};

export default Tab;
