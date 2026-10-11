import { articles, readingMinutes, type ArticleLanguage } from "../../content/articles";
import { articlePath } from "../../routing";

export default function ArticleCards({ language = "en", slugs, headingLevel = 2 }: { language?: ArticleLanguage; slugs?: string[]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? "h3" : "h2";
  return <div className="article-grid" lang={language} dir={language === "ar" ? "rtl" : "ltr"}>
    {articles.filter((article) => !slugs || slugs.includes(article.slug)).map((article) => {
      const copy = article[language];
      return <article className="article-card" key={article.slug}>
        <div className="article-card-top"><span className="article-category">{copy.category}</span><span className="article-number" aria-hidden="true">{article.number}</span></div>
        <Heading><a href={articlePath(article.slug, language)}>{copy.title}</a></Heading>
        <p>{copy.excerpt}</p>
        <div className="article-card-bottom">
          <span>{language === "ar" ? `قراءة ${readingMinutes(copy, language)} دقائق` : `${readingMinutes(copy, language)} min read`}</span>
          <a href={articlePath(article.slug, language)} aria-label={language === "ar" ? `اقرأ: ${copy.title}` : `Read: ${copy.title}`}>{language === "ar" ? "اقرأ المقال ←" : "Read article →"}</a>
        </div>
      </article>;
    })}
  </div>;
}
