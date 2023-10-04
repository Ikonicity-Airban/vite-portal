import { BreadcrumbComponents } from "../components";
import EventList from "./home/EventList";
import { IEvent } from "../api/@types";
import NewsSection from "./home/NewsSection";
import Section from "../components/Section";
import { Spinner } from "flowbite-react";
import useAxiosPrivate from "../api/hooks/useAxiosPrivate";
import { useQuery } from "react-query";

function NewsPage() {
  const http = useAxiosPrivate();
  const fetchEvent = async (): Promise<{
    count: number;
    events: IEvent[];
  }> => {
    const response = await http.get(`/events`);
    return response.data;
  };

  const { data, isLoading } = useQuery<{
    count: number;
    events: IEvent[];
  }>("events", fetchEvent);

  if (isLoading) return <Spinner />;

  return (
    <section className="my-6 max-w-screen-desktop mx-auto">
      <BreadcrumbComponents />
      <Section
        title="Latest News and events"
        subtitle="Recent happenings in the department"
      >
        <NewsSection
          news={data?.events?.filter((item) => item.type == "news")}
        />
      </Section>
      <EventList
        events={data?.events?.filter((item) => item.type == "event")}
      />
    </section>
  );
}

export default NewsPage;
