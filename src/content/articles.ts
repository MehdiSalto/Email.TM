export type ArticleLanguage = "en" | "ar";

export interface ArticleSection {
  id: string;
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  steps?: string[];
}

export interface ArticleCopy {
  title: string;
  excerpt: string;
  category: string;
  introduction: string;
  sections: ArticleSection[];
}

export interface Article {
  slug: string;
  published: string;
  number: string;
  en: ArticleCopy;
  ar: ArticleCopy;
}

// Original editorial content written for Email Time. Each topic has two language editions.
export const articles: Article[] = [
  {
    slug: "temporary-email-or-alias",
    published: "2026-10-11",
    number: "01",
    en: {
      title: "Temporary email, an alias, or your main inbox: how to choose",
      excerpt: "A practical decision guide for downloads, trials, newsletters, and accounts you will need to recover later.",
      category: "Everyday privacy",
      introduction: "An email field looks the same whether you are collecting a download or opening an account you will use for years. The consequences of the address you enter are very different. Before creating a disposable address, ask what you will need from that inbox after today's task is finished.",
      sections: [
        { id: "start-with-lifetime", heading: "Start with the relationship, not the sign-up form", paragraphs: [
          "Imagine that a design website sends you a sample file. You want to receive the file once and have no intention of saving an account there. A temporary address can separate that message from your main inbox, provided the website accepts disposable addresses and the message arrives before the mailbox expires.",
          "Now imagine a subscription that renews next month. The first confirmation may arrive immediately, but receipts, cancellation messages, and password resets can arrive much later. A mailbox that works today is not enough. For that relationship, choose an address you expect to control for as long as you use the service.",
        ] },
        { id: "compare-options", heading: "Three options solve three different problems", paragraphs: [
          "Your permanent inbox is the address you keep for ongoing communication and recovery. An alias is an additional address managed by a permanent email provider or forwarding service; its behavior and lifetime depend on that provider. Email Time does not provide aliases or forwarding. Its temporary inbox receives messages for the lifetime you select.",
        ], bullets: [
          "Temporary inbox: useful for an accepted, short task whose result you can finish receiving during the selected lifetime.",
          "Managed alias: useful for an ongoing relationship where you want a separate address and can maintain access through your provider.",
          "Permanent inbox: appropriate when losing access would affect account recovery, essential communication, or ownership of a service.",
        ] },
        { id: "decision-check", heading: "Use this four-question check", paragraphs: [
          "You do not need a complicated privacy strategy for every download. A short check usually exposes the situations where a temporary mailbox would create more problems than it solves.",
        ], steps: [
          "Will I need another message from this service after the mailbox expires? If yes, use a lasting address.",
          "Does the message contain information I would be uncomfortable sharing through an inbox link? If yes, choose a more suitable private mailbox.",
          "Does the website allow temporary email? If it rejects the address, respect its requirements and use an accepted address.",
          "Can I complete the task before the selected expiration time? Leave room for delivery delays instead of choosing the shortest lifetime automatically.",
        ] },
        { id: "worked-example", heading: "A small example: the download becomes an account", paragraphs: [
          "Suppose you use a temporary address to receive a free template. After trying it, you decide to keep a paid account on the same website. Before depending on that account, open its settings and replace the temporary address with a permanent one, if the service supports changing it. Complete any confirmation required by the website while the original inbox is still available.",
          "Copying the first message elsewhere does not preserve access to future messages. The account's registered address matters more than the location of an old confirmation email. If you cannot change the address, contact that service through its own support channel rather than assuming an expired mailbox can be recovered.",
        ] },
        { id: "realistic-privacy", heading: "Keep the privacy benefit realistic", paragraphs: [
          "A disposable address reduces how often you give out your main address. It does not make browsing anonymous, remove cookies, or erase records held by the website that sent the message. On Email Time, a valid shared inbox link can also expose that inbox to whoever receives the link.",
          "The useful habit is deliberate separation: use temporary email for genuinely temporary tasks, keep ongoing accounts attached to an address you maintain, and treat an inbox link as something you share only with a clear purpose.",
        ] },
      ],
    },
    ar: {
      title: "بريد مؤقت أم عنوان بديل أم بريدك الأساسي: كيف تختار؟",
      excerpt: "دليل عملي لاختيار العنوان المناسب للتنزيلات والتجارب والنشرات والحسابات التي ستحتاج إلى استرجاعها لاحقًا.",
      category: "الخصوصية اليومية",
      introduction: "خانة البريد الإلكتروني تبدو متشابهة عند تنزيل ملف بسيط وعند إنشاء حساب ستستخدمه سنوات. لكن نتيجة اختيار العنوان ليست متشابهة. قبل استعمال بريد مؤقت، اسأل نفسك: هل ستحتاج إلى هذا الصندوق بعد انتهاء المهمة الحالية؟",
      sections: [
        { id: "start-with-lifetime", heading: "ابدأ بمدة علاقتك بالخدمة", paragraphs: [
          "تخيل أن موقعًا للتصميم سيرسل لك ملفًا تجريبيًا مرة واحدة، ولا تنوي الاحتفاظ بحساب فيه. قد يكون البريد المؤقت مناسبًا لفصل هذه الرسالة عن بريدك الأساسي، بشرط قبول الموقع لهذا النوع من العناوين ووصول الرسالة قبل انتهاء الصلاحية.",
          "أما الاشتراك الذي يتجدد الشهر المقبل، فلا يكفيه وصول رسالة التأكيد الأولى اليوم. قد تحتاج لاحقًا إلى إيصال أو إلغاء الاشتراك أو استرجاع كلمة المرور. اختر هنا عنوانًا تستطيع الاحتفاظ به طوال مدة استعمال الخدمة.",
        ] },
        { id: "compare-options", heading: "ثلاثة خيارات لاحتياجات مختلفة", paragraphs: [
          "البريد الأساسي عنوان دائم للمراسلات المستمرة واسترجاع الحسابات. العنوان البديل، أو alias، عنوان إضافي تديره خدمة بريد أو خدمة تحويل، وتختلف خصائصه ومدته حسب المزود. إيميل تايم لا يقدم عناوين بديلة أو تحويل الرسائل؛ بل يوفر صندوقًا مؤقتًا للاستقبال خلال المدة المختارة.",
        ], bullets: [
          "الصندوق المؤقت: لمهمة قصيرة يقبل فيها الموقع البريد المؤقت ويمكنك إكمالها قبل انتهاء مدته.",
          "العنوان البديل: لعلاقة مستمرة تريد لها عنوانًا منفصلًا وتستطيع الحفاظ على الوصول إليه لدى مزودك.",
          "البريد الدائم: عندما يؤثر فقدان الصندوق في استرجاع الحساب أو ملكية الخدمة أو مراسلاتك المهمة.",
        ] },
        { id: "decision-check", heading: "أربع أسئلة قبل استعمال العنوان", paragraphs: [
          "لست بحاجة إلى خطة معقدة عند كل تنزيل. هذه الأسئلة تكشف الحالات التي قد يتحول فيها البريد المؤقت من وسيلة مريحة إلى سبب لفقدان الوصول.",
        ], steps: [
          "هل سأحتاج رسالة أخرى من هذه الخدمة بعد انتهاء الصندوق؟ إن كان الجواب نعم، استعمل عنوانًا دائمًا.",
          "هل تتضمن الرسالة معلومات لا أريد كشفها عبر رابط صندوق وارد؟ إن كان الجواب نعم، اختر صندوقًا أنسب لخصوصيتها.",
          "هل يقبل الموقع البريد المؤقت؟ إن رفض العنوان، احترم شروطه واستعمل عنوانًا مقبولًا.",
          "هل أستطيع إكمال المهمة قبل الموعد المحدد؟ اترك وقتًا لتأخر الإرسال ولا تختَر أقصر مدة تلقائيًا.",
        ] },
        { id: "worked-example", heading: "مثال: تنزيل بسيط يتحول إلى حساب دائم", paragraphs: [
          "استعملت عنوانًا مؤقتًا لتنزيل قالب، ثم قررت الاشتراك في الموقع نفسه. قبل الاعتماد على الحساب، افتح إعداداته واستبدل العنوان المؤقت بآخر دائم، إذا كان الموقع يسمح بذلك. أكمل التأكيد الذي يطلبه الموقع بينما الصندوق القديم ما زال متاحًا.",
          "حفظ رسالة التأكيد لا يحفظ وصولك إلى الرسائل المستقبلية. المهم هو عنوان الحساب المسجل. وإذا تعذر تغييره، تواصل مع دعم الموقع نفسه بدل افتراض أنك ستتمكن من استرجاع صندوق منتهي الصلاحية.",
        ] },
        { id: "realistic-privacy", heading: "افهم حدود الخصوصية", paragraphs: [
          "العنوان المؤقت يقلل مشاركة بريدك الأساسي، لكنه لا يجعل التصفح مجهولًا، ولا يزيل ملفات الارتباط، ولا يمحو البيانات التي يحتفظ بها الموقع المرسل. ويمكن لمن يملك رابط مشاركة صالحًا في إيميل تايم أن يطلع على الصندوق المرتبط به.",
          "العادة المفيدة هي الفصل المقصود: بريد مؤقت للمهام المؤقتة، وعنوان تحافظ عليه للحسابات المستمرة، ورابط صندوق لا تشاركه إلا لسبب واضح ومع شخص تختاره.",
        ] },
      ],
    },
  },
  {
    slug: "missing-verification-email",
    published: "2026-10-11",
    number: "02",
    en: {
      title: "Verification email not arriving? A calm troubleshooting checklist",
      excerpt: "Check the address, mailbox lifetime, sender response, and delivery timing before requesting another confirmation.",
      category: "Inbox troubleshooting",
      introduction: "An empty inbox does not tell you which part of a confirmation flow failed. The website may not have sent anything, the address may be wrong, or delivery may still be in progress. Work through the flow in order so that each check answers a specific question.",
      sections: [
        { id: "verify-address", heading: "1. Compare the exact address", paragraphs: [
          "Open the temporary inbox and copy the address shown there. Compare it with the address entered on the sending website, including the text after the @ symbol. A correct-looking username with a different domain is a different mailbox. Check for accidental spaces if you typed the address manually.",
          "If you have several temporary mailboxes, open the one used for this request. The newest mailbox on your dashboard is not necessarily the address you entered earlier. Do not publish the inbox's share link while asking someone to help compare the addresses.",
        ] },
        { id: "check-expiration", heading: "2. Check the expiration time before resending", paragraphs: [
          "Email Time shows the selected mailbox expiration time. If that time has passed, do not keep requesting messages to the same address and expect the service to restore it. A new temporary address is a different mailbox; it does not inherit messages sent to the old one.",
          "For a task that can be restarted safely, use a new address and begin the confirmation again. For an existing account you need to keep, follow the sending website's account recovery or support process. A disposable mailbox should not become the only route back into an important account.",
        ] },
        { id: "sender-feedback", heading: "3. Read what the sending website actually says", paragraphs: [
          "Look for a clear delivery acknowledgement, a validation error, or a message that the email domain is not accepted. Clicking a button does not prove that a message entered the mail system. Some websites require another action before they send their confirmation.",
          "If the website explicitly rejects temporary email, use an address it accepts. Repeating the request with other disposable domains is not a reliable fix and can conflict with that site's rules. Email Time cannot override the sender's acceptance policy.",
        ] },
        { id: "wait-and-refresh", heading: "4. Refresh deliberately and avoid overlapping requests", paragraphs: [
          "While the mailbox is active, use its Refresh control to check for new messages. Delivery timing depends on the sender and the underlying mail service, so an immediate result is not guaranteed. Allow a reasonable interval before requesting another message, following any waiting period shown by the sending website.",
          "Several confirmation requests can produce messages out of order. A sender may invalidate an earlier code when it generates a new one. If multiple messages arrive, check the request time and follow the sender's instructions about which code or link remains valid.",
        ] },
        { id: "isolate-problem", heading: "5. Separate mailbox access from sender delivery", paragraphs: [
          "If the inbox displays an error instead of a message list, first check your connection and reopen the page. An inbox that cannot load is a different problem from an inbox that loads successfully but contains no confirmation. Record the visible error rather than assuming both situations mean the sender failed.",
          "If you control the sender, use a harmless test message and check its delivery logs. If you do not control it, contact that website with the time of the request and its visible response. Keep passwords, confirmation codes, message contents, and inbox links out of public reports.",
        ] },
        { id: "report-clearly", heading: "A useful problem report", paragraphs: [
          "A short report can say: ‘At 14:20 UTC, I submitted the address and the website showed “message sent.” The inbox was active, refreshed without an error, and still showed no messages at 14:25.’ This describes observations without claiming that a particular system caused the delay.",
          "Include your browser and whether a reload changed the result. That gives support a reproducible sequence while protecting the information inside your mailbox.",
        ] },
      ],
    },
    ar: {
      title: "رسالة التأكيد لم تصل؟ خطوات منظمة لمعرفة السبب",
      excerpt: "تحقق من العنوان والصلاحية ورد الموقع المرسل ووقت التسليم قبل طلب رسالة تأكيد جديدة.",
      category: "حل مشاكل الاستقبال",
      introduction: "الصندوق الفارغ وحده لا يوضح أين تعطل التأكيد. ربما لم يرسل الموقع شيئًا، أو أُدخل عنوان غير صحيح، أو لم يكتمل التسليم بعد. تتبع الخطوات بالترتيب كي تجيب كل خطوة عن سؤال محدد.",
      sections: [
        { id: "verify-address", heading: "1. قارن العنوان كاملًا", paragraphs: [
          "انسخ العنوان الظاهر في صندوقك وقارنه بالعنوان الذي أدخلته في الموقع المرسل، بما فيه الجزء الذي يأتي بعد @. اسم مستخدم صحيح مع نطاق مختلف يعني صندوقًا مختلفًا. وإذا كتبت العنوان يدويًا، تحقق من المسافات الزائدة.",
          "إذا أنشأت عدة عناوين، افتح الصندوق الذي استعملته في الطلب نفسه. أحدث صندوق في القائمة ليس بالضرورة عنوان الطلب السابق. لا تنشر رابط مشاركة الصندوق أثناء طلب المساعدة في مقارنة العناوين.",
        ] },
        { id: "check-expiration", heading: "2. تحقق من الصلاحية قبل إعادة الطلب", paragraphs: [
          "يعرض إيميل تايم وقت انتهاء الصندوق. إذا تجاوزته، لا تكرر الإرسال إلى العنوان نفسه على أمل استرجاعه. العنوان المؤقت الجديد صندوق مختلف ولا يستقبل الرسائل التي أُرسلت إلى العنوان القديم.",
          "إذا أمكن بدء المهمة من جديد، استعمل عنوانًا جديدًا وأعد التأكيد. أما الحساب الذي تحتاج الاحتفاظ به، فاتبع خطوات الاسترجاع أو الدعم في الموقع المرسل. لا تجعل الصندوق المؤقت وسيلة الاسترجاع الوحيدة لحساب مهم.",
        ] },
        { id: "sender-feedback", heading: "3. اقرأ رد الموقع المرسل", paragraphs: [
          "ابحث عن تأكيد واضح للإرسال، أو خطأ في العنوان، أو إشعار برفض النطاق. الضغط على الزر لا يثبت أن الرسالة دخلت نظام البريد. وقد يتطلب الموقع إجراءً إضافيًا قبل إرسال التأكيد.",
          "إذا كان الموقع يرفض البريد المؤقت صراحة، استخدم عنوانًا يقبله. تكرار المحاولة بنطاقات مؤقتة أخرى ليس حلًا مضمونًا وقد يخالف شروطه. إيميل تايم لا يستطيع تغيير قواعد قبول العناوين عند المرسل.",
        ] },
        { id: "wait-and-refresh", heading: "4. حدّث الصندوق وتجنب الطلبات المتداخلة", paragraphs: [
          "أثناء صلاحية الصندوق، استعمل زر التحديث للتحقق من الرسائل الجديدة. وقت التسليم يعتمد على المرسل ومزود البريد، ولا يوجد ضمان للوصول الفوري. انتظر فترة مناسبة قبل إعادة الطلب، واحترم المدة التي يعرضها الموقع المرسل.",
          "طلبات التأكيد المتعددة قد تجعل الرسائل تصل بترتيب مختلف. وقد يبطل المرسل رمزًا سابقًا عندما يولّد رمزًا جديدًا. إذا وصلت عدة رسائل، راجع توقيت الطلب وتعليمات الموقع لمعرفة الرمز أو الرابط الصالح.",
        ] },
        { id: "isolate-problem", heading: "5. ميّز بين خطأ فتح الصندوق وتأخر الرسالة", paragraphs: [
          "إذا ظهر خطأ بدل قائمة الرسائل، تحقق من اتصالك وأعد فتح الصفحة. الصندوق الذي لا يستطيع التحميل يختلف عن صندوق يفتح بنجاح لكنه فارغ. سجّل الخطأ الظاهر بدل افتراض أن المرسل تسبب في الحالتين.",
          "إذا كنت تدير الخدمة المرسلة، جرّب رسالة غير حساسة وراجع سجلات التسليم لديها. وإلا فتواصل مع دعم الموقع المرسل وأعطه وقت الطلب ورد الصفحة. لا تنشر كلمات المرور أو رموز التأكيد أو محتوى الرسائل أو روابط الصناديق في التقارير العامة.",
        ] },
        { id: "report-clearly", heading: "كيف تكتب بلاغًا مفيدًا؟", paragraphs: [
          "يمكن أن تكتب: «في الساعة 14:20 بتوقيت UTC أدخلت العنوان وظهر تأكيد الإرسال. كان الصندوق صالحًا، وتم تحديثه بلا خطأ، ولم تظهر رسائل حتى 14:25». هذا وصف لما لاحظته، دون الجزم بأن نظامًا معينًا هو سبب التأخر.",
          "أضف اسم المتصفح وهل تغيرت النتيجة بعد إعادة التحميل. بهذا تقدم خطوات يمكن تتبعها وتحافظ على خصوصية محتوى صندوقك.",
        ] },
      ],
    },
  },
  {
    slug: "inbox-expiration-and-sharing",
    published: "2026-10-11",
    number: "03",
    en: {
      title: "Mailbox expiration and shared links: plan a temporary inbox's whole life",
      excerpt: "Understand what the countdown, browser list, and share link each mean, and finish your task before access ends.",
      category: "Mailbox essentials",
      introduction: "A temporary inbox has several kinds of ‘access’ that are easy to confuse: the address a sender uses, the inbox link you open, and the entry saved in your browser. Thinking about each one separately helps you avoid losing a needed message or sharing more than you intended.",
      sections: [
        { id: "three-things", heading: "The address, the link, and the browser entry are different", paragraphs: [
          "The email address tells a sender where to deliver a message. The inbox URL opens the corresponding message view in Email Time. The dashboard entry is a record remembered by your browser so that you can find an address you created. Copying one of these does not automatically copy the others.",
          "When a form asks for your email, paste the address, not the inbox URL. When you ask a colleague to review an authorized test inbox, a share link can provide access to its contents while it remains available. Send that link only when you intend to grant that access.",
        ] },
        { id: "choose-time", heading: "Choose time for the entire task", paragraphs: [
          "Email Time offers lifetimes of one hour, two hours, one day, two days, and one week. Choose based on how long the whole task could take, including delayed messages and follow-up confirmations. A one-hour mailbox may be enough for an immediate test, but it is a poor fit for a message expected tomorrow.",
          "The displayed expiration time is a deadline for availability through the service, not a promise that every copy of a message disappears everywhere at that instant. The sender and the underlying email provider may keep their own records under their own policies.",
        ] },
        { id: "before-expiry", heading: "Do a quick review before the deadline", paragraphs: [
          "If the task needs an address after expiration, change it with the website that registered it while you still have access. A saved message can help you remember what happened, but it cannot receive a later reset code or prove that an expired address will remain under your control.",
        ], steps: [
          "Finish the one-time action and check whether the sender expects any later messages.",
          "Move ongoing accounts to a permanent address and complete their change-of-address confirmation.",
          "Keep only the non-sensitive information you actually need from the message, using a place you control.",
          "Check whether you shared the inbox link and avoid sending more information to a mailbox others can view.",
        ] },
        { id: "browser-storage", heading: "What happens if you clear the browser list?", paragraphs: [
          "Email Time remembers your created mailbox records in local storage on the device. Clearing site data, using another browser, or opening a private browsing session can make those entries unavailable in that browser. This is not the same operation as deleting every copy of the mailbox or its messages from the underlying provider.",
          "Likewise, removing an entry from the dashboard removes that saved browser entry. Do not treat the dashboard's remove action as a guaranteed server-side deletion or as a way to revoke a previously shared link. The mailbox's availability still depends on the service and its expiration time.",
        ] },
        { id: "share-carefully", heading: "Share with a purpose and assume the whole inbox is visible", paragraphs: [
          "A colleague who receives a valid share link may be able to read other messages in that same inbox, not just the one you wanted them to inspect. For collaborative testing, create a mailbox specifically for the test and keep personal or unrelated messages out of it.",
          "Avoid putting links in public screenshots, issue reports, chat channels with many people, or documents that may be forwarded. If a link has already been exposed, stop using that mailbox for new sensitive material. Merely hiding the entry on your dashboard does not make the shared URL private again.",
        ] },
        { id: "simple-routine", heading: "A repeatable routine", paragraphs: [
          "Create the inbox for a clearly defined task, choose a realistic lifetime, copy the address into the correct form, and keep the inbox link private. Before you finish, decide whether any ongoing account needs a lasting address. That small closing step is what makes a temporary mailbox useful without turning it into a future recovery problem.",
        ] },
      ],
    },
    ar: {
      title: "صلاحية الصندوق وروابط المشاركة: خطط للبريد المؤقت من البداية للنهاية",
      excerpt: "افهم الفرق بين موعد الانتهاء والقائمة المحفوظة في المتصفح ورابط المشاركة، وأكمل مهمتك قبل فقدان الوصول.",
      category: "أساسيات الصندوق",
      introduction: "هناك أنواع مختلفة من الوصول إلى الصندوق المؤقت: العنوان الذي يستعمله المرسل، والرابط الذي يفتح الرسائل، والسجل الذي يتذكره المتصفح. فهم الفرق بينها يحميك من فقدان رسالة لازمة أو مشاركة أكثر مما كنت تقصد.",
      sections: [
        { id: "three-things", heading: "العنوان والرابط والسجل ليست شيئًا واحدًا", paragraphs: [
          "عنوان البريد يحدد وجهة إرسال الرسالة. رابط الصندوق يفتح الرسائل المرتبطة به في إيميل تايم. أما سجل لوحة التحكم فيساعد متصفحك على تذكر العنوان الذي أنشأته. نسخ واحد منها لا يعني نسخ البقية تلقائيًا.",
          "عندما يطلب نموذج بريدك، ألصق العنوان وليس رابط الصندوق. وعندما تريد أن يراجع زميل صندوق اختبار مأذونًا به، قد يتيح له رابط المشاركة قراءة المحتوى ما دام الصندوق متاحًا. شارك الرابط فقط عندما تقصد منح هذا الوصول.",
        ] },
        { id: "choose-time", heading: "اختر مدة تناسب المهمة كاملة", paragraphs: [
          "يتيح إيميل تايم ساعة أو ساعتين أو يومًا أو يومين أو أسبوعًا. اختر المدة بناءً على المهمة كاملة، بما فيها تأخر الرسائل والتأكيدات الإضافية. ساعة قد تكفي لاختبار فوري، لكنها لا تناسب رسالة تتوقعها غدًا.",
          "وقت الانتهاء الظاهر يتعلق بتوفر الصندوق عبر الخدمة، ولا يعني أن كل نسخة من الرسائل تختفي من كل مكان في اللحظة نفسها. فقد يحتفظ المرسل ومزود البريد بسجلات وفق سياساتهما.",
        ] },
        { id: "before-expiry", heading: "راجع ما تحتاجه قبل انتهاء الصلاحية", paragraphs: [
          "إذا كانت المهمة ستحتاج عنوانًا بعد الموعد، غيّره لدى الموقع الذي سجلته فيه بينما الصندوق ما زال متاحًا. الرسالة المحفوظة تساعدك على تذكر التفاصيل، لكنها لا تستقبل رمز استرجاع جديدًا ولا تضمن استمرار التحكم في عنوان منتهي الصلاحية.",
        ], steps: [
          "أكمل الإجراء المؤقت وتحقق هل يتوقع المرسل مراسلات أخرى لاحقًا.",
          "انقل الحسابات المستمرة إلى عنوان دائم وأكمل تأكيد تغيير العنوان.",
          "احتفظ فقط بالمعلومات غير الحساسة التي تحتاجها في مكان تتحكم فيه.",
          "راجع مع من شاركت الرابط، ولا ترسل معلومات إضافية إلى صندوق يمكن لغيرك الاطلاع عليه.",
        ] },
        { id: "browser-storage", heading: "ماذا يعني مسح قائمة المتصفح؟", paragraphs: [
          "يتذكر إيميل تايم سجلات العناوين عبر التخزين المحلي على جهازك. مسح بيانات الموقع أو تغيير المتصفح أو استعمال التصفح الخاص قد يجعل تلك السجلات غير متاحة في المتصفح الجديد. هذا لا يساوي حذف جميع نسخ الصندوق والرسائل عند مزود البريد.",
          "وحذف سجل من لوحة التحكم يزيل السجل المحفوظ في متصفحك. لا تعتبر زر الإزالة ضمانًا للحذف من الخادم أو وسيلة لإلغاء رابط سبق أن شاركته. توفر الصندوق يبقى مرتبطًا بالخدمة ووقت انتهاء الصلاحية.",
        ] },
        { id: "share-carefully", heading: "شارك لغرض واضح وافترض ظهور الصندوق كله", paragraphs: [
          "قد يتمكن صاحب رابط مشاركة صالح من قراءة رسائل أخرى داخل الصندوق، وليس الرسالة التي أردت عرضها وحدها. عند الاختبار الجماعي، أنشئ صندوقًا خاصًا بالمهمة وابقِ الرسائل الشخصية وغير المرتبطة بها خارجه.",
          "لا تضع الرابط في لقطات شاشة عامة أو بلاغات مفتوحة أو مجموعات واسعة أو مستندات قد يعاد إرسالها. إذا انكشف الرابط، توقف عن استقبال معلومات حساسة جديدة في ذلك الصندوق. إخفاء سجله في لوحة التحكم لا يجعل الرابط المنشور خاصًا من جديد.",
        ] },
        { id: "simple-routine", heading: "روتين بسيط يمكن تكراره", paragraphs: [
          "أنشئ الصندوق لمهمة محددة، واختر مدة واقعية، وانسخ العنوان في النموذج الصحيح، واحتفظ بالرابط بعيدًا عن المشاركة العامة. قبل إنهاء المهمة، تحقق هل يحتاج أي حساب مستمر إلى عنوان دائم. هذه الخطوة الأخيرة تمنع تحول الراحة الحالية إلى مشكلة استرجاع مستقبلية.",
        ] },
      ],
    },
  },
  {
    slug: "test-signup-email-flow",
    published: "2026-10-11",
    number: "04",
    en: {
      title: "Test a sign-up email flow with a temporary inbox: a practical QA plan",
      excerpt: "A repeatable test for your own application, from address entry and confirmation wording to delays, duplicate requests, and mobile reading.",
      category: "Developer practice",
      introduction: "A confirmation email can look correct in a template preview and still fail the user journey. Testing with a temporary inbox helps you inspect the message as a recipient, without mixing test traffic into a personal mailbox. Keep the exercise limited to applications you own or are authorized to test.",
      sections: [
        { id: "prepare-test", heading: "Prepare one small, traceable test", paragraphs: [
          "Start with a staging environment when one is available. Use dummy profile data, a test account, and a harmless action that will not charge money or change a real user's information. Pick a mailbox lifetime long enough to cover the checks, and record the start time with a timezone.",
          "Write down the expected result before clicking Submit: which page should acknowledge the request, what message should arrive, and what the confirmation link should do. A test that only asks whether ‘an email arrived’ misses errors in the rest of the journey.",
        ] },
        { id: "happy-path", heading: "Check the complete successful path", paragraphs: [
          "Create an Email Time address, copy it into your application's form, and submit once. Observe the response on the page before opening the inbox. If the message arrives, compare its sender name, subject, greeting, and requested action with the task the user just performed.",
          "Follow the confirmation in the intended test environment. Check that it opens the right host, clearly reports success, and leaves the test account in the expected state. Email Time is a receiving tool; it does not replace your sender's logs, domain configuration checks, or an automated email testing system.",
        ], bullets: [
          "The recipient address matches the address entered in the form.",
          "The subject and sender make the message recognizable without opening it.",
          "The action explains what will happen and does not depend only on an image.",
          "A plain-text version, when provided by your sender, has a readable link and clear instructions.",
          "The destination confirms the result instead of leaving the user on an ambiguous page.",
        ] },
        { id: "negative-cases", heading: "Add failure cases deliberately", paragraphs: [
          "Test a mistyped address in your form and check whether the validation message helps the user correct it. Then try requesting a second confirmation after the waiting period your application defines. Decide what your product promises about earlier links, and verify that the interface explains the actual behavior.",
          "Test an expired confirmation token using your own application's test controls or documented token lifetime. Do not confuse that with mailbox expiration: the email's link can expire while the inbox still works, or the inbox can expire while an old link still exists. These are different systems and need separate checks.",
        ] },
        { id: "mobile-reading", heading: "Read the message on a narrow screen", paragraphs: [
          "Use a phone or a narrow browser window to inspect long lines, button labels, and links. Check that the essential instruction remains understandable when remote images are unavailable. A message should still explain why it was sent and how to proceed when decorative assets do not load.",
          "Do not infer compatibility with every email client from one temporary inbox. Rendering behavior varies between web inboxes and email applications. Use dedicated client testing for a release that needs broad layout compatibility.",
        ] },
        { id: "record-results", heading: "Keep a compact result log", paragraphs: [
          "Record the test case, request time, visible page response, arrival time if observed, and final account state. For a failed delivery, examine your authorized sender logs to distinguish a validation failure, an unsent message, and a delivery problem. Avoid guessing the cause from an empty inbox alone.",
          "Before sharing screenshots or a bug report, remove confirmation tokens, personal data, and inbox share links. Test mailboxes should contain test content. When the checks are finished, remove disposable test accounts through your application's normal cleanup process and leave real users' accounts untouched.",
        ] },
        { id: "release-check", heading: "Turn the result into a release decision", paragraphs: [
          "A useful pass means that the form, delivery acknowledgement, readable message, confirmation destination, and account state agree. If one step fails, document that step and repeat the relevant case after the fix. This produces a clearer release decision than repeatedly sending messages until one happens to arrive.",
        ] },
      ],
    },
    ar: {
      title: "اختبر رسائل التسجيل ببريد مؤقت: خطة عملية لمراجعة الجودة",
      excerpt: "اختبار قابل للتكرار لتطبيقك، من إدخال العنوان ورسالة التأكيد إلى التأخر والطلبات المتكررة والقراءة على الهاتف.",
      category: "ممارسة للمطورين",
      introduction: "قد تبدو رسالة التأكيد سليمة في معاينة القالب ومع ذلك تتعطل رحلة المستخدم. يساعد الصندوق المؤقت على مراجعة الرسالة من جهة المستلم دون خلط الاختبارات ببريدك الشخصي. اقتصر على التطبيقات التي تملكها أو لديك إذن لاختبارها.",
      sections: [
        { id: "prepare-test", heading: "جهّز اختبارًا صغيرًا يمكن تتبعه", paragraphs: [
          "ابدأ ببيئة تجريبية إن توفرت. استعمل بيانات وهمية وحساب اختبار وإجراءً لا يدفع أموالًا ولا يغير معلومات مستخدم حقيقي. اختر صلاحية تكفي للخطوات، وسجّل وقت البداية مع المنطقة الزمنية.",
          "حدد النتيجة المتوقعة قبل الإرسال: ماذا ستعرض الصفحة، وما الرسالة التي يجب أن تصل، وماذا يفعل رابط التأكيد؟ اختبار يكتفي بسؤال «هل وصلت رسالة؟» قد يفوّت أخطاء بقية الرحلة.",
        ] },
        { id: "happy-path", heading: "راجع مسار النجاح كاملًا", paragraphs: [
          "أنشئ عنوانًا في إيميل تايم، وانسخه في نموذج تطبيقك، ثم أرسل الطلب مرة واحدة. لاحظ رد الصفحة قبل فتح الصندوق. وإذا وصلت الرسالة، قارن اسم المرسل والعنوان والتحية والإجراء المطلوب بالمهمة التي نفذتها.",
          "افتح التأكيد داخل بيئة الاختبار المقصودة. تحقق من النطاق الصحيح، وظهور نتيجة مفهومة، ووصول حساب الاختبار إلى الحالة المتوقعة. إيميل تايم أداة استقبال ولا يعوض سجلات المرسل أو مراجعة إعدادات النطاق أو نظام اختبار رسائل آليًا.",
        ], bullets: [
          "عنوان المستلم مطابق للعنوان المدخل في النموذج.",
          "اسم المرسل وموضوع الرسالة يساعدان على التعرف عليها قبل فتحها.",
          "الإجراء يشرح نتيجته ولا يعتمد على صورة وحدها.",
          "النسخة النصية، إذا كان المرسل يوفرها، تحتوي رابطًا مقروءًا وتعليمات واضحة.",
          "صفحة الوصول تؤكد النتيجة بدل ترك المستخدم في صفحة غامضة.",
        ] },
        { id: "negative-cases", heading: "أضف حالات الفشل بطريقة مقصودة", paragraphs: [
          "اختبر عنوانًا مكتوبًا خطأ في النموذج وراجع هل رسالة التحقق تساعد على تصحيحه. ثم اطلب تأكيدًا ثانيًا بعد مدة الانتظار التي يحددها تطبيقك. حدد ما يعد به المنتج بشأن الروابط السابقة، وتأكد أن الواجهة تشرح ما يحدث فعلًا.",
          "اختبر رمز تأكيد منتهيًا باستعمال أدوات اختبار تطبيقك أو المدة الموثقة للرمز. لا تخلط ذلك بانتهاء الصندوق؛ قد ينتهي الرابط والصندوق ما زال يعمل، أو ينتهي الصندوق وتبقى رسالة قديمة محفوظة. كل حالة تخص نظامًا مختلفًا وتحتاج اختبارًا مستقلًا.",
        ] },
        { id: "mobile-reading", heading: "اقرأ الرسالة على شاشة ضيقة", paragraphs: [
          "استعمل هاتفًا أو نافذة ضيقة لمراجعة الأسطر الطويلة وتسميات الأزرار والروابط. تحقق أن التعليمة الأساسية تبقى مفهومة عند غياب الصور الخارجية. يجب أن تشرح الرسالة سبب إرسالها وكيفية المتابعة حتى إن لم تظهر العناصر الزخرفية.",
          "لا تستنتج توافق الرسالة مع كل برامج البريد من صندوق مؤقت واحد. تختلف طريقة العرض بين صناديق الويب وتطبيقات البريد. إذا كان الإصدار يحتاج توافقًا واسعًا، استعمل أدوات مخصصة لاختبار برامج البريد.",
        ] },
        { id: "record-results", heading: "احتفظ بسجل نتائج مختصر", paragraphs: [
          "سجّل الحالة ووقت الطلب ورد الصفحة ووقت الوصول إن لوحظ وحالة الحساب النهائية. عند فشل التسليم، راجع سجلات المرسل المأذون لك بها لتمييز خطأ التحقق عن رسالة لم ترسل أصلًا وعن مشكلة التسليم. الصندوق الفارغ وحده لا يحدد السبب.",
          "قبل مشاركة لقطة أو بلاغ، أزل رموز التأكيد والبيانات الشخصية وروابط الصناديق. يجب أن تحتوي صناديق الاختبار بيانات اختبار. وعند الانتهاء، أزل الحسابات التجريبية عبر آلية التنظيف العادية لتطبيقك، دون المساس بحسابات المستخدمين الحقيقيين.",
        ] },
        { id: "release-check", heading: "حوّل النتائج إلى قرار واضح", paragraphs: [
          "النجاح المفيد يعني توافق النموذج وإشعار الإرسال والرسالة المقروءة وصفحة التأكيد وحالة الحساب. إذا تعطلت خطوة، وثقها وأعد اختبار الحالة المعنية بعد الإصلاح. هذا أوضح من تكرار الإرسال حتى تصل رسالة بالمصادفة.",
        ] },
      ],
    },
  },
];

export function findArticle(slug?: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}

export function readingMinutes(copy: ArticleCopy, language: ArticleLanguage): number {
  const text = [copy.introduction, ...copy.sections.flatMap((s) => [s.heading, ...s.paragraphs, ...(s.bullets ?? []), ...(s.steps ?? [])])].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).length / (language === "ar" ? 180 : 220)));
}
