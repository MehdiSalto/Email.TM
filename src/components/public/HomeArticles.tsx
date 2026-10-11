import { articlePath } from "../../routing";
import type { ArticleLanguage } from "../../content/articles";
import ArticleCards from "./ArticleCards";

export default function HomeArticles({ language = "en" }: { language?: ArticleLanguage }) {
  return <section className="home-articles" lang={language} dir={language === "ar" ? "rtl" : "ltr"} aria-labelledby="home-articles-title">
    <div className="home-articles-heading">
      <div><span className="section-eyebrow">{language === "ar" ? "تعلم واستفد" : "Read & learn"}</span>
        <h2 id="home-articles-title">{language === "ar" ? "مقالات أصلية من إيميل تايم" : "Original articles from Email Time"}</h2>
        <p>{language === "ar" ? "أدلة عملية لاختيار العنوان المناسب والاستفادة من صندوقك المؤقت." : "Practical guidance for choosing an address and making the most of a temporary inbox."}</p>
      </div>
      <a className="article-all-link" href={articlePath(undefined, language)}>{language === "ar" ? "جميع المقالات ←" : "All articles →"}</a>
    </div>
    <ArticleCards language={language} headingLevel={3} />
  </section>;
}
