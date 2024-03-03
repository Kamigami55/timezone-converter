export function Footer() {
  return (
    <footer className="flex w-full items-center justify-center py-4 px-6">
      <p className="text-sm text-gray-500 text-center">
        Made with ❤️ by{' '}
        <a
          href="https://easonchang.com"
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-4"
        >
          Eason Chang
        </a>
        {' & '}
        <a
          href="https://carolhsiao.webflow.io"
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-4"
        >
          Carol Hsiao
        </a>
      </p>
    </footer>
  );
}
