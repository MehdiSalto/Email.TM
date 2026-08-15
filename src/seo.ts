import type { LanguageCode } from "./types";

interface SeoData {
  title: string;
  description: string;
}

const seo: Record<string, Record<LanguageCode, SeoData>> = {
  home: {
    en: {
      title: "Email Time — Free Temporary Email",
      description:
        "Create a free temporary email address without registration or login and receive emails for a limited time.",
    },
    ar: {
      title: "إيميل تايم — بريد إلكتروني مؤقت مجاني",
      description:
        "أنشئ عنوان بريد إلكتروني مؤقتًا مجانًا بدون تسجيل أو دخول واستقبل الرسائل لفترة محدودة.",
    },
    es: {
      title: "Email Time — Correo Temporal Gratis",
      description:
        "Crea una dirección de correo temporal gratis sin registro ni inicio de sesión y recibe correos durante un tiempo limitado.",
    },
    pt: {
      title: "Email Time — Email Temporário Grátis",
      description:
        "Crie um endereço de email temporário grátis sem cadastro ou login e receba emails por tempo limitado.",
    },
    fr: {
      title: "Email Time — Email Temporaire Gratuit",
      description:
        "Créez une adresse email temporaire gratuite sans inscription ni connexion et recevez des emails pendant une durée limitée.",
    },
  },

  about: {
    en: {
      title: "About Email Time — Temporary Email Service",
      description:
        "Learn what Email Time is, how temporary email works, and when a disposable email address can be useful.",
    },
    ar: {
      title: "عن إيميل تايم — خدمة البريد المؤقت",
      description:
        "تعرف على إيميل تايم وكيف يعمل البريد الإلكتروني المؤقت ومتى يمكن أن يكون مفيدًا.",
    },
    es: {
      title: "Sobre Email Time — Servicio de Correo Temporal",
      description:
        "Conoce Email Time, cómo funciona el correo temporal y cuándo puede ser útil una dirección desechable.",
    },
    pt: {
      title: "Sobre o Email Time — Serviço de Email Temporário",
      description:
        "Saiba o que é o Email Time, como funciona o email temporário e quando um endereço descartável pode ser útil.",
    },
    fr: {
      title: "À propos d'Email Time — Service d'Email Temporaire",
      description:
        "Découvrez Email Time, le fonctionnement des emails temporaires et les situations où une adresse jetable peut être utile.",
    },
  },

  contact: {
    en: {
      title: "Contact Email Time",
      description:
        "Find information about contacting Email Time for questions, support, or service issues.",
    },
    ar: {
      title: "اتصل بإيميل تايم",
      description:
        "تعرف على طرق التواصل مع إيميل تايم لطرح الأسئلة أو طلب المساعدة أو الإبلاغ عن مشاكل الخدمة.",
    },
    es: {
      title: "Contacta con Email Time",
      description:
        "Información para contactar con Email Time sobre preguntas, asistencia o problemas del servicio.",
    },
    pt: {
      title: "Contacte o Email Time",
      description:
        "Informações para contactar o Email Time sobre dúvidas, suporte ou problemas com o serviço.",
    },
    fr: {
      title: "Contacter Email Time",
      description:
        "Informations pour contacter Email Time concernant vos questions, l'assistance ou les problèmes du service.",
    },
  },

  privacy: {
    en: {
      title: "Privacy Policy — Email Time",
      description:
        "Read the Email Time Privacy Policy and learn how temporary email addresses, inbox messages, and device data are handled.",
    },
    ar: {
      title: "سياسة الخصوصية — إيميل تايم",
      description:
        "اقرأ سياسة خصوصية إيميل تايم وتعرف على كيفية التعامل مع عناوين البريد المؤقت والرسائل وبيانات الجهاز.",
    },
    es: {
      title: "Política de Privacidad — Email Time",
      description:
        "Consulta la política de privacidad de Email Time y cómo se gestionan los correos temporales, mensajes y datos del dispositivo.",
    },
    pt: {
      title: "Política de Privacidade — Email Time",
      description:
        "Leia a política de privacidade do Email Time e saiba como são tratados os emails temporários, mensagens e dados do dispositivo.",
    },
    fr: {
      title: "Politique de Confidentialité — Email Time",
      description:
        "Consultez la politique de confidentialité d'Email Time et découvrez comment sont traités les emails temporaires, messages et données de l'appareil.",
    },
  },

  terms: {
    en: {
      title: "Terms of Service — Email Time",
      description:
        "Read the Email Time Terms of Service, including acceptable use, limitations, shared inbox links, and service availability.",
    },
    ar: {
      title: "شروط الاستخدام — إيميل تايم",
      description:
        "اقرأ شروط استخدام إيميل تايم، بما في ذلك الاستخدام المقبول والقيود وروابط صناديق الوارد وتوفر الخدمة.",
    },
    es: {
      title: "Términos de Servicio — Email Time",
      description:
        "Consulta los términos de servicio de Email Time, incluido el uso permitido, las limitaciones y la disponibilidad.",
    },
    pt: {
      title: "Termos de Serviço — Email Time",
      description:
        "Leia os termos de serviço do Email Time, incluindo uso aceitável, limitações e disponibilidade do serviço.",
    },
    fr: {
      title: "Conditions d'Utilisation — Email Time",
      description:
        "Consultez les conditions d'utilisation d'Email Time, notamment l'utilisation acceptable, les limitations et la disponibilité du service.",
    },
  },

  faq: {
    en: {
      title: "Temporary Email FAQ — Email Time",
      description:
        "Get answers to common questions about temporary email addresses, inboxes, expiration, messages, and sharing.",
    },
    ar: {
      title: "الأسئلة الشائعة حول البريد المؤقت — إيميل تايم",
      description:
        "اعثر على إجابات لأهم الأسئلة حول البريد الإلكتروني المؤقت وصندوق الوارد وانتهاء الصلاحية والرسائل والمشاركة.",
    },
    es: {
      title: "Preguntas Frecuentes sobre Correo Temporal — Email Time",
      description:
        "Respuestas a preguntas frecuentes sobre correos temporales, bandejas de entrada, expiración, mensajes y enlaces compartidos.",
    },
    pt: {
      title: "FAQ sobre Email Temporário — Email Time",
      description:
        "Encontre respostas para perguntas comuns sobre emails temporários, caixas de entrada, expiração, mensagens e partilha.",
    },
    fr: {
      title: "FAQ sur les Emails Temporaires — Email Time",
      description:
        "Trouvez les réponses aux questions fréquentes sur les emails temporaires, les boîtes de réception, l'expiration et le partage.",
    },
  },

  howItWorks: {
    en: {
      title: "How Temporary Email Works — Email Time",
      description:
        "Learn how to create a temporary email address, receive messages, use the inbox, and understand email expiration.",
    },
    ar: {
      title: "كيف يعمل البريد الإلكتروني المؤقت — إيميل تايم",
      description:
        "تعرف على كيفية إنشاء بريد إلكتروني مؤقت واستقبال الرسائل واستخدام صندوق الوارد وفهم انتهاء الصلاحية.",
    },
    es: {
      title: "Cómo Funciona el Correo Temporal — Email Time",
      description:
        "Aprende a crear un correo temporal, recibir mensajes, usar la bandeja de entrada y entender la expiración.",
    },
    pt: {
      title: "Como Funciona o Email Temporário — Email Time",
      description:
        "Saiba como criar um email temporário, receber mensagens, usar a caixa de entrada e entender a expiração.",
    },
    fr: {
      title: "Comment Fonctionne l'Email Temporaire — Email Time",
      description:
        "Découvrez comment créer un email temporaire, recevoir des messages, utiliser la boîte de réception et comprendre l'expiration.",
    },
  },

  whatIsTemporaryEmail: {
    en: {
      title: "What Is Temporary Email? — Email Time",
      description:
        "Learn what temporary email is, how it differs from regular email, its legitimate uses, benefits, and limitations.",
    },
    ar: {
      title: "ما هو البريد الإلكتروني المؤقت؟ — إيميل تايم",
      description:
        "تعرف على البريد الإلكتروني المؤقت والفرق بينه وبين البريد العادي واستخداماته وفوائده وحدوده.",
    },
    es: {
      title: "¿Qué es un Correo Temporal? — Email Time",
      description:
        "Descubre qué es un correo temporal, cómo se diferencia del correo normal, sus usos legítimos y sus limitaciones.",
    },
    pt: {
      title: "O Que é um Email Temporário? — Email Time",
      description:
        "Saiba o que é um email temporário, como difere do email normal, os seus usos legítimos, benefícios e limitações.",
    },
    fr: {
      title: "Qu'est-ce qu'un Email Temporaire ? — Email Time",
      description:
        "Découvrez ce qu'est un email temporaire, ses différences avec un email classique, ses usages légitimes et ses limites.",
    },
  },

  guides: {
    en: {
      title: "Temporary Email Guides — Email Time",
      description:
        "Practical guides about temporary email, protecting your primary inbox, email expiration, and choosing the right use cases.",
    },
    ar: {
      title: "دليل البريد الإلكتروني المؤقت — إيميل تايم",
      description:
        "أدلة عملية حول البريد الإلكتروني المؤقت وحماية بريدك الأساسي وانتهاء الصلاحية واختيار الاستخدام المناسب.",
    },
    es: {
      title: "Guías sobre Correo Temporal — Email Time",
      description:
        "Guías prácticas sobre correo temporal, protección de tu bandeja principal, expiración y usos adecuados.",
    },
    pt: {
      title: "Guias de Email Temporário — Email Time",
      description:
        "Guias práticos sobre email temporário, proteção da sua caixa principal, expiração e usos adequados.",
    },
    fr: {
      title: "Guides sur les Emails Temporaires — Email Time",
      description:
        "Guides pratiques sur les emails temporaires, la protection de votre boîte principale, l'expiration et les usages appropriés.",
    },
  },
};

export function updateSeo(page: string, lang: LanguageCode) {
  const data = seo[page]?.[lang] ?? seo.home.en;

  document.title = data.title;

  const setMeta = (selector: string, content: string) => {
    const element = document.querySelector<HTMLMetaElement>(selector);
    if (element) {
      element.content = content;
    }
  };

  setMeta('meta[name="description"]', data.description);
  setMeta('meta[property="og:title"]', data.title);
  setMeta('meta[property="og:description"]', data.description);
  setMeta('meta[name="twitter:title"]', data.title);
  setMeta('meta[name="twitter:description"]', data.description);
}
