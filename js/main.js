/* ============================================
   BUENO STUDIO — main.js
   Language toggle + nav + interactions
   ============================================ */

// ============================================
// TRANSLATIONS
// ============================================
const translations = {
  es: {
    nav: {
      services: "Servicios",
      portfolio: "Trabajos",
      about: "Nosotros",
      contact: "Contacto",
      cta: "Hablemos"
    },
    hero: {
      tag: "Argentina · Canadá",
      headline: "Llevamos tu negocio<br>al mundo digital.",
      sub: "Diseño web profesional para negocios y profesionales que quieren vender más online.",
      cta1: "Hablemos por WhatsApp",
      cta2: "Ver trabajos"
    },
    services: {
      title: "Servicios",
      sub: "Todo lo que necesitás para tener presencia digital y vender más.",
      items: [
        { title: "Landing Pages", desc: "Páginas diseñadas para convertir visitas en clientes." },
        { title: "Catálogos Online", desc: "Mostrá tus productos de forma clara y profesional." },
        { title: "Portfolios", desc: "Tu mejor trabajo, presentado para que te elijan." },
        { title: "Sitios Web", desc: "Presencia online completa para tu negocio." },
        { title: "Tiendas Online", desc: "Empezá a vender en internet sin complicaciones." }
      ]
    },
    portfolio: {
      title: "Trabajos",
      sub: "Proyectos reales para negocios reales.",
      viewProject: "Ver proyecto →",
      projects: [
        {
          name: "Juvetotecno",
          category: "Tienda Online",
          desc: "Tienda online de accesorios para celulares: fundas, vidrios templados, coleccionables y más, con envíos a todo el país."
        },
        {
          name: "Candelaria Ferreyro",
          category: "Catálogo de Servicios",
          desc: "Presentación profesional de servicios contables para captar clientes online."
        },
        {
          name: "Quinta El Paraíso",
          category: "Sitio Web",
          desc: "Sitio web completo para espacio de eventos, con galería y contacto directo."
        },
        {
          name: "Vancouver Pet Services",
          category: "Plataforma Web",
          desc: "Directorio online de servicios para mascotas en Vancouver, BC — paseadores, peluquerías y cuidadores, organizados por barrio."
        }
      ]
    },
    about: {
      title: "Bueno Studio",
      body: "Ayudamos a negocios y profesionales a dar el salto digital. Nos especializamos en soluciones web prácticas, rápidas de implementar y orientadas a resultados — más ventas, más clientes, más presencia.",
      body2: "Operamos en Argentina y Canadá, entendiendo las necesidades de cada mercado.",
      tagline: '"Del mundo analógico al digital, sin complicaciones."'
    },
    contact: {
      title: "¿Listo para empezar?",
      sub: "Contanos sobre tu proyecto y te respondemos rápido.",
      whatsapp: "Escribinos por WhatsApp",
      email: "Mandanos un email",
      note: "Argentina · Canadá"
    },
    footer: {
      copy: "© 2026 Bueno Studio. Todos los derechos reservados."
    }
  },

  en: {
    nav: {
      services: "Services",
      portfolio: "Work",
      about: "About",
      contact: "Contact",
      cta: "Let's Talk"
    },
    hero: {
      tag: "Argentina · Canada",
      headline: "We bring your business<br>online. Ready to sell.",
      sub: "Professional web design for businesses and professionals who want to grow their online presence.",
      cta1: "Contact via WhatsApp",
      cta2: "See our work"
    },
    services: {
      title: "Services",
      sub: "Everything you need to establish your digital presence and sell more.",
      items: [
        { title: "Landing Pages", desc: "Pages designed to turn visitors into clients." },
        { title: "Online Catalogs", desc: "Showcase your products clearly and professionally." },
        { title: "Portfolios", desc: "Your best work, presented to get you hired." },
        { title: "Websites", desc: "Complete online presence for your business." },
        { title: "Online Stores", desc: "Start selling online without the complexity." }
      ]
    },
    portfolio: {
      title: "Work",
      sub: "Real projects for real businesses.",
      viewProject: "View project →",
      projects: [
        {
          name: "Juvetotecno",
          category: "Online Store",
          desc: "Online store for phone accessories: cases, tempered glass, collectibles, and more, with nationwide shipping."
        },
        {
          name: "Candelaria Ferreyro",
          category: "Services Catalog",
          desc: "Professional presentation of accounting services to attract clients online."
        },
        {
          name: "Quinta El Paraíso",
          category: "Website",
          desc: "Full website for an events venue, with gallery and direct contact."
        },
        {
          name: "Vancouver Pet Services",
          category: "Web Platform",
          desc: "Online directory connecting pet owners in Vancouver, BC with trusted dog walkers, groomers, and sitters by neighbourhood."
        }
      ]
    },
    about: {
      title: "Bueno Studio",
      body: "We help businesses and professionals make the leap into the digital world. We specialize in practical web solutions that are fast to implement and results-driven — more sales, more clients, more presence.",
      body2: "We operate in Argentina and Canada, understanding the needs of each market.",
      tagline: '"From analog to digital, without the complexity."'
    },
    contact: {
      title: "Ready to start?",
      sub: "Tell us about your project and we'll get back to you quickly.",
      whatsapp: "Contact via WhatsApp",
      email: "Send us an email",
      note: "Argentina · Canada"
    },
    footer: {
      copy: "© 2026 Bueno Studio. All rights reserved."
    }
  }
};

// ============================================
// LANGUAGE TOGGLE
// ============================================
let currentLang = 'es';

function getNestedValue(obj, path) {
  return path.split('.').reduce(function(current, key) {
    return (current !== null && current !== undefined) ? current[key] : null;
  }, obj);
}

function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-key]').forEach(function(el) {
    const key = el.getAttribute('data-key');
    const value = getNestedValue(t, key);
    if (value === null || value === undefined) return;

    // Allow HTML in specific keys (headline)
    if (key.endsWith('.headline')) {
      el.innerHTML = value;
    } else {
      el.textContent = value;
    }
  });

  // Update html lang attribute
  document.documentElement.lang = lang;
}

function setLang(lang) {
  currentLang = lang;
  applyTranslations(lang);

  // Update toggle button states
  document.getElementById('btnEs').classList.toggle('active', lang === 'es');
  document.getElementById('btnEn').classList.toggle('active', lang === 'en');

  // Close mobile menu if open
  closeMobileMenu();
}

// ============================================
// NAV — Scroll shadow + mobile menu
// ============================================
var nav = document.getElementById('nav');
var hamburger = document.getElementById('hamburger');
var navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', function() {
  if (window.scrollY > 40) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', function() {
  var isOpen = navMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMobileMenu() {
  navMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', 'false');
}

// Close menu on nav link click
navMenu.querySelectorAll('.nav-link').forEach(function(link) {
  link.addEventListener('click', closeMobileMenu);
});

// ============================================
// INIT
// ============================================
applyTranslations('es');
