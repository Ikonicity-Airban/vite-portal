import { Card } from "flowbite-react";
import { IEvent } from "../../api/@types";

interface Props {
  news?: IEvent[];
}
const NewsSection = ({ news }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {news &&
        news.map((item) => (
          <Card key={item._id}>
            <div className="flex flex-col ">
              <h3 className="text-lg font-bold mb-2 logo-clipped">
                {item.title}
              </h3>
              <p className="text-xs text-gray-400">
                {new Date(item.date || "").toDateString()}
              </p>
              <p className="flex-1">{item.content}</p>
            </div>
          </Card>
        ))}
    </div>
  );
};

export default NewsSection;
