export default function About() {
  return (
    <article className="prose lg:prose-lg p-12 dark:prose-invert max-w-full">
      <h1>About</h1>
      {/* Add short intro about this project, info about creators and github link  */}
      <p>
        This project is a timezone converter to convert time between different
        timezones and compare overlapping time periods.
      </p>
      <p>
        The project was created by{' '}
        <a href="https://easonchang.com">Eason Chang</a> and{' '}
        <a href="https://carolhsiao.webflow.io">Carol Hsiao</a>.
      </p>
      <p>
        The project is open source and available on GitHub. You can find the
        source code on{' '}
        <a
          href="https://github.com/Kamigami55/timezone-converter"
          target="_blank"
          className="hover:underline underline-offset-4"
          rel="noreferrer"
        >
          GitHub
        </a>
        .
      </p>
    </article>
  );
}
