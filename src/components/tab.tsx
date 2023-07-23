import Link from "next/link";

export type Tab = {
  url: string;
  id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const Tab = (props: Tab) => {
  const tab = props;
  let newUrl = tab.url;
  const shortUrl = tab.url
    .replace(/^(?:https?:\/\/)?(?:www\.)?/i, "")
    .split("/")[0];

  if(!shortUrl) {
    return null;
  }

  if (!tab.url.includes("https://")) {
    newUrl = `https://${tab.url}`;
  }
  
  return (
    <div
      key={tab.id}
    >
      <div className="p-2 text-white">
        <Link
          href={newUrl}
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
          <span>{newUrl}</span>
        </Link>
      </div>
    </div>
  );
};

export default Tab;
