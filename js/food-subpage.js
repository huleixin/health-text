/**
 * Food business flows on canonical SubPage shell — Phase 2.
 * Bridges existing food draft / AI / sync logic to openSubPage without duplicating business rules.
 */
(function (global) {
  'use strict';

  const IDS = {
    MANAGEMENT: 'food_management',
    SEARCH: 'food_search',
    SEARCH_OVERLAY: 'food_search_overlay',
    AI_FLOW: 'food_ai_flow',
    SYNC: 'food_sync'
  };

  function isFoodSubPageId(id) {
    return id && String(id).startsWith('food_');
  }

  function getCurrent() {
    return typeof global.getCurrentSubPage === 'function' ? global.getCurrentSubPage() : null;
  }

  function isFoodSubPageActive() {
    return typeof global.AppSubPage !== 'undefined'
      && global.AppSubPage.isOpen()
      && isFoodSubPageId(getCurrent()?.id);
  }

  function getFoodFlowContent() {
    const cur = getCurrent();
    if (!cur || !isFoodSubPageId(cur.id)) return null;
    const host = cur.el?.querySelector('[data-food-flow-content]');
    return host || cur.el?.querySelector('.app-subpage__content');
  }

  function getFoodSyncFormHost() {
    return document.querySelector('.app-subpage[data-subpage-id="food_sync"] [data-food-sync-form]');
  }

  function openFoodSubPage(id, title, options = {}) {
    if (typeof global.openSubPage !== 'function') {
      console.error('[FoodSubPage] openSubPage missing');
      return null;
    }
    const top = getCurrent();
    if (top?.id === id) {
      const shell = top.el?.querySelector('[data-food-flow-content]') || top.el?.querySelector('.app-subpage__content');
      if (shell && typeof options.render === 'function') options.render(shell, top.el);
      if (typeof options.onOpen === 'function') options.onOpen(top.el);
      return top.el;
    }
    const openFn = options.replace && typeof global.replaceSubPage === 'function'
      ? global.replaceSubPage
      : global.openSubPage;
    return openFn({
      id,
      title,
      render(contentEl, pageEl) {
        if (!contentEl.querySelector('[data-food-flow-content]')) {
          contentEl.innerHTML = '<div class="food-flow-shell qa-modal-section" data-food-flow-content></div>';
        }
        const shell = contentEl.querySelector('[data-food-flow-content]');
        if (typeof options.render === 'function') options.render(shell || contentEl, pageEl);
      },
      footer: options.footer,
      onOpen(el) {
        // Do not re-run options.render here — build already rendered once.
        // Re-rendering duplicates listeners and flashes content.
        if (typeof options.onOpen === 'function') options.onOpen(el);
      },
      onClose: options.onClose,
      onBack: options.onBack,
      rightAction: options.rightAction
    });
  }

  function closeFoodSubPageAll() {
    while (isFoodSubPageActive()) {
      global.closeSubPage();
    }
  }

  function closeFoodSubPageIfTop(id) {
    const cur = getCurrent();
    if (cur?.id === id) {
      global.closeSubPage();
      return true;
    }
    return false;
  }

  function openFoodManagementSubPage() {
    return openFoodSubPage(IDS.MANAGEMENT, '饮食记录', {
      render(shell) {
        shell.innerHTML = '<div class="food-management-sub" id="foodRecordDetailHost"></div>';
        if (typeof global.renderFoodRecordDetailInto === 'function') {
          global.renderFoodRecordDetailInto(shell.querySelector('#foodRecordDetailHost'));
        }
      },
      onClose() {
        if (typeof global.activeRecordDetailType !== 'undefined') global.activeRecordDetailType = '';
      }
    });
  }

  function openFoodSyncPromptSubPage(title) {
    return ensureFoodSyncSubPage(title || '餐饮订单饮食同步');
  }

  function ensureFoodSyncSubPage(title, options = {}) {
    const t = title || '餐饮订单饮食确认';
    const top = getCurrent();
    if (top?.id === IDS.SYNC) {
      if (options.title !== false) {
        const titleEl = top.el?.querySelector('.app-subpage__title');
        if (titleEl && t) titleEl.textContent = t;
      }
      return top.el;
    }
    return openFoodSubPage(IDS.SYNC, t, {
      replace: !!options.replace,
      render(shell) {
        if (!shell.querySelector('[data-food-sync-form]')) {
          shell.innerHTML = '<div class="food-sync-form-shell" data-food-sync-form></div>';
        }
      }
    });
  }

  const api = {
    IDS,
    isFoodSubPageId,
    isFoodSubPageActive,
    getFoodFlowContent,
    getFoodSyncFormHost,
    openFoodSubPage,
    closeFoodSubPageAll,
    closeFoodSubPageIfTop,
    openFoodManagementSubPage,
    ensureFoodSyncSubPage,
    openFoodSyncPromptSubPage
  };

  global.FOOD_SUBPAGE_IDS = IDS;
  global.isFoodSubPageActive = isFoodSubPageActive;
  global.getFoodFlowContent = getFoodFlowContent;
  global.getFoodSyncFormHost = getFoodSyncFormHost;
  global.openFoodSubPage = openFoodSubPage;
  global.closeFoodSubPageAll = closeFoodSubPageAll;
  global.closeFoodSubPageIfTop = closeFoodSubPageIfTop;
  global.openFoodManagementSubPage = openFoodManagementSubPage;
  global.ensureFoodSyncSubPage = ensureFoodSyncSubPage;
  global.openFoodSyncPromptSubPage = openFoodSyncPromptSubPage;
  global.FoodSubPage = api;
})(typeof window !== 'undefined' ? window : globalThis);
