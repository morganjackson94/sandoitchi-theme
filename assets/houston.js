/* ── Houston Launch — page behaviors ──
   Ported 1:1 from the source page's component logic, framework-free.
   Behaviors: reveal-on-scroll, header flip, CTA flip, pinned horizontal
   scroll (desktop) / native snap (mobile), card-drop stack + replay,
   RSVP confirmation via ?joined=1 return param. */

(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  function init() {
    reveal();
    headerFlip();
    ctaFlip();
    hscroll();
    watchStack();
    replayButton();
    formNote();
  }

  /* ── Reveal on scroll ── */
  function reveal() {
    var els = Array.prototype.slice.call(document.querySelectorAll('[data-reveal]'));
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-revealed');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ── Header: light over the hero, dark after ── */
  function headerFlip() {
    var hdr = document.querySelector('[data-header]');
    var hero = document.querySelector('[data-screen-label="Intro"]');
    if (!hdr || !hero) return;
    var set = function () {
      var light = window.scrollY < hero.offsetHeight - 60;
      hdr.style.background = light ? 'rgba(239,235,227,0.78)' : 'rgba(15,13,11,0.72)';
      hdr.style.color = light ? '#16130F' : '#EFEBE3';
      hdr.style.borderBottomColor = light ? 'rgba(22,19,15,0.14)' : 'rgba(239,235,227,0.14)';
      var mark = hdr.querySelector('[data-hdr-mark]');
      if (mark) mark.style.filter = light ? 'none' : 'invert(1)';
    };
    set();
    window.addEventListener('scroll', set, { passive: true });
    window.addEventListener('resize', set);
  }

  /* ── Header CTA: flips to purple once scrolled ── */
  function ctaFlip() {
    var cta = document.querySelector('[data-cta]');
    if (!cta) return;
    var set = function () {
      cta.style.background = window.scrollY > 40 ? '#7B3FD4' : '#16130F';
      cta.style.color = '#F7F4EE';
    };
    set();
    window.addEventListener('scroll', set, { passive: true });
  }

  /* ── Pinned horizontal scroll (desktop); native snap scroll (mobile) ── */
  var hsLayout = null;
  function hscroll() {
    var sec = document.querySelector('[data-hscroll]');
    var panel = document.querySelector('[data-hscroll-sticky]');
    var vp = document.querySelector('[data-hscroll-viewport]');
    if (!sec || !panel || !vp) return;
    var narrow = function () { return window.innerWidth <= 760; };
    var top = 0, span = 1, travel = 0, raf = 0, phase = '', lastX = null;

    var measure = function () {
      var track = vp.querySelector('[data-hscroll-track]');
      travel = track ? Math.max(0, track.scrollWidth - vp.clientWidth) : 0;
      top = sec.getBoundingClientRect().top + window.scrollY;
      span = Math.max(1, sec.offsetHeight - window.innerHeight);
    };

    /* The panel is pinned with position:fixed, not a per-frame transform —
       moving it from JS lagged a frame behind the compositor and bounced. */
    var setPhase = function (next) {
      if (next === phase) return;
      phase = next;
      if (next === 'pre') {
        panel.style.position = 'absolute';
        panel.style.top = '0px';
      } else if (next === 'post') {
        panel.style.position = 'absolute';
        panel.style.top = span + 'px';
      } else {
        panel.style.position = 'fixed';
        panel.style.top = '0px';
      }
    };

    var apply = function () {
      raf = 0;
      if (narrow()) return;
      var y = window.scrollY;
      setPhase(y < top ? 'pre' : y > top + span ? 'post' : 'pinned');
      var held = Math.max(0, Math.min(span, y - top));
      var x = -Math.round((held / span) * travel);
      if (x === lastX) return;
      lastX = x;
      var track = vp.querySelector('[data-hscroll-track]');
      if (track) track.style.transform = 'translate3d(' + x + 'px,0,0)';
    };

    var onScroll = function () { if (!raf) raf = requestAnimationFrame(apply); };

    var layout = function () {
      var track = vp.querySelector('[data-hscroll-track]');
      lastX = null;
      phase = '';
      if (narrow()) {
        sec.style.height = '';
        panel.style.position = 'relative';
        panel.style.top = '';
        panel.style.height = '';
        vp.style.overflowX = 'auto';
        vp.style.scrollSnapType = 'x mandatory';
        if (track) track.style.transform = '';
        return;
      }
      vp.style.overflowX = 'hidden';
      /* Snap points on an overflow:hidden box still let the browser nudge
         scrollLeft, which fights the programmatic transform. */
      vp.style.scrollSnapType = 'none';
      vp.scrollLeft = 0;
      panel.style.position = 'absolute';
      panel.style.top = '0px';
      panel.style.height = window.innerHeight + 'px';
      var t = track ? Math.max(0, track.scrollWidth - vp.clientWidth) : 0;
      sec.style.height = (window.innerHeight + t) + 'px';
      measure();
      apply();
    };

    hsLayout = layout;
    layout();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', layout);
    /* Re-measure only when the track's real width changes (image loads);
       observing the viewport would re-fire on our own height write and loop. */
    if (window.ResizeObserver) {
      var lastW = 0;
      var ro = new ResizeObserver(function () {
        var track = vp.querySelector('[data-hscroll-track]');
        var w = track ? track.scrollWidth : 0;
        if (w !== lastW) { lastW = w; layout(); }
      });
      var track0 = vp.querySelector('[data-hscroll-track]');
      if (track0) ro.observe(track0);
    }
    setTimeout(layout, 400);
  }

  /* ── Card stack: drop animation starts when the section is in view ── */
  function setStack(on) {
    document.querySelectorAll('[data-card]').forEach(function (el) {
      el.style.animationPlayState = on ? 'running' : 'paused';
      /* Pausing alone never rewinds, so Replay seeks the running animations
         back to zero (delays included) rather than just resuming. */
      if (on && el.getAnimations) {
        el.getAnimations().forEach(function (a) {
          try { a.currentTime = 0; a.play(); } catch (e) {}
        });
      }
    });
  }

  function watchStack() {
    var sec = document.querySelector('[data-hscroll-sticky]');
    if (!sec) return;
    if (!('IntersectionObserver' in window)) { setStack(true); return; }
    var fired = false;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !fired) { fired = true; setStack(true); }
      });
    }, { threshold: 0.55 });
    io.observe(sec);
  }

  function replayButton() {
    var btn = document.querySelector('[data-replay]');
    if (!btn) return;
    btn.addEventListener('click', function () {
      setStack(false);
      setTimeout(function () {
        setStack(true);
        if (hsLayout) hsLayout();
      }, 60);
    });
  }

  /* ── RSVP: show confirmation when Shopify redirects back with ?joined=1 ── */
  function formNote() {
    var note = document.querySelector('[data-form-note]');
    if (!note) return;
    var params = new URLSearchParams(window.location.search);
    if (params.get('joined') === '1' || params.get('customer_posted') === 'true') {
      note.hidden = false;
      var input = document.getElementById('email-rsvp');
      if (input) input.value = '';
      /* Clean the param so a refresh doesn't re-show stale state */
      if (window.history && history.replaceState) {
        history.replaceState(null, '', window.location.pathname + window.location.hash);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
