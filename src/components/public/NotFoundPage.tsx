import PublicPage from "./PublicPage";

export default function NotFoundPage() {
  return <PublicPage title="Page not found" description="This page may have moved, or the address may be incorrect.">
    <p><a href="/">Return to Email Time</a> or <a href="/articles">browse our articles</a>.</p>
  </PublicPage>;
}
