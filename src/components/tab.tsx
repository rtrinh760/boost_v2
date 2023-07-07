export type Tab = {
  url: string;
  id: string;
  user_id: string;
  createdAt: Date;
  updatedAt: Date;
};

const Tab = (props: Tab) => {
  const tab = props;
  return (
    <div
      key={tab.id}
      className="flex flex-col items-center justify-center px-20 text-center"
    >
      <div className="p-2 text-white">{tab.url}</div>
    </div>
  );
};

export default Tab;
