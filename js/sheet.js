/**
 * Mobile Bottom Sheet shell — Phase 1 foundation.
 * Canonical structure: Header → Scroll Content → Footer.
 * Use for simple records, pickers, user switch — not large business modals.
 */
(function (global) {
  'use strict';

  const LOCK_TOKEN = 'app-sheet';
  const ENTER_MS = 280;

  /** @type {Array<{id:string,overlay:HTMLElement,sheet:HTMLElement,options:object}>} */
  const stack = [];
  let hostOverlay = null;

  function mountNode(target, value) {
    if (value == null) return;
    if (typeof value === 'string') {
      target.innerHTML = value;
      return;
    }
    if (value instanceof Node) target.appendChild(value);
  }

  function hydrate(el) {
    if (typeof global.hydrateIconsIn === 'function') {
      try { global.hydrateIconsIn(el); } catch (_) { /* noop */ }
    }
  }

  function lockScroll() {
    if (global.GlassScrollLock && typeof global.GlassScrollLock.lock === 'function') {
      global.GlassScrollLock.lock(LOCK_TOKEN);
    }
  }

  function unlockScroll() {
    if (global.GlassScrollLock && typeof global.GlassScrollLock.unlock === 'function') {
      global.GlassScrollLock.unlock(LOCK_TOKEN);
    }
  }

  function isOpen() {
    return stack.length > 0;
  }

  function getCurrentSheet() {
    const top = stack[stack.length - 1];
    if (!top) return null;
    return { id: top.id, overlay: top.overlay, sheet: top.sheet, options: top.options };
  }

  function buildSheet(options) {
    const overlay = document.createElement('div');
    overlay.className = 'app-sheet-overlay';
    overlay.dataset.sheetOverlay = options.id;

    const sheet = document.createElement('div');
    sheet.className = 'app-sheet';
    sheet.dataset.sheetId = options.id;
    sheet.setAttribute('role', 'dialog');
    sheet.setAttribute('aria-modal', 'true');
    sheet.setAttribute('aria-labelledby', `sheetTitle_${options.id}`);

    const header = document.createElement('header');
    header.className = 'app-sheet__header';

    const title = document.createElement('h2');
    title.className = 'app-sheet__title';
    title.id = `sheetTitle_${options.id}`;
    title.textContent = options.title || '';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'quick-add-close-btn';
    closeBtn.setAttribute('aria-label', '关闭');
    closeBtn.innerHTML = '<span class="ui-icon" data-icon="x"></span>';
    closeBtn.addEventListener('click', () => closeAppSheet());

    header.appendChild(title);
    header.appendChild(closeBtn);

    const content = document.createElement('div');
    content.className = 'app-sheet__content';
    content.dataset.sheetContent = options.id;

    if (typeof options.render === 'function') {
      options.render(content, sheet);
    } else if (options.content != null) {
      mountNode(content, options.content);
    }

    sheet.appendChild(header);
    sheet.appendChild(content);

    if (options.footer != null) {
      const footer = document.createElement('footer');
      footer.className = 'app-sheet__footer';
      mountNode(footer, options.footer);
      sheet.appendChild(footer);
    }

    overlay.appendChild(sheet);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && options.dismissOnOverlay !== false) closeAppSheet();
    });

    return { overlay, sheet };
  }

  function openSheet(entry) {
    document.body.appendChild(entry.overlay);
    requestAnimationFrame(() => {
      entry.overlay.classList.add('is-open');
      entry.sheet.classList.add('is-open');
    });
  }

  function openAppSheet(options = {}) {
    const id = String(options.id || `sheet_${Date.now()}`);

    if (stack.length === 0) lockScroll();
    else {
      const prev = stack[stack.length - 1];
      prev.overlay.classList.remove('is-open');
      prev.sheet.classList.remove('is-open');
      prev.overlay.hidden = true;
    }

    const built = buildSheet({ ...options, id });
    const entry = { id, overlay: built.overlay, sheet: built.sheet, options };
    stack.push(entry);
    hostOverlay = built.overlay;

    hydrate(built.sheet);
    openSheet(entry);

    if (typeof options.onOpen === 'function') {
      try { options.onOpen(built.sheet); } catch (err) { console.error('[AppSheet] onOpen failed:', err); }
    }

    return built.sheet;
  }

  function removeSheetEl(entry, { animate = true } = {}) {
    return new Promise((resolve) => {
      const { overlay, sheet } = entry;
      if (!animate || global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        overlay.remove();
        resolve();
        return;
      }
      overlay.classList.remove('is-open');
      sheet.classList.remove('is-open');
      const done = () => {
        overlay.removeEventListener('transitionend', done);
        overlay.remove();
        resolve();
      };
      overlay.addEventListener('transitionend', done);
      global.setTimeout(done, ENTER_MS + 40);
    });
  }

  function closeAppSheet() {
    if (!stack.length) return false;
    const entry = stack.pop();

    if (typeof entry.options.onClose === 'function') {
      try { entry.options.onClose(entry.sheet); } catch (err) { console.error('[AppSheet] onClose failed:', err); }
    }

    const hasRemaining = stack.length > 0;

    removeSheetEl(entry).then(() => {
      if (!hasRemaining) {
        unlockScroll();
        hostOverlay = null;
      }
    });

    if (hasRemaining) {
      const prev = stack[stack.length - 1];
      prev.overlay.hidden = false;
      openSheet(prev);
      hostOverlay = prev.overlay;
    }

    return true;
  }

  function closeAllAppSheets() {
    while (stack.length) {
      const entry = stack.pop();
      if (typeof entry.options.onClose === 'function') {
        try { entry.options.onClose(entry.sheet); } catch (_) { /* noop */ }
      }
      entry.overlay.remove();
    }
    unlockScroll();
    hostOverlay = null;
  }

  function handleNativeBack() {
    if (isOpen()) {
      closeAppSheet();
      return 'closed';
    }
    return 'none';
  }

  function installNativeBack() {
    const prior = global.__nativeBack;
    function chained() {
      const r = handleNativeBack();
      if (r === 'closed') return r;
      if (typeof prior === 'function' && prior !== chained) return prior();
      return 'none';
    }
    global.__nativeBack = chained;
  }

  const api = {
    openAppSheet,
    closeAppSheet,
    closeAllAppSheets,
    getCurrentSheet,
    isOpen,
    handleNativeBack
  };

  global.openAppSheet = openAppSheet;
  global.closeAppSheet = closeAppSheet;
  global.closeAllAppSheets = closeAllAppSheets;
  global.getCurrentSheet = getCurrentSheet;
  global.AppSheet = api;

  installNativeBack();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installNativeBack);
  }
  global.addEventListener('load', installNativeBack);
})(typeof window !== 'undefined' ? window : globalThis);
