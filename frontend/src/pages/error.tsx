import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ListGroup } from "flowbite-react";
import Section from "../components/Section";

function ErrorPage() {
  return (
    <Section subtitle="Oops an error occurred" title="Error">
      <ListGroup className="mx-auto">
        <ListGroup.Item>
          <Link to="/" replace className="inline-flex items-center gap-4">
            <FaArrowLeft />
            <span>Go back home</span>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Section>
  );
}

export default ErrorPage;
