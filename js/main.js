/* ==========================================================================
   Chongyi Automobile Co., Limited — Global runtime
   The only script in the project. Every page loads it with:
     <script src="js/main.js" defer></script>
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     0. DEPLOYMENT BASE PATH
     Captured from this script's own URL. Root-absolute links such as
     "/services.html" break when the site is served from a sub-path
     (GitHub Pages at /chongyiqc.com/), so every such link is rebased at
     runtime. At the domain root BASE_PATH is "/" and nothing changes.
     ------------------------------------------------------------------ */
  var BASE_PATH = (function () {
    try {
      var src = document.currentScript && document.currentScript.src;
      if (!src) return '/';
      var path = new URL(src, window.location.href).pathname.replace(/\/js\/main\.js$/, '');
      return path === '' ? '/' : path;
    } catch (e) {
      return '/';
    }
  })();

  /* ------------------------------------------------------------------
     0.1 SITE FACTS — single source of truth for the whole site
     ------------------------------------------------------------------ */
  var SITE = {
    name: 'Chongyi Automobile Co., Limited',
    shortName: 'Chongyi Automobile',
    address: 'RM 29-33 5/F, BEVERLEY COMM CTR, 87-105 CHATHAM RD, TSIM SHA TSUI, HONG KONG',
    website: 'chongyiqc.com',
    url: 'https://chongyiqc.com',
    emailSupport: 'support@chongyiqc.com',
    emailAccount: 'liyunhan@chongyiqc.com',
    scope:
      'Wholesale and retail of auto parts and car supplies; automobile information consultation; ' +
      'business consultation; import and export of goods and technology; supply chain management; ' +
      'general trade (excluding regulated businesses such as finance, insurance and lending)'
  };

  var NAV = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/services.html', label: 'Services', key: 'services' },
    { href: '/culture.html', label: 'Culture', key: 'culture' },
    { href: '/news.html', label: 'News', key: 'news' },
    { href: '/contact.html', label: 'Contact', key: 'contact' }
  ];

  /* ------------------------------------------------------------------
     1. SEO CONFIG  [reuse-F]
     ------------------------------------------------------------------ */
  var SEO = {
    '/': {
      title: 'Chongyi Automobile Co., Limited — Auto Parts Wholesale & Retail in Hong Kong',
      description:
        'Chongyi Automobile Co., Limited is a Hong Kong based auto parts and car supplies wholesaler and retailer, ' +
        'covering import and export of goods and technology, supply chain management and business consultation, ' +
        'with a mobile management app for Google Play and the Apple App Store.',
      og: 'Chongyi Automobile — auto parts, trade and supply chain, moved with precision.'
    },
    '/services.html': {
      title: 'Services — Chongyi Automobile Co., Limited',
      description:
        'Auto parts and car supplies wholesale and retail, automobile information consultation, business consultation, ' +
        'import and export of goods and technology, supply chain management and general trade — plus the Chongyi ' +
        'mobile management app.',
      og: 'Six core business lines and one mobile management app.'
    },
    '/culture.html': {
      title: 'Culture & Milestones — Chongyi Automobile Co., Limited',
      description:
        'The mission, vision and values behind Chongyi Automobile Co., Limited: precision in auto parts trade, ' +
        'transparent supply chains and long-term partnerships from Hong Kong.',
      og: 'How we work: precision, transparency, partnership.'
    },
    '/news.html': {
      title: 'News & Insights — Chongyi Automobile Co., Limited',
      description:
        'Company announcements, trade and supply chain insights, product updates and compliance notes from ' +
        'Chongyi Automobile Co., Limited.',
      og: 'Trade news, product updates and company announcements.'
    },
    '/contact.html': {
      title: 'Contact — Chongyi Automobile Co., Limited',
      description:
        'Contact Chongyi Automobile Co., Limited for auto parts wholesale and retail, trade consultation and ' +
        'supply chain enquiries. Office: Tsim Sha Tsui, Hong Kong.',
      og: 'Talk to the Chongyi team.'
    },
    '/privacy.html': {
      title: 'Privacy Policy — Chongyi Automobile Co., Limited',
      description:
        'How Chongyi Automobile Co., Limited collects, uses, shares and protects personal data across its website, ' +
        'mobile management app and advertising partners, including GDPR, UK GDPR, CCPA/CPRA, LGPD, PIPEDA and APPI rights.',
      og: 'Privacy policy for the Chongyi website and mobile management app.'
    },
    '/terms.html': {
      title: 'Terms of Service — Chongyi Automobile Co., Limited',
      description:
        'The terms governing use of the Chongyi Automobile Co., Limited website, mobile management app and related ' +
        'services, including purchase, subscription, advertising, third-party service and Hong Kong governing law provisions.',
      og: 'Terms of service for the Chongyi website and mobile management app.'
    }
  };

  /* ------------------------------------------------------------------
     2. SMALL UTILITIES
     ------------------------------------------------------------------ */
  function $(selector, scope) { return (scope || document).querySelector(selector); }
  function $$(selector, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(selector)); }

  function icon(id, className) {
    return '<svg class="' + (className || 'icon') + '" aria-hidden="true"><use href="#' + id + '"></use></svg>';
  }

  function esc(value) {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function currentKey() {
    var path = window.location.pathname || '/';
    var last = path.substring(path.lastIndexOf('/') + 1);
    if (!last || last === 'index.html' || last === '') return '/';
    return '/' + last;
  }

  /* ------------------------------------------------------------------
     3. SHARED HEADER  [reuse-C]
     ------------------------------------------------------------------ */
  function buildHeader() {
    var host = $('#site-header');
    if (!host) return;

    var key = currentKey();
    var links = NAV.map(function (item) {
      var active = item.href === key || (item.href === '/' && (key === '/index.html'));
      return (
        '<li><a class="nav__link' + (active ? ' is-active' : '') + '" href="' + item.href + '"' +
        (active ? ' aria-current="page"' : '') + '>' + esc(item.label) + '</a></li>'
      );
    }).join('');

    host.className = 'site-header';
    host.innerHTML =
      '<div class="site-header__inner">' +
        '<a class="brand" href="/" aria-label="' + esc(SITE.name) + ' — home">' +
          '<span class="brand__mark">' + icon('logo') + '</span>' +
          '<span class="brand__text">' +
            '<span class="brand__name">Chongyi Automobile</span>' +
            '<span class="brand__sub">Auto Parts &amp; Trade</span>' +
          '</span>' +
        '</a>' +
        '<nav class="site-nav" id="site-nav" aria-label="Primary">' +
          '<ul>' + links + '</ul>' +
        '</nav>' +
        '<div class="header__actions">' +
          '<a class="btn btn--primary btn--sm" href="/contact.html">Get a Quote</a>' +
          '<button class="nav-toggle" id="nav-toggle" type="button" aria-label="Toggle navigation" aria-expanded="false" aria-controls="site-nav">' +
            icon('menu') +
          '</button>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     4. SHARED FOOTER  [reuse-D]
     ------------------------------------------------------------------ */
  function buildFooter() {
    var host = $('#site-footer');
    if (!host) return;

    var year = new Date().getFullYear();

    host.className = 'site-footer';
    host.innerHTML =
      '<div class="container">' +
        '<div class="site-footer__grid">' +
          '<div class="footer__col footer__brand">' +
            '<span class="footer__logo">' +
              '<span class="brand__mark">' + icon('logo') + '</span>' +
              '<span class="brand__text">' +
                '<span class="brand__name">' + esc(SITE.name) + '</span>' +
              '</span>' +
            '</span>' +
            '<p class="footer__desc">' + esc(SITE.scope) + '.</p>' +
            '<div class="footer__mascot">' +
              '<span class="mascot mascot--sm" data-mascot="rocket-cat"></span>' +
              '<span class="footer__desc">Moving parts around the world since day one.</span>' +
            '</div>' +
          '</div>' +

          '<div class="footer__col">' +
            '<h4>Explore</h4>' +
            '<ul>' +
              NAV.map(function (item) {
                return '<li><a href="' + item.href + '">' + esc(item.label) + '</a></li>';
              }).join('') +
            '</ul>' +
          '</div>' +

          '<div class="footer__col">' +
            '<h4>Legal</h4>' +
            '<ul>' +
              '<li><a href="/privacy.html">Privacy Policy</a></li>' +
              '<li><a href="/terms.html">Terms of Service</a></li>' +
              '<li><a href="/sitemap.xml">Sitemap</a></li>' +
            '</ul>' +
          '</div>' +

          '<div class="footer__col">' +
            '<h4>Contact</h4>' +
            '<ul class="footer__contact">' +
              '<li>' + icon('map-pin') + '<span>' + esc(SITE.address) + '</span></li>' +
              '<li>' + icon('globe') + '<span>' + esc(SITE.website) + '</span></li>' +
              '<li>' + icon('mail') + '<a href="mailto:' + SITE.emailSupport + '">' + SITE.emailSupport + '</a></li>' +
              '<li>' + icon('users') + '<a href="mailto:' + SITE.emailAccount + '">' + SITE.emailAccount + '</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +

        '<div class="site-footer__bottom">' +
          '<span>&copy; ' + year + ' ' + esc(SITE.name) + '. All rights reserved.</span>' +
          '<span class="footer__legal">' +
            '<a href="/privacy.html">Privacy Policy</a>' +
            '<a href="/terms.html">Terms of Service</a>' +
            '<a href="mailto:' + SITE.emailSupport + '">' + SITE.emailSupport + '</a>' +
          '</span>' +
        '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     5. SEO APPLICATION + JSON-LD  [reuse-F]
     ------------------------------------------------------------------ */
  function applySEO() {
    var key = currentKey();
    var config = SEO[key];
    if (!config) return;

    var canonical = SITE.url + (key === '/' ? '/' : key);

    function setMeta(attr, keyAttr, value) {
      var tag = document.head.querySelector('meta[' + attr + '="' + keyAttr + '"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, keyAttr);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', value);
    }

    document.title = config.title;

    setMeta('name', 'description', config.description);
    setMeta('property', 'og:title', config.title);
    setMeta('property', 'og:description', config.description);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', config.title);
    setMeta('name', 'twitter:description', config.description);

    var link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }

  function injectJSONLD() {
    var data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE.name,
      legalName: SITE.name,
      url: SITE.url + '/',
      logo: SITE.url + '/images/sprite.svg',
      description: SITE.scope + '.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'RM 29-33 5/F, BEVERLEY COMM CTR, 87-105 CHATHAM RD',
        addressLocality: 'Tsim Sha Tsui',
        addressRegion: 'Hong Kong',
        addressCountry: 'HK'
      },
      email: SITE.emailSupport,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'Business support',
          email: SITE.emailSupport
        },
        {
          '@type': 'ContactPoint',
          contactType: 'Key accounts',
          email: SITE.emailAccount
        }
      ],
      sameAs: ['https://' + SITE.website + '/'],
      knowsAbout: [
        'Auto parts wholesale and retail',
        'Car supplies',
        'Automobile information consultation',
        'Business consultation',
        'Import and export of goods and technology',
        'Supply chain management',
        'General trade'
      ]
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  /* MIRROR: must stay byte-identical to images/sprite.svg (file:// cannot
     fetch it). Used only when the fetch fails, so a double-clicked local
     preview still renders every icon and mascot. */
  var SPRITE_MIRROR = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none" aria-hidden="true">' +
  '<symbol id="logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <circle cx="12" cy="12" r="8.4"/>\n    <path d="M12 3.6c3.1 1.4 4.6 4.4 4.6 8.4s-1.5 7-4.6 8.4"/>\n    <path d="M4.2 12h3.4M16.4 12h3.4"/>\n  </symbol>' +
  '<symbol id="menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">\n    <path d="M3.5 7h17M3.5 12h17M3.5 17h17"/>\n  </symbol>' +
  '<symbol id="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">\n    <path d="M6 6l12 12M18 6L6 18"/>\n  </symbol>' +
  '<symbol id="arrow-right" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M4 12h15M13.5 6.5L19 12l-5.5 5.5"/>\n  </symbol>' +
  '<symbol id="arrow-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 20V5M6.5 10.5L12 5l5.5 5.5"/>\n  </symbol>' +
  '<symbol id="mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <rect x="2.8" y="5" width="18.4" height="14" rx="2.4"/>\n    <path d="M3.4 7.2L12 13l8.6-5.8"/>\n  </symbol>' +
  '<symbol id="phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M6.2 3.6h3l1.5 3.9-2 1.3a11.6 11.6 0 006.5 6.5l1.3-2 3.9 1.5v3a1.8 1.8 0 01-2 1.8C10.9 19 5 13.1 4.4 5.6a1.8 1.8 0 011.8-2z"/>\n  </symbol>' +
  '<symbol id="map-pin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 21.2s7-5.8 7-11a7 7 0 10-14 0c0 5.2 7 11 7 11z"/>\n    <circle cx="12" cy="10" r="2.6"/>\n  </symbol>' +
  '<symbol id="globe" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <circle cx="12" cy="12" r="8.6"/>\n    <path d="M3.4 12h17.2"/>\n    <path d="M12 3.4c2.3 2.4 3.5 5.4 3.5 8.6s-1.2 6.2-3.5 8.6c-2.3-2.4-3.5-5.4-3.5-8.6S9.7 5.8 12 3.4z"/>\n  </symbol>' +
  '<symbol id="chart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M3.6 20.4h16.8"/>\n    <path d="M7.4 20.4v-6.6M12 20.4V8.2M16.6 20.4v-9.4"/>\n  </symbol>' +
  '<symbol id="cart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M2.8 4h2.4l2.2 10.4h9.4l2.2-7.6H6.2"/>\n    <circle cx="9" cy="19" r="1.5"/>\n    <circle cx="16.6" cy="19" r="1.5"/>\n  </symbol>' +
  '<symbol id="truck" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M2.8 6.6h10.4v9.8H2.8zM13.2 10.2h3.6l3.4 3.4v2.8h-7z"/>\n    <circle cx="7" cy="18.4" r="1.7"/>\n    <circle cx="16.6" cy="18.4" r="1.7"/>\n  </symbol>' +
  '<symbol id="shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 3.2l7.2 2.6v5.6c0 4.4-3 8-7.2 9.4-4.2-1.4-7.2-5-7.2-9.4V5.8z"/>\n    <path d="M9.2 12.1l2 2 3.6-3.8"/>\n  </symbol>' +
  '<symbol id="star" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 3.6l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 17l-5.2 2.8 1-5.9L3.5 9.8l5.9-.8z"/>\n  </symbol>' +
  '<symbol id="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M4.5 12.6l5 5L19.5 6.8"/>\n  </symbol>' +
  '<symbol id="play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <circle cx="12" cy="12" r="8.6"/>\n    <path d="M10.2 8.6l6 3.4-6 3.4z"/>\n  </symbol>' +
  '<symbol id="download" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 3.8v10.6"/>\n    <path d="M7.8 10.6L12 14.8l4.2-4.2"/>\n    <path d="M4.4 17.4v1.4a1.6 1.6 0 001.6 1.6h12a1.6 1.6 0 001.6-1.6v-1.4"/>\n  </symbol>' +
  '<symbol id="apple" viewBox="0 0 24 24" fill="currentColor">\n    <path d="M16.4 12.7c0-2.3 1.9-3.4 2-3.5-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.1-2.8.9-3.5.9s-1.8-.8-3-.8c-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.3 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.2.9-1.3 1.3-2.5 1.3-2.6-.1 0-2.5-1-2.5-3.9zM14.2 5.6c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.9-1 3 1 .1 2.1-.6 2.7-1.4z"/>\n  </symbol>' +
  '<symbol id="google-play" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">\n    <path d="M4.2 3.6l10.6 8.4L4.2 20.4z"/>\n    <path d="M14.8 12L7.6 3.6"/>\n    <path d="M14.8 12l-7.2 8.4"/>\n    <path d="M16.6 10.4l3.6 2.2c.9.5.9 1.3 0 1.8l-3.6 2.2"/>\n  </symbol>' +
  '<symbol id="mobile-app" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <rect x="6" y="2.8" width="12" height="18.4" rx="2.6"/>\n    <path d="M10.6 5.6h2.8"/>\n    <path d="M10.6 18.4h2.8"/>\n    <path d="M9.2 13.6a3 3 0 015.6 0"/>\n  </symbol>' +
  '<symbol id="settings" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">\n    <circle cx="12" cy="12" r="3.2"/>\n    <path d="M12 3.2v2.4M12 18.4v2.4M4.8 12H2.4M21.6 12h-2.4M6.9 6.9L5.2 5.2M18.8 18.8l-1.7-1.7M6.9 17.1l-1.7 1.7M18.8 5.2l-1.7 1.7"/>\n  </symbol>' +
  '<symbol id="users" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <circle cx="9.4" cy="8.4" r="3.4"/>\n    <path d="M3.4 19.6a6 6 0 0112 0"/>\n    <path d="M16 5.4a3.4 3.4 0 010 6.6M17.6 14.4a6 6 0 013 5.2"/>\n  </symbol>' +
  '<symbol id="briefcase" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <rect x="2.8" y="7.2" width="18.4" height="12.4" rx="2.2"/>\n    <path d="M8.6 7.2V5.4a2 2 0 012-2h2.8a2 2 0 012 2v1.8"/>\n    <path d="M2.8 12.4h18.4"/>\n  </symbol>' +
  '<symbol id="layers" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">\n    <path d="M12 3.4l8.4 4.4-8.4 4.4-8.4-4.4z"/>\n    <path d="M3.6 12.6L12 17l8.4-4.4"/>\n    <path d="M3.6 16.6L12 21l8.4-4.4"/>\n  </symbol>' +
  '<symbol id="cat" viewBox="0 0 64 64">\n    <path d="M14 24L13 10l13 8z" fill="currentColor"/>\n    <path d="M50 24L51 10l-13 8z" fill="currentColor"/>\n    <ellipse cx="32" cy="34" rx="22" ry="20" fill="currentColor"/>\n    <ellipse cx="32" cy="38" rx="13" ry="11" fill="#ffffff" opacity="0.9"/>\n    <circle cx="25" cy="31" r="3" fill="#22252b"/>\n    <circle cx="39" cy="31" r="3" fill="#22252b"/>\n    <circle cx="26" cy="30" r="1" fill="#ffffff"/>\n    <circle cx="40" cy="30" r="1" fill="#ffffff"/>\n    <path d="M32 36l-3 3h6z" fill="#e2552b"/>\n    <path d="M28 41q4 4 8 0" stroke="#22252b" stroke-width="2" fill="none" stroke-linecap="round"/>\n    <path d="M12 34h7M12 40h7M45 34h7M45 40h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="dog" viewBox="0 0 64 64">\n    <ellipse cx="15" cy="30" rx="8" ry="14" fill="currentColor" opacity="0.82"/>\n    <ellipse cx="49" cy="30" rx="8" ry="14" fill="currentColor" opacity="0.82"/>\n    <ellipse cx="32" cy="34" rx="21" ry="20" fill="currentColor"/>\n    <ellipse cx="32" cy="40" rx="12" ry="9" fill="#ffffff" opacity="0.92"/>\n    <circle cx="25" cy="30" r="3" fill="#22252b"/>\n    <circle cx="39" cy="30" r="3" fill="#22252b"/>\n    <ellipse cx="32" cy="39" rx="4.5" ry="3.2" fill="#22252b"/>\n    <path d="M32 42v4M26 46q6 4 12 0" stroke="#22252b" stroke-width="2" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="fox" viewBox="0 0 64 64">\n    <path d="M12 26L14 8l14 9z" fill="currentColor"/>\n    <path d="M52 26L50 8l-14 9z" fill="currentColor"/>\n    <path d="M32 12c13 0 22 10 22 21 0 10-10 17-22 17s-22-7-22-17c0-11 9-21 22-21z" fill="currentColor"/>\n    <path d="M32 30c8 0 14 5 14 12 0 7-6 12-14 12s-14-5-14-12c0-7 6-12 14-12z" fill="#ffffff" opacity="0.94"/>\n    <circle cx="24" cy="30" r="3" fill="#22252b"/>\n    <circle cx="40" cy="30" r="3" fill="#22252b"/>\n    <circle cx="25" cy="29" r="1" fill="#ffffff"/>\n    <circle cx="41" cy="29" r="1" fill="#ffffff"/>\n    <path d="M32 37l-3.4 3h6.8z" fill="#22252b"/>\n    <path d="M27 42q5 4 10 0" stroke="#22252b" stroke-width="2" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="panda" viewBox="0 0 64 64">\n    <circle cx="15" cy="18" r="9" fill="currentColor" opacity="0.8"/>\n    <circle cx="49" cy="18" r="9" fill="currentColor" opacity="0.8"/>\n    <ellipse cx="32" cy="33" rx="21" ry="21" fill="#ffffff"/>\n    <ellipse cx="23" cy="31" rx="6.5" ry="7.5" fill="currentColor" transform="rotate(-18 23 31)"/>\n    <ellipse cx="41" cy="31" rx="6.5" ry="7.5" fill="currentColor" transform="rotate(18 41 31)"/>\n    <circle cx="24" cy="32" r="2.4" fill="#ffffff"/>\n    <circle cx="40" cy="32" r="2.4" fill="#ffffff"/>\n    <circle cx="24.6" cy="32.4" r="1.3" fill="#22252b"/>\n    <circle cx="40.6" cy="32.4" r="1.3" fill="#22252b"/>\n    <ellipse cx="32" cy="41" rx="4" ry="3" fill="currentColor"/>\n    <path d="M32 44v3M27 47q5 3.5 10 0" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="rabbit" viewBox="0 0 64 64">\n    <ellipse cx="24" cy="18" rx="6" ry="14" fill="currentColor"/>\n    <ellipse cx="40" cy="18" rx="6" ry="14" fill="currentColor"/>\n    <ellipse cx="24" cy="19" rx="2.6" ry="9" fill="#ffffff" opacity="0.75"/>\n    <ellipse cx="40" cy="19" rx="2.6" ry="9" fill="#ffffff" opacity="0.75"/>\n    <ellipse cx="32" cy="38" rx="19" ry="18" fill="currentColor"/>\n    <circle cx="25" cy="36" r="3" fill="#22252b"/>\n    <circle cx="39" cy="36" r="3" fill="#22252b"/>\n    <circle cx="26" cy="35" r="1" fill="#ffffff"/>\n    <circle cx="40" cy="35" r="1" fill="#ffffff"/>\n    <path d="M32 42l-3 2.6h6z" fill="#e2552b"/>\n    <path d="M28 46q4 3.4 8 0" stroke="#22252b" stroke-width="2" fill="none" stroke-linecap="round"/>\n    <circle cx="19" cy="42" r="3" fill="#ff9a7a" opacity="0.75"/>\n    <circle cx="45" cy="42" r="3" fill="#ff9a7a" opacity="0.75"/>\n  </symbol>' +
  '<symbol id="bear" viewBox="0 0 64 64">\n    <circle cx="15" cy="18" r="8" fill="currentColor" opacity="0.85"/>\n    <circle cx="49" cy="18" r="8" fill="currentColor" opacity="0.85"/>\n    <ellipse cx="32" cy="34" rx="21" ry="19" fill="currentColor"/>\n    <ellipse cx="32" cy="40" rx="12" ry="9" fill="#ffffff" opacity="0.9"/>\n    <circle cx="25" cy="31" r="3" fill="#22252b"/>\n    <circle cx="39" cy="31" r="3" fill="#22252b"/>\n    <ellipse cx="32" cy="38" rx="4.4" ry="3.4" fill="#22252b"/>\n    <path d="M32 41v3.5M27 45q5 3.4 10 0" stroke="#22252b" stroke-width="2" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="owl" viewBox="0 0 64 64">\n    <ellipse cx="32" cy="34" rx="20" ry="22" fill="currentColor"/>\n    <path d="M13 20l-2-8 10 5zM51 20l2-8-10 5z" fill="currentColor"/>\n    <circle cx="24" cy="30" r="8" fill="#ffffff" opacity="0.94"/>\n    <circle cx="40" cy="30" r="8" fill="#ffffff" opacity="0.94"/>\n    <circle cx="24" cy="30" r="3.4" fill="#22252b"/>\n    <circle cx="40" cy="30" r="3.4" fill="#22252b"/>\n    <path d="M32 38l-4 5h8z" fill="#f0a93b"/>\n    <path d="M22 48q10 6 20 0" stroke="#ffffff" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.7"/>\n  </symbol>' +
  '<symbol id="penguin" viewBox="0 0 64 64">\n    <ellipse cx="32" cy="34" rx="20" ry="23" fill="currentColor"/>\n    <ellipse cx="32" cy="40" rx="13" ry="15" fill="#ffffff" opacity="0.94"/>\n    <circle cx="25" cy="28" r="3.2" fill="#22252b"/>\n    <circle cx="39" cy="28" r="3.2" fill="#22252b"/>\n    <circle cx="26" cy="27" r="1.1" fill="#ffffff"/>\n    <circle cx="40" cy="27" r="1.1" fill="#ffffff"/>\n    <path d="M32 34l-4.6 4h9.2z" fill="#f0a93b"/>\n    <path d="M20 50q12 6 24 0" stroke="#f0a93b" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.85"/>\n  </symbol>' +
  '<symbol id="smile" viewBox="0 0 64 64">\n    <circle cx="32" cy="32" r="23" fill="currentColor"/>\n    <circle cx="24" cy="27" r="3.4" fill="#22252b"/>\n    <circle cx="40" cy="27" r="3.4" fill="#22252b"/>\n    <circle cx="25" cy="26" r="1.2" fill="#ffffff"/>\n    <circle cx="41" cy="26" r="1.2" fill="#ffffff"/>\n    <path d="M20 38q12 12 24 0" stroke="#22252b" stroke-width="3" fill="none" stroke-linecap="round"/>\n    <circle cx="16" cy="35" r="3.5" fill="#ff9a7a" opacity="0.7"/>\n    <circle cx="48" cy="35" r="3.5" fill="#ff9a7a" opacity="0.7"/>\n  </symbol>' +
  '<symbol id="heart-eyes" viewBox="0 0 64 64">\n    <circle cx="32" cy="32" r="23" fill="currentColor"/>\n    <path d="M18 28c-3-5 2-9 6-6 4-3 9 1 6 6l-6 7z" fill="#e2552b"/>\n    <path d="M46 28c-3-5 2-9 6-6 4-3 9 1 6 6l-6 7z" fill="#e2552b"/>\n    <path d="M20 39q12 12 24 0" stroke="#22252b" stroke-width="3" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="wink" viewBox="0 0 64 64">\n    <circle cx="32" cy="32" r="23" fill="currentColor"/>\n    <circle cx="24" cy="27" r="3.4" fill="#22252b"/>\n    <circle cx="25" cy="26" r="1.2" fill="#ffffff"/>\n    <path d="M37 27h8" stroke="#22252b" stroke-width="3" stroke-linecap="round"/>\n    <path d="M21 39q11 11 22 0" stroke="#22252b" stroke-width="3" fill="none" stroke-linecap="round"/>\n  </symbol>' +
  '<symbol id="thumbs-up" viewBox="0 0 64 64">\n    <path d="M18 30h6v24h-6z" fill="currentColor" opacity="0.85"/>\n    <path d="M28 52c-3 0-5-2-5-5l1-13c0-3 1-5 4-7l5-4c2-2 5-1 5 2l-1 7h9c3 0 5 3 4 6l-3 11c-1 2-3 3-5 3z" fill="currentColor"/>\n    <circle cx="30" cy="40" r="1.6" fill="#ffffff" opacity="0.8"/>\n    <circle cx="38" cy="40" r="1.6" fill="#ffffff" opacity="0.8"/>\n  </symbol>' +
  '<symbol id="party" viewBox="0 0 64 64">\n    <path d="M32 6l6 12 13 2-9.5 9.5L44 44l-12-6.5L20 44l2.5-14.5L13 20l13-2z" fill="currentColor"/>\n    <circle cx="50" cy="14" r="3.5" fill="#f0a93b"/>\n    <circle cx="14" cy="50" r="3" fill="#e2552b"/>\n    <circle cx="54" cy="46" r="2.6" fill="#2f6c99"/>\n    <path d="M8 30l4 2-4 3z" fill="#2f6c99"/>\n  </symbol>' +
  '<symbol id="rocket-cat" viewBox="0 0 64 64">\n    <path d="M32 4c10 6 14 18 14 28 0 4-1 7-3 10H21c-2-3-3-6-3-10C18 22 22 10 32 4z" fill="currentColor"/>\n    <circle cx="32" cy="24" r="7" fill="#ffffff" opacity="0.92"/>\n    <circle cx="29.4" cy="23" r="2" fill="#22252b"/>\n    <circle cx="34.6" cy="23" r="2" fill="#22252b"/>\n    <path d="M29 28q3 2.4 6 0" stroke="#22252b" stroke-width="1.8" fill="none" stroke-linecap="round"/>\n    <path d="M19 36l-8 6 3 8 8-4z" fill="currentColor" opacity="0.85"/>\n    <path d="M45 36l8 6-3 8-8-4z" fill="currentColor" opacity="0.85"/>\n    <path d="M32 44l6 10H26z" fill="#f0a93b"/>\n    <path d="M32 52l4 8h-8z" fill="#e2552b"/>\n  </symbol>' +
    '</svg>';

  /* ------------------------------------------------------------------
     6. SVG SPRITE  [reuse-E]
     ------------------------------------------------------------------ */
  var MASCOT_FALLBACK = {
    cat: '🐱', dog: '🐶', fox: '🦊', panda: '🐼', rabbit: '🐰', bear: '🐻',
    owl: '🦉', penguin: '🐧', smile: '🙂', 'heart-eyes': '😍', wink: '😉',
    'thumbs-up': '👍', party: '🎉', 'rocket-cat': '🚀'
  };

  function loadSprite() {
    var placeholders = $$('[data-mascot]');
    if (!placeholders.length) return Promise.resolve();

    function injectSprite(markup) {
      var host = document.createElement('div');
      host.id = 'sprite-host';
      host.setAttribute('aria-hidden', 'true');
      host.innerHTML = markup;
      document.body.insertBefore(host, document.body.firstChild);

      placeholders.forEach(function (node) {
        var id = node.getAttribute('data-mascot');
        node.innerHTML =
          '<svg class="mascot" viewBox="0 0 64 64" aria-hidden="true" focusable="false">' +
            '<use href="#' + id + '"></use>' +
          '</svg>';
        node.classList.add('is-loaded');
      });
    }

    return fetch('images/sprite.svg')
      .then(function (response) {
        if (!response.ok) throw new Error('sprite ' + response.status);
        return response.text();
      })
      .then(function (text) {
        var clean = text.replace(/<\?xml[\s\S]*?\?>/g, '').replace(/<!DOCTYPE[\s\S]*?>/g, '').trim();
        injectSprite(clean);
      })
      .catch(function () {
        // file:// cannot fetch sibling files (CORS). Fall back to the embedded
        // mirror so a double-clicked local preview still renders every icon.
        if (typeof SPRITE_MIRROR === 'string' && SPRITE_MIRROR) {
          injectSprite(SPRITE_MIRROR);
          return;
        }
        document.documentElement.classList.add('sprite-missing');
        placeholders.forEach(function (node) {
          var id = node.getAttribute('data-mascot');
          var glyph = MASCOT_FALLBACK[id] || '🐾';
          node.innerHTML = '<span class="mascot-fallback">' + glyph + '</span>';
          node.classList.add('is-fallback');
        });
      });
  }

  /* ------------------------------------------------------------------
     7. REVEAL ANIMATIONS  [reuse-G]
     ------------------------------------------------------------------ */
  function initReveal() {
    var items = $$('.reveal');
    var groups = $$('.stagger');

    groups.forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, index) {
        child.style.setProperty('--i', index);
      });
    });

    if (!('IntersectionObserver' in window)) {
      items.forEach(function (item) { item.classList.add('in'); });
      groups.forEach(function (group) { group.classList.add('in'); });
      return;
    }

    var revealed = 0;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        revealed += 1;
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    items.forEach(function (item) { observer.observe(item); });

    var groupObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        groupObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08 });

    groups.forEach(function (group) { groupObserver.observe(group); });

    // Safety net: if the observer never fires, show everything rather than
    // leaving the page blank.
    window.setTimeout(function () {
      if (revealed > 0) return;
      items.forEach(function (item) { item.classList.add('in'); });
      groups.forEach(function (group) { group.classList.add('in'); });
    }, 2500);
  }

  /* ------------------------------------------------------------------
     8. NAVIGATION, SCROLL, BACK TO TOP
     ------------------------------------------------------------------ */
  function initHeaderBehaviour() {
    var header = $('#site-header');
    var toggle = $('#nav-toggle');
    var nav = $('#site-nav');

    function onScroll() {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    if (toggle && nav) {
      toggle.addEventListener('click', function () {
        var open = nav.classList.toggle('is-open');
        toggle.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        document.body.classList.toggle('is-locked', open);
      });

      nav.addEventListener('click', function (event) {
        if (event.target.closest('a')) {
          nav.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('is-locked');
        }
      });

      window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          toggle.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
          document.body.classList.remove('is-locked');
        }
      });
    }

    $$('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.getAttribute('href');
        if (!id || id === '#') return;
        var target = document.querySelector(id);
        if (!target) return;
        event.preventDefault();
        var offset = header ? header.offsetHeight + 12 : 0;
        var top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      });
    });
  }

  function initBackToTop() {
    var button = document.createElement('button');
    button.className = 'to-top';
    button.type = 'button';
    button.setAttribute('aria-label', 'Back to top');
    button.innerHTML = icon('arrow-up');
    document.body.appendChild(button);

    button.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    function onScroll() {
      button.classList.toggle('is-visible', window.scrollY > 520);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------
     9. NEWS FILTER
     ------------------------------------------------------------------ */
  function initNewsFilter() {
    var chips = $$('[data-filter]');
    var cards = $$('[data-category]');
    if (!chips.length || !cards.length) return;

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var value = chip.getAttribute('data-filter');
        chips.forEach(function (other) { other.classList.remove('is-active'); });
        chip.classList.add('is-active');

        cards.forEach(function (card) {
          var match = value === 'all' || card.getAttribute('data-category') === value;
          card.classList.toggle('is-hidden', !match);
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     10. CONTACT FORM VALIDATION
     ------------------------------------------------------------------ */
  function initForm() {
    var form = $('#contact-form');
    if (!form) return;

    var status = $('#form-status');
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function setError(field, message) {
      var wrapper = field.closest('.field') || field.closest('.checkbox');
      if (!wrapper) return;
      var slot = wrapper.querySelector('.field__error');
      if (message) {
        wrapper.classList.add('has-error');
        if (slot) slot.textContent = message;
      } else {
        wrapper.classList.remove('has-error');
      }
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      var valid = true;

      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var company = form.querySelector('#company');
      var message = form.querySelector('#message');
      var consent = form.querySelector('#consent');

      if (name && !name.value.trim()) { setError(name, 'Please tell us your name.'); valid = false; }
      else if (name) setError(name, '');

      if (email && !emailPattern.test(email.value.trim())) {
        setError(email, 'Please enter a valid email address.');
        valid = false;
      } else if (email) setError(email, '');

      if (message && message.value.trim().length < 10) {
        setError(message, 'Please add a little more detail (10 characters minimum).');
        valid = false;
      } else if (message) setError(message, '');

      if (consent && !consent.checked) {
        var wrapper = consent.closest('.checkbox');
        if (wrapper) {
          wrapper.classList.add('has-error');
          var slot = wrapper.querySelector('.field__error');
          if (slot) slot.textContent = 'Please accept the Privacy Policy and Terms of Service.';
        }
        valid = false;
      } else if (consent) {
        var cw = consent.closest('.checkbox');
        if (cw) cw.classList.remove('has-error');
      }

      if (!valid) {
        if (status) {
          status.textContent = 'Please review the highlighted fields and try again.';
          status.classList.add('is-visible', 'is-error');
        }
        return;
      }

      if (status) {
        status.textContent =
          'Thank you — your enquiry has been prepared. Our team will reply to ' +
          (email ? email.value.trim() : 'your inbox') + ' shortly.';
        status.classList.add('is-visible');
        status.classList.remove('is-error');
      }
      form.reset();
    });

    $$('input, textarea, select', form).forEach(function (input) {
      input.addEventListener('blur', function () {
        var wrapper = input.closest('.field');
        if (wrapper && !wrapper.classList.contains('has-error')) {
          input.value = input.value.trim && input.type !== 'checkbox' ? input.value.trim() : input.value;
        }
      });
    });
  }

  /* ------------------------------------------------------------------
     11. ACTIVE NAVIGATION STATE
     ------------------------------------------------------------------ */
  function lastSegment(path) {
    var clean = String(path || '').split('#')[0].split('?')[0];
    var segment = clean.substring(clean.lastIndexOf('/') + 1);
    return segment === '' ? 'index.html' : segment;
  }

  function initActiveNav() {
    var current = lastSegment(currentKey());
    $$('.nav__link').forEach(function (link) {
      var match = lastSegment(link.getAttribute('href')) === current;
      link.classList.toggle('is-active', match);
      if (match) link.setAttribute('aria-current', 'page');
    });
  }

  /* ------------------------------------------------------------------
     12. DEPLOYMENT PATHS
     Under file:// a root-relative link such as "/" resolves to the disk
     root, not to the homepage; under a sub-path deployment it resolves
     outside the site. Rewrite anchors to the right base in both cases.
     Under http(s) at the domain root nothing is touched, so the public
     URLs stay canonical.
     ------------------------------------------------------------------ */
  function applyBasePaths() {
    var isFile = window.location.protocol === 'file:';

    $$('a[href^="/"]').forEach(function (link) {
      var href = link.getAttribute('href');
      var next = href.replace(/^\//, '');

      if (isFile) {
        link.setAttribute('href', next === '' ? 'index.html' : next);
      } else if (BASE_PATH !== '/') {
        link.setAttribute('href', BASE_PATH + '/' + next);
      }
    });
  }

  /* ------------------------------------------------------------------
     13. BOOT
     ------------------------------------------------------------------ */
  function boot() {
    document.documentElement.classList.add('reveal-ready');
    buildHeader();
    buildFooter();
    applyBasePaths();
    applySEO();
    injectJSONLD();
    initHeaderBehaviour();
    initBackToTop();
    initNewsFilter();
    initForm();
    initActiveNav();
    initReveal();
    loadSprite();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
