// ByeFeed website: the few behaviours every page shares. The pages work in
// full without this file; it only adds the light/dark switch, the collapsible
// mobile menu, keeps the footer year current, and opens the FAQ answer a link
// points at.
(function () {
  "use strict";

  // ---- Light / dark theme -------------------------------------------------
  // A small script in each page's <head> already set data-theme before the
  // first paint: the visitor's saved choice, or else what their device prefers.
  // This wires up the button. A choice is remembered in this browser only
  // (localStorage "bf-theme"); until one is made, the page keeps following the
  // device, including when the device switches between light and dark.
  var root = document.documentElement;
  var themeBtn = document.querySelector(".theme-toggle");
  var THEME_KEY = "bf-theme";
  var darkQuery = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;

  function savedTheme() {
    try {
      var t = localStorage.getItem(THEME_KEY);
      return t === "light" || t === "dark" ? t : null;
    } catch (e) {
      return null;
    }
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    var dark = theme === "dark";
    if (themeBtn) {
      themeBtn.setAttribute("aria-pressed", dark ? "true" : "false");
      themeBtn.title = dark ? "Switch to light theme" : "Switch to dark theme";
    }
    // Keep the browser's own chrome (mobile address bar) in step.
    var metas = document.querySelectorAll('meta[name="theme-color"]');
    for (var m = 0; m < metas.length; m++) metas[m].setAttribute("content", dark ? "#1C1A17" : "#FFF7E6");
  }

  applyTheme(savedTheme() || (darkQuery && darkQuery.matches ? "dark" : "light"));

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      applyTheme(next);
    });
  }

  if (darkQuery) {
    var onSchemeChange = function () {
      if (!savedTheme()) applyTheme(darkQuery.matches ? "dark" : "light");
    };
    if (darkQuery.addEventListener) darkQuery.addEventListener("change", onSchemeChange);
    else if (darkQuery.addListener) darkQuery.addListener(onSchemeChange);
  }

  // ---- Mobile menu --------------------------------------------------------
  // The toggle is a real <button> with aria-expanded, Escape closes the menu
  // and hands focus back to the button, and following a link closes it.
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("site-menu");

  if (toggle && menu) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      menu.classList.toggle("open", open);
    };

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    menu.addEventListener("click", function (e) {
      if (e.target.closest && e.target.closest("a")) setOpen(false);
    });

    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (!menu.contains(e.target) && !toggle.contains(e.target)) setOpen(false);
    });

    // Back on a wide screen the menu is always visible; reset its state so it
    // is not found open the next time the window narrows.
    if (window.matchMedia) {
      var wide = window.matchMedia("(min-width: 861px)");
      var onWide = function () { if (wide.matches) setOpen(false); };
      if (wide.addEventListener) wide.addEventListener("change", onWide);
      else if (wide.addListener) wide.addListener(onWide);
    }
  }

  // ---- "On this page" -------------------------------------------------------
  // A sticky sidebar on wide screens; on a phone it would push the page a full
  // screen down, so it starts collapsed there. Without JavaScript it stays open.
  var toc = document.querySelector("details.toc");
  if (toc && window.matchMedia) {
    var narrow = window.matchMedia("(max-width: 960px)");
    toc.open = !narrow.matches;
    var onResize = function () { toc.open = !narrow.matches; };
    if (narrow.addEventListener) narrow.addEventListener("change", onResize);
    else if (narrow.addListener) narrow.addListener(onResize);
  }

  // ---- Footer year ---------------------------------------------------------
  var year = String(new Date().getFullYear());
  var years = document.querySelectorAll("[data-year]");
  for (var i = 0; i < years.length; i++) years[i].textContent = year;

  // ---- Deep links into collapsed answers -----------------------------------
  // /faq/#refund should land on an open answer, not a closed summary.
  function openTarget() {
    if (!location.hash || location.hash.length < 2) return;
    var el;
    try {
      el = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    } catch (e) {
      return;
    }
    if (!el) return;
    var details = el.tagName === "DETAILS" ? el : (el.closest && el.closest("details"));
    if (details && !details.open) {
      details.open = true;
      el.scrollIntoView();
    }
  }
  openTarget();
  window.addEventListener("hashchange", openTarget);
})();
