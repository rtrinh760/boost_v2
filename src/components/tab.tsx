import Link from "next/link";
import getWebsiteTitle from "~/scripts/getWebsiteTitle";

export type Tab = {
  url: string;
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
  
  return (
    <div
      key={tab.id}
      className="flex flex-col items-center justify-center px-20 text-center"
    >
      <div className="p-2 text-white">
        <Link
          href={`${tab.url}`}
          target="_blank"
          rel="noopener"
          className="flex flex-row space-x-2"
        >
          <img
            height="16"
            width="24"
            src={`http://www.google.com/s2/favicons?domain=${shortUrl}`}
          />
          <span>{shortUrl}</span>
        </Link>
      </div>
    </div>
  );
};

export default Tab;
