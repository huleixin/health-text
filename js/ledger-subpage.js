/**
 * Couple ledger / expense flows on canonical SubPage shell — Phase 3.
 */
(function (global) {
  'use strict';

  const IDS = {
    ENTRY: 'ledger_entry'
  };

  function getCurrent() {
    return typeof global.getCurrentSubPage === 'function' ? global.getCurrentSubPage() : null;
  }

  function isLedgerSubPageActive() {
    return typeof global.AppSubPage !== 'undefined'
      && global.AppSubPage.isOpen()
      && getCurrent()?.id === IDS.ENTRY;
  }

  function getLedgerFormHost() {
    return document.querySelector('.app-subpage[data-subpage-id="ledger_entry"] [data-ledger-form]');
  }

  function openLedgerSubPage(id, title, options = {}) {
    if (typeof global.openSubPage !== 'function') {
      console.error('[LedgerSubPage] openSubPage missing');
      return null;
    }
    const top = getCurrent();
    if (top?.id === id) {
      const shell = top.el?.querySelector('[data-ledger-form]') || top.el?.querySelector('.app-subpage__content');
      if (shell && typeof options.render === 'function') options.render(shell, top.el);
      if (typeof options.onOpen === 'function') options.onOpen(top.el);
      return top.el;
    }
    return global.openSubPage({
      id,
      title,
      render(contentEl, pageEl) {
        if (!contentEl.querySelector('[data-ledger-form]')) {
          contentEl.innerHTML = '<div class="ledger-form-shell" data-ledger-form></div>';
        }
        const shell = contentEl.querySelector('[data-ledger-form]');
        if (typeof options.render === 'function') options.render(shell || contentEl, pageEl);
      },
      footer: options.footer,
      onOpen(el) {
        if (typeof options.render === 'function') {
          const shell = el?.querySelector('[data-ledger-form]') || el?.querySelector('.app-subpage__content');
          if (shell) options.render(shell, el);
        }
        if (typeof options.onOpen === 'function') options.onOpen(el);
      },
      onClose: options.onClose,
      rightAction: options.rightAction
    });
  }

  function openLedgerEntrySubPage(title, options = {}) {
    return openLedgerSubPage(IDS.ENTRY, title || '记一笔', options);
  }

  function closeLedgerSubPageIfTop(id) {
    const cur = getCurrent();
    if (cur?.id === (id || IDS.ENTRY)) {
      global.closeSubPage();
      return true;
    }
    return false;
  }

  const api = {
    IDS,
    isLedgerSubPageActive,
    getLedgerFormHost,
    openLedgerSubPage,
    openLedgerEntrySubPage,
    closeLedgerSubPageIfTop
  };

  global.LEDGER_SUBPAGE_IDS = IDS;
  global.isLedgerSubPageActive = isLedgerSubPageActive;
  global.getLedgerFormHost = getLedgerFormHost;
  global.openLedgerSubPage = openLedgerSubPage;
  global.openLedgerEntrySubPage = openLedgerEntrySubPage;
  global.closeLedgerSubPageIfTop = closeLedgerSubPageIfTop;
  global.LedgerSubPage = api;
})(typeof window !== 'undefined' ? window : globalThis);
