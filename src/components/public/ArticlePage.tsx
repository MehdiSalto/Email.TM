import { articles, findArticle, readingMinutes, type ArticleLanguage } from "../../content/articles";
import { articlePath } from "../../routing";
import PublicPage from "./PublicPage";
import ArticleCards from "./ArticleCards";
import NotFoundPage from "./NotFoundPage";

export default function ArticlePage({ slug, language = "en" }: { slug: string; language?: ArticleLanguage }) {
  const article = findArticle(slug);
  if (!article) return <NotFoundPage />;
  const copy = article[language];
  const arabic = language === "ar";
  return <PublicPage language={language} title={copy.title} description={copy.excerpt}>
    <article>
      <div className="article-meta">
        <a href={articlePath(undefined, language)}>{arabic ? "المقالات" : "Articles"}</a>
        <span>{arabic ? "بقلم إيميل تايم" : "By Email Time"}</span>
        <time dateTime={article.published}>{new Intl.DateTimeFormat(language, { dateStyle: "long", timeZone: "UTC" }).format(new Date(article.published + "T12:00:00Z"))}</time>
        <span>{arabic ? `قراءة ${readingMinutes(copy, language)} دقائق` : `${readingMinutes(copy, language)} min read`}</span>
        <a href={articlePath(slug, arabic ? "en" : "ar")} hrefLang={arabic ? "en" : "ar"} lang={arabic ? "en" : "ar"}>{arabic ? "English" : "العربية"}</a>
      </div>
      <p className="article-lead">{copy.introduction}</p>
      <nav className="article-toc" aria-label={arabic ? "محتويات المقال" : "In this article"}>
        <h2>{arabic ? "في هذا المقال" : "In this article"}</h2>
        <ol>{copy.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
      </nav>
      <div className="article-body">
        {copy.sections.map((section) => <section id={section.id} key={section.id}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
          {section.steps && <ol>{section.steps.map((item) => <li key={item}>{item}</li>)}</ol>}
        </section>)}
      </div>
      <div className="article-endnote"><p>{arabic ? "هل وجدت خطأ أو لديك اقتراح لتحسين هذا المقال؟" : "Found an error or have a suggestion for this article?"} <a href="/contact">{arabic ? "تواصل معنا" : "Contact us"}</a>.</p></div>
    </article>
    <aside className="related-articles" aria-label={arabic ? "مقالات أخرى" : "Related articles"}>
      <h2>{arabic ? "تابع القراءة" : "Keep reading"}</h2>
      <ArticleCards language={language} slugs={articles.filter((item) => item.slug !== slug).slice(0, 2).map((item) => item.slug)} headingLevel={3} />
    </aside>
  </PublicPage>;
}
