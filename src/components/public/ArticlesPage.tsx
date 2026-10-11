import type { ArticleLanguage } from "../../content/articles";
import { articlePath } from "../../routing";
import PublicPage from "./PublicPage";
import ArticleCards from "./ArticleCards";

export default function ArticlesPage({ language = "en" }: { language?: ArticleLanguage }) {
  const arabic = language === "ar";
  return <PublicPage language={language} title={arabic ? "مقالات إيميل تايم" : "Email Time articles"}
    description={arabic ? "أربعة مقالات أصلية تساعدك على اختيار البريد المناسب وحل مشاكل الاستقبال وفهم الصلاحية واختبار رسائل تطبيقك." : "Four original, practical articles about choosing an address, troubleshooting delivery, mailbox lifetime, and testing your own email flows."}>
    <div className="article-index-intro">
      <span>{arabic ? "كتبت خصيصًا لإيميل تايم · متاحة بالعربية والإنجليزية" : "Written for Email Time · Available in English and Arabic"}</span>
      <a href={articlePath(undefined, arabic ? "en" : "ar")} hrefLang={arabic ? "en" : "ar"} lang={arabic ? "en" : "ar"}>{arabic ? "Read in English" : "اقرأ بالعربية"}</a>
    </div>
    <ArticleCards language={language} />
    <section className="article-endnote">
      <h2>{arabic ? "ابدأ بالمهمة التي تريد إنجازها" : "Start with the task you want to finish"}</h2>
      <p>{arabic ? "تساعدك هذه المقالات على استعمال البريد المؤقت بوعي. إذا كنت تحتاج إلى العنوان لاحقًا لاسترجاع حساب أو استقبال مراسلات مستمرة، اختر بريدًا دائمًا تتحكم فيه." : "Use these guides to make temporary email a deliberate choice. If you will need the address later for recovery or ongoing communication, choose a permanent mailbox you control."}</p>
      <a href="/how-it-works">{arabic ? "كيف تعمل الخدمة؟" : "How Email Time works"}</a>
    </section>
  </PublicPage>;
}
