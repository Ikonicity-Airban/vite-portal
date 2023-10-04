interface IHeadingProps {
  section_title?: string;
  heading?: string;
}

function Heading({ heading, section_title }: IHeadingProps) {
  return (
    <div className="text-center font-bold my-6 space-y-2" aria-label="Explore">
      <h3 className="font-robo uppercase text-[var(--primary)]">
        {section_title}
      </h3>
      {heading && (
        <h1 className="font-robo break-words mb-4 sm:text-4xl font-extrabold leading-none tracking-tight text-2xl text-gray-900 md:text-4xl  dark:text-white">
          {heading}
        </h1>
      )}
    </div>
  );
}

export default Heading;
