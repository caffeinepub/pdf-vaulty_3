export type LangCode = "en" | "ar" | "fr" | "es" | "hi" | "pt";

export const translations: Record<LangCode, Record<string, string>> = {
  en: {
    // Nav
    "nav.home": "Home",
    "nav.analytics": "Analytics",
    "nav.myFiles": "My Files",
    "nav.login": "Login",
    "nav.logout": "Logout",
    "nav.loggingIn": "Logging in...",

    // Hero
    "hero.title": "Your Complete PDF Vaulty",
    "hero.subtitle":
      "Merge, split, compress, and manage your PDF files with ease. All tools in one place.",
    "hero.cta": "Get Started",

    // Tools section
    "tools.heading": "Powerful PDF Tools",
    "tools.subheading": "Everything you need to work with PDF files",

    // Tool labels & descriptions
    "tool.merge.label": "Merge PDFs",
    "tool.merge.desc": "Combine multiple PDF files into a single document",
    "tool.split.label": "Split PDFs",
    "tool.split.desc":
      "Extract specific pages or split documents into separate files",
    "tool.compress.label": "Compress PDFs",
    "tool.compress.desc": "Reduce file size while maintaining quality",
    "tool.protect.label": "Protect PDFs",
    "tool.protect.desc":
      "Add or remove password protection from your documents",
    "tool.rotate.label": "Rotate PDFs",
    "tool.rotate.desc": "Rotate PDF pages by 90, 180, or 270 degrees",
    "tool.imageToPdf.label": "Convert into PDF",
    "tool.imageToPdf.desc": "Convert Word, Excel, and images to PDF",
    "tool.converter.label": "PDF Converter",
    "tool.converter.desc": "Convert PDF to Excel spreadsheet or JPG/PNG images",
    "tool.pageNumbers.label": "Add Page Numbers",
    "tool.pageNumbers.desc": "Stamp page numbers onto your PDF document",
    "tool.watermark.label": "Add Watermark",
    "tool.watermark.desc": "Overlay custom watermark text on your PDF",

    // Feature strip
    "feature.easy.title": "Easy to Use",
    "feature.easy.desc":
      "Simple and intuitive interface for all your PDF needs",
    "feature.secure.title": "Secure & Private",
    "feature.secure.desc": "Your files are processed securely and never shared",
    "feature.powerful.title": "Powerful Tools",
    "feature.powerful.desc": "Professional-grade PDF tools at your fingertips",

    // Footer
    "footer.rights": "All rights reserved.",
    "footer.tagline": "Built with love using",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "Your Complete PDF Vaulty",
    "login.subtitle":
      "Merge, split, compress, and manage your PDF files with ease. All tools in one place.",
    "login.button": "Login to Get Started",
    "login.feature1": "Merge & Split PDFs",
    "login.feature2": "Secure & Private",
    "login.feature3": "Professional Tools",

    // Common
    "common.upload": "Upload",
    "common.download": "Download",
    "common.processing": "Processing...",
    "common.back": "Back",
    "common.save": "Save",

    // Login CTA
    "login.cta": "Sign in to start using all PDF tools",
    "login.getStarted": "Get Started",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },

  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.analytics": "التحليلات",
    "nav.myFiles": "ملفاتي",
    "nav.login": "تسجيل الدخول",
    "nav.logout": "تسجيل الخروج",
    "nav.loggingIn": "جارٍ تسجيل الدخول...",

    // Hero
    "hero.title": "مخزن PDF الشامل الخاص بك",
    "hero.subtitle":
      "دمج وتقسيم وضغط وإدارة ملفات PDF بسهولة. جميع الأدوات في مكان واحد.",
    "hero.cta": "ابدأ الآن",

    // Tools section
    "tools.heading": "أدوات PDF قوية",
    "tools.subheading": "كل ما تحتاجه للعمل مع ملفات PDF",

    // Tool labels & descriptions
    "tool.merge.label": "دمج ملفات PDF",
    "tool.merge.desc": "دمج ملفات PDF متعددة في مستند واحد",
    "tool.split.label": "تقسيم ملفات PDF",
    "tool.split.desc":
      "استخراج صفحات محددة أو تقسيم المستندات إلى ملفات منفصلة",
    "tool.compress.label": "ضغط ملفات PDF",
    "tool.compress.desc": "تقليل حجم الملف مع الحفاظ على الجودة",
    "tool.protect.label": "حماية ملفات PDF",
    "tool.protect.desc": "إضافة أو إزالة حماية كلمة المرور من مستنداتك",
    "tool.rotate.label": "تدوير ملفات PDF",
    "tool.rotate.desc": "تدوير صفحات PDF بمقدار 90 أو 180 أو 270 درجة",
    "tool.imageToPdf.label": "تحويل إلى PDF",
    "tool.imageToPdf.desc": "تحويل Word و Excel والصور إلى PDF",
    "tool.converter.label": "محوّل PDF",
    "tool.converter.desc": "تحويل PDF إلى جدول بيانات Excel أو صور JPG/PNG",
    "tool.pageNumbers.label": "إضافة أرقام الصفحات",
    "tool.pageNumbers.desc": "ختم أرقام الصفحات على مستند PDF",
    "tool.watermark.label": "إضافة علامة مائية",
    "tool.watermark.desc": "تراكب نص العلامة المائية المخصص على PDF",

    // Feature strip
    "feature.easy.title": "سهل الاستخدام",
    "feature.easy.desc": "واجهة بسيطة وبديهية لجميع احتياجات PDF الخاصة بك",
    "feature.secure.title": "آمن وخاص",
    "feature.secure.desc": "تتم معالجة ملفاتك بأمان ولا تتم مشاركتها أبداً",
    "feature.powerful.title": "أدوات قوية",
    "feature.powerful.desc": "أدوات PDF احترافية في متناول يدك",

    // Footer
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.tagline": "تم البناء بحب باستخدام",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "مخزن PDF الشامل الخاص بك",
    "login.subtitle":
      "دمج وتقسيم وضغط وإدارة ملفات PDF بسهولة. جميع الأدوات في مكان واحد.",
    "login.button": "تسجيل الدخول للبدء",
    "login.feature1": "دمج وتقسيم ملفات PDF",
    "login.feature2": "آمن وخاص",
    "login.feature3": "أدوات احترافية",

    // Common
    "common.upload": "رفع",
    "common.download": "تنزيل",
    "common.processing": "جارٍ المعالجة...",
    "common.back": "رجوع",
    "common.save": "حفظ",

    // Login CTA
    "login.cta": "سجّل الدخول لبدء استخدام جميع أدوات PDF",
    "login.getStarted": "ابدأ الآن",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },

  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.analytics": "Analytique",
    "nav.myFiles": "Mes Fichiers",
    "nav.login": "Connexion",
    "nav.logout": "Déconnexion",
    "nav.loggingIn": "Connexion en cours...",

    // Hero
    "hero.title": "Votre PDF Vaulty Complet",
    "hero.subtitle":
      "Fusionnez, divisez, compressez et gérez vos fichiers PDF facilement. Tous les outils en un seul endroit.",
    "hero.cta": "Commencer",

    // Tools section
    "tools.heading": "Outils PDF Puissants",
    "tools.subheading":
      "Tout ce dont vous avez besoin pour travailler avec des fichiers PDF",

    // Tool labels & descriptions
    "tool.merge.label": "Fusionner des PDF",
    "tool.merge.desc": "Combiner plusieurs fichiers PDF en un seul document",
    "tool.split.label": "Diviser des PDF",
    "tool.split.desc":
      "Extraire des pages spécifiques ou diviser des documents en fichiers séparés",
    "tool.compress.label": "Compresser des PDF",
    "tool.compress.desc":
      "Réduire la taille du fichier tout en maintenant la qualité",
    "tool.protect.label": "Protéger des PDF",
    "tool.protect.desc":
      "Ajouter ou supprimer la protection par mot de passe de vos documents",
    "tool.rotate.label": "Faire pivoter des PDF",
    "tool.rotate.desc": "Faire pivoter les pages PDF de 90, 180 ou 270 degrés",
    "tool.imageToPdf.label": "Convertir en PDF",
    "tool.imageToPdf.desc": "Convertir Word, Excel et images en PDF",
    "tool.converter.label": "Convertisseur PDF",
    "tool.converter.desc": "Convertir PDF en tableur Excel ou images JPG/PNG",
    "tool.pageNumbers.label": "Ajouter des numéros de page",
    "tool.pageNumbers.desc":
      "Tamponner des numéros de page sur votre document PDF",
    "tool.watermark.label": "Ajouter un filigrane",
    "tool.watermark.desc":
      "Superposer un texte de filigrane personnalisé sur votre PDF",

    // Feature strip
    "feature.easy.title": "Facile à utiliser",
    "feature.easy.desc":
      "Interface simple et intuitive pour tous vos besoins PDF",
    "feature.secure.title": "Sécurisé & Privé",
    "feature.secure.desc":
      "Vos fichiers sont traités en toute sécurité et ne sont jamais partagés",
    "feature.powerful.title": "Outils Puissants",
    "feature.powerful.desc":
      "Outils PDF de qualité professionnelle à portée de main",

    // Footer
    "footer.rights": "Tous droits réservés.",
    "footer.tagline": "Construit avec amour en utilisant",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "Votre PDF Vaulty Complet",
    "login.subtitle":
      "Fusionnez, divisez, compressez et gérez vos fichiers PDF facilement. Tous les outils en un seul endroit.",
    "login.button": "Se connecter pour commencer",
    "login.feature1": "Fusionner et diviser des PDF",
    "login.feature2": "Sécurisé et Privé",
    "login.feature3": "Outils Professionnels",

    // Common
    "common.upload": "Télécharger",
    "common.download": "Télécharger",
    "common.processing": "Traitement en cours...",
    "common.back": "Retour",
    "common.save": "Enregistrer",

    // Login CTA
    "login.cta": "Connectez-vous pour commencer à utiliser tous les outils PDF",
    "login.getStarted": "Commencer",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },

  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.analytics": "Analítica",
    "nav.myFiles": "Mis Archivos",
    "nav.login": "Iniciar sesión",
    "nav.logout": "Cerrar sesión",
    "nav.loggingIn": "Iniciando sesión...",

    // Hero
    "hero.title": "Tu PDF Vaulty Completo",
    "hero.subtitle":
      "Fusiona, divide, comprime y administra tus archivos PDF con facilidad. Todas las herramientas en un solo lugar.",
    "hero.cta": "Comenzar",

    // Tools section
    "tools.heading": "Herramientas PDF Potentes",
    "tools.subheading": "Todo lo que necesitas para trabajar con archivos PDF",

    // Tool labels & descriptions
    "tool.merge.label": "Fusionar PDFs",
    "tool.merge.desc": "Combinar múltiples archivos PDF en un solo documento",
    "tool.split.label": "Dividir PDFs",
    "tool.split.desc":
      "Extraer páginas específicas o dividir documentos en archivos separados",
    "tool.compress.label": "Comprimir PDFs",
    "tool.compress.desc":
      "Reducir el tamaño del archivo manteniendo la calidad",
    "tool.protect.label": "Proteger PDFs",
    "tool.protect.desc":
      "Añadir o eliminar protección con contraseña de tus documentos",
    "tool.rotate.label": "Rotar PDFs",
    "tool.rotate.desc": "Rotar páginas PDF 90, 180 o 270 grados",
    "tool.imageToPdf.label": "Convertir a PDF",
    "tool.imageToPdf.desc": "Convertir Word, Excel e imágenes a PDF",
    "tool.converter.label": "Convertidor PDF",
    "tool.converter.desc":
      "Convertir PDF a hoja de cálculo Excel o imágenes JPG/PNG",
    "tool.pageNumbers.label": "Añadir Números de Página",
    "tool.pageNumbers.desc": "Estampar números de página en tu documento PDF",
    "tool.watermark.label": "Añadir Marca de Agua",
    "tool.watermark.desc":
      "Superponer texto de marca de agua personalizado en tu PDF",

    // Feature strip
    "feature.easy.title": "Fácil de usar",
    "feature.easy.desc":
      "Interfaz simple e intuitiva para todas tus necesidades PDF",
    "feature.secure.title": "Seguro y Privado",
    "feature.secure.desc":
      "Tus archivos se procesan de forma segura y nunca se comparten",
    "feature.powerful.title": "Herramientas Potentes",
    "feature.powerful.desc":
      "Herramientas PDF de grado profesional a tu alcance",

    // Footer
    "footer.rights": "Todos los derechos reservados.",
    "footer.tagline": "Construido con amor usando",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "Tu PDF Vaulty Completo",
    "login.subtitle":
      "Fusiona, divide, comprime y administra tus archivos PDF con facilidad. Todas las herramientas en un solo lugar.",
    "login.button": "Iniciar sesión para comenzar",
    "login.feature1": "Fusionar y dividir PDFs",
    "login.feature2": "Seguro y Privado",
    "login.feature3": "Herramientas Profesionales",

    // Common
    "common.upload": "Subir",
    "common.download": "Descargar",
    "common.processing": "Procesando...",
    "common.back": "Atrás",
    "common.save": "Guardar",

    // Login CTA
    "login.cta": "Inicia sesión para empezar a usar todas las herramientas PDF",
    "login.getStarted": "Comenzar",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },

  hi: {
    // Nav
    "nav.home": "होम",
    "nav.analytics": "एनालिटिक्स",
    "nav.myFiles": "मेरी फ़ाइलें",
    "nav.login": "लॉगिन",
    "nav.logout": "लॉगआउट",
    "nav.loggingIn": "लॉगिन हो रहा है...",

    // Hero
    "hero.title": "आपका संपूर्ण PDF Vaulty",
    "hero.subtitle":
      "अपनी PDF फ़ाइलों को आसानी से मर्ज, स्प्लिट, कम्प्रेस और प्रबंधित करें। सभी टूल एक जगह।",
    "hero.cta": "शुरू करें",

    // Tools section
    "tools.heading": "शक्तिशाली PDF टूल",
    "tools.subheading": "PDF फ़ाइलों के साथ काम करने के लिए आपको जो कुछ भी चाहिए",

    // Tool labels & descriptions
    "tool.merge.label": "PDF मर्ज करें",
    "tool.merge.desc": "कई PDF फ़ाइलों को एक दस्तावेज़ में मिलाएं",
    "tool.split.label": "PDF विभाजित करें",
    "tool.split.desc": "विशिष्ट पृष्ठ निकालें या दस्तावेज़ों को अलग फ़ाइलों में विभाजित करें",
    "tool.compress.label": "PDF कम्प्रेस करें",
    "tool.compress.desc": "गुणवत्ता बनाए रखते हुए फ़ाइल का आकार कम करें",
    "tool.protect.label": "PDF सुरक्षित करें",
    "tool.protect.desc": "अपने दस्तावेज़ों में पासवर्ड सुरक्षा जोड़ें या हटाएं",
    "tool.rotate.label": "PDF घुमाएं",
    "tool.rotate.desc": "PDF पृष्ठों को 90, 180 या 270 डिग्री घुमाएं",
    "tool.imageToPdf.label": "PDF में बदलें",
    "tool.imageToPdf.desc": "Word, Excel और छवियों को PDF में बदलें",
    "tool.converter.label": "PDF कनवर्टर",
    "tool.converter.desc": "PDF को Excel स्प्रेडशीट या JPG/PNG छवियों में बदलें",
    "tool.pageNumbers.label": "पृष्ठ संख्या जोड़ें",
    "tool.pageNumbers.desc": "अपने PDF दस्तावेज़ पर पृष्ठ संख्या मुद्रित करें",
    "tool.watermark.label": "वाटरमार्क जोड़ें",
    "tool.watermark.desc": "अपने PDF पर कस्टम वाटरमार्क टेक्स्ट ओवरले करें",

    // Feature strip
    "feature.easy.title": "उपयोग में आसान",
    "feature.easy.desc": "आपकी सभी PDF ज़रूरतों के लिए सरल और सहज इंटरफेस",
    "feature.secure.title": "सुरक्षित और निजी",
    "feature.secure.desc":
      "आपकी फ़ाइलें सुरक्षित रूप से प्रोसेस की जाती हैं और कभी साझा नहीं की जातीं",
    "feature.powerful.title": "शक्तिशाली टूल",
    "feature.powerful.desc": "पेशेवर-ग्रेड PDF टूल आपकी उंगलियों पर",

    // Footer
    "footer.rights": "सर्वाधिकार सुरक्षित।",
    "footer.tagline": "प्यार के साथ बनाया गया",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "आपका संपूर्ण PDF Vaulty",
    "login.subtitle":
      "अपनी PDF फ़ाइलों को आसानी से मर्ज, स्प्लिट, कम्प्रेस और प्रबंधित करें। सभी टूल एक जगह।",
    "login.button": "शुरू करने के लिए लॉगिन करें",
    "login.feature1": "PDF मर्ज और स्प्लिट",
    "login.feature2": "सुरक्षित और निजी",
    "login.feature3": "पेशेवर टूल",

    // Common
    "common.upload": "अपलोड",
    "common.download": "डाउनलोड",
    "common.processing": "प्रोसेसिंग...",
    "common.back": "वापस",
    "common.save": "सहेजें",

    // Login CTA
    "login.cta": "सभी PDF टूल का उपयोग शुरू करने के लिए साइन इन करें",
    "login.getStarted": "शुरू करें",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },

  pt: {
    // Nav
    "nav.home": "Início",
    "nav.analytics": "Análise",
    "nav.myFiles": "Meus Arquivos",
    "nav.login": "Entrar",
    "nav.logout": "Sair",
    "nav.loggingIn": "Entrando...",

    // Hero
    "hero.title": "Seu PDF Vaulty Completo",
    "hero.subtitle":
      "Mescle, divida, comprima e gerencie seus arquivos PDF com facilidade. Todas as ferramentas em um só lugar.",
    "hero.cta": "Começar",

    // Tools section
    "tools.heading": "Ferramentas PDF Poderosas",
    "tools.subheading": "Tudo que você precisa para trabalhar com arquivos PDF",

    // Tool labels & descriptions
    "tool.merge.label": "Mesclar PDFs",
    "tool.merge.desc": "Combinar múltiplos arquivos PDF em um único documento",
    "tool.split.label": "Dividir PDFs",
    "tool.split.desc":
      "Extrair páginas específicas ou dividir documentos em arquivos separados",
    "tool.compress.label": "Comprimir PDFs",
    "tool.compress.desc": "Reduzir o tamanho do arquivo mantendo a qualidade",
    "tool.protect.label": "Proteger PDFs",
    "tool.protect.desc":
      "Adicionar ou remover proteção por senha dos seus documentos",
    "tool.rotate.label": "Girar PDFs",
    "tool.rotate.desc": "Girar páginas PDF em 90, 180 ou 270 graus",
    "tool.imageToPdf.label": "Converter para PDF",
    "tool.imageToPdf.desc": "Converter Word, Excel e imagens para PDF",
    "tool.converter.label": "Conversor PDF",
    "tool.converter.desc":
      "Converter PDF para planilha Excel ou imagens JPG/PNG",
    "tool.pageNumbers.label": "Adicionar Números de Página",
    "tool.pageNumbers.desc": "Carimbar números de página no seu documento PDF",
    "tool.watermark.label": "Adicionar Marca d'Água",
    "tool.watermark.desc":
      "Sobrepor texto de marca d'água personalizado no seu PDF",

    // Feature strip
    "feature.easy.title": "Fácil de usar",
    "feature.easy.desc":
      "Interface simples e intuitiva para todas as suas necessidades de PDF",
    "feature.secure.title": "Seguro e Privado",
    "feature.secure.desc":
      "Seus arquivos são processados com segurança e nunca compartilhados",
    "feature.powerful.title": "Ferramentas Poderosas",
    "feature.powerful.desc":
      "Ferramentas PDF de nível profissional ao seu alcance",

    // Footer
    "footer.rights": "Todos os direitos reservados.",
    "footer.tagline": "Construído com amor usando",

    // Language names
    "lang.en": "English",
    "lang.ar": "العربية",
    "lang.fr": "Français",
    "lang.es": "Español",
    "lang.hi": "हिन्दी",
    "lang.pt": "Português",

    // Login page
    "login.title": "Seu PDF Vaulty Completo",
    "login.subtitle":
      "Mescle, divida, comprima e gerencie seus arquivos PDF com facilidade. Todas as ferramentas em um só lugar.",
    "login.button": "Entrar para começar",
    "login.feature1": "Mesclar e dividir PDFs",
    "login.feature2": "Seguro e Privado",
    "login.feature3": "Ferramentas Profissionais",

    // Common
    "common.upload": "Enviar",
    "common.download": "Baixar",
    "common.processing": "Processando...",
    "common.back": "Voltar",
    "common.save": "Salvar",

    // Login CTA
    "login.cta": "Entre para começar a usar todas as ferramentas PDF",
    "login.getStarted": "Começar",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Everything you need to know about PDF Vaulty",
    "faq.q1": "Is PDF Vaulty free to use?",
    "faq.a1":
      "Yes, PDF Vaulty is completely free. All PDF tools are available at no cost — no subscriptions, no hidden fees.",
    "faq.q2": "Are my PDF files safe and private?",
    "faq.a2":
      "Your files are processed entirely in your browser and on the Internet Computer blockchain. We never store or share your documents without your permission.",
    "faq.q3": "Do I need to create an account?",
    "faq.a3":
      "No account is needed to use most tools. Login with Internet Identity is optional and unlocks the My Files feature for saving your work.",
    "faq.q4": "What file size can I upload?",
    "faq.a4":
      "PDF Vaulty supports most standard PDF files. For best results, use files under 50MB.",
    "faq.q5": "Can I use PDF Vaulty on mobile?",
    "faq.a5":
      "Yes, PDF Vaulty is fully responsive and works on smartphones and tablets as well as desktops.",
    "faq.q6": "How do I merge multiple PDFs?",
    "faq.a6":
      "Click the Merge PDF tool, upload two or more PDF files, then click the Merge button. Your combined PDF will download automatically.",
    "faq.q7": "Does PDF Vaulty work offline?",
    "faq.a7":
      "PDF Vaulty requires an internet connection to load, but all PDF processing happens locally in your browser — your files never leave your device.",
    "faq.q8": "What formats can I convert PDFs to?",
    "faq.a8":
      "Using the PDF Converter tool, you can export PDFs as Excel spreadsheets (.xlsx) or as images in JPG or PNG format.",
  },
};
