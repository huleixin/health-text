/**
 * Health record flows on canonical SubPage shell — Phase 3.
 * Bridges water/weight/exercise/steps/sleep/voice/more/order flows to openSubPage.
 */
(function (global) {
  'use strict';

  const IDS = {
    WATER: 'water_record',
    WEIGHT: 'weight_record',
    EXERCISE: 'exercise_record',
    STEPS: 'steps_record',
    SLEEP: 'sleep_record',
    VOICE: 'voice_record',
    MORE: 'more_records',
    MORE_ITEM: 'more_record_item',
    ORDER_RECOGNITION: 'order_recognition',
    WATER_MGMT: 'water_management',
    WEIGHT_MGMT: 'weight_management',
    EXERCISE_MGMT: 'exercise_management',
    STEPS_MGMT: 'steps_management',
    SLEEP_MGMT: 'sleep_management'
  };

  const MGMT_TYPES = ['water', 'weight', 'exercise', 'steps', 'sleep'];

  const MGMT_ID_BY_TYPE = {
    water: IDS.WATER_MGMT,
    weight: IDS.WEIGHT_MGMT,
    exercise: IDS.EXERCISE_MGMT,
    steps: IDS.STEPS_MGMT,
    sleep: IDS.SLEEP_MGMT
  };

  const MGMT_TITLE_BY_TYPE = {
    water: '饮水记录',
    weight: '体重记录',
    exercise: '运动记录',
    steps: '步数记录',
    sleep: '睡眠记录'
  };

  const RECORD_ID_BY_TYPE = {
    water: IDS.WATER,
    weight: IDS.WEIGHT,
    exercise: IDS.EXERCISE,
    steps: IDS.STEPS,
    sleep: IDS.SLEEP
  };

  const ALL_IDS = new Set(Object.values(IDS));

  function isRecordSubPageId(id) {
    return id && ALL_IDS.has(String(id));
  }

  function getCurrent() {
    return typeof global.getCurrentSubPage === 'function' ? global.getCurrentSubPage() : null;
  }

  function isRecordSubPageActive() {
    return typeof global.AppSubPage !== 'undefined'
      && global.AppSubPage.isOpen()
      && isRecordSubPageId(getCurrent()?.id);
  }

  function getRecordFlowContent() {
    const cur = getCurrent();
    if (!cur || !isRecordSubPageId(cur.id)) return null;
    const host = cur.el?.querySelector('[data-record-flow-content]');
    return host || cur.el?.querySelector('.app-subpage__content');
  }

  function getOrderRecognitionContent() {
    const el = document.querySelector('.app-subpage[data-subpage-id="order_recognition"] [data-record-flow-content]');
    return el || document.querySelector('.app-subpage[data-subpage-id="order_recognition"] .app-subpage__content');
  }

  function openRecordSubPage(id, title, options = {}) {
    if (typeof global.openSubPage !== 'function') {
      console.error('[RecordSubPage] openSubPage missing');
      return null;
    }
    const top = getCurrent();
    if (top?.id === id) {
      const shell = top.el?.querySelector('[data-record-flow-content]') || top.el?.querySelector('.app-subpage__content');
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
        if (!contentEl.querySelector('[data-record-flow-content]')) {
          contentEl.innerHTML = '<div class="record-flow-shell qa-modal-section" data-record-flow-content></div>';
        }
        const shell = contentEl.querySelector('[data-record-flow-content]');
        if (typeof options.render === 'function') options.render(shell || contentEl, pageEl);
      },
      footer: options.footer,
      onOpen(el) {
        // Single render only — avoid duplicate listeners / content flash.
        if (typeof options.onOpen === 'function') options.onOpen(el);
      },
      onClose: options.onClose,
      rightAction: options.rightAction
    });
  }

  function closeRecordSubPageAll() {
    while (isRecordSubPageActive()) {
      global.closeSubPage();
    }
  }

  function closeRecordSubPageIfTop(id) {
    const cur = getCurrent();
    if (cur?.id === id) {
      global.closeSubPage();
      return true;
    }
    return false;
  }

  function isRecordManagementOpen(type) {
    const id = MGMT_ID_BY_TYPE[type];
    return id && getCurrent()?.id === id;
  }

  function refreshRecordManagementSubPage(type) {
    const id = MGMT_ID_BY_TYPE[type];
    if (!id || getCurrent()?.id !== id) return false;
    const host = document.querySelector(`.app-subpage[data-subpage-id="${id}"] #${type}RecordDetailHost`);
    if (!host || typeof global.getActiveProfile !== 'function') return false;
    const p = global.getActiveProfile();
    const renderMap = {
      water: () => global.renderWaterRecordDetail?.(host, p),
      weight: () => global.renderWeightRecordDetail?.(host, p),
      exercise: () => global.renderExerciseRecordDetail?.(host, p),
      steps: () => global.renderStepsRecordDetail?.(host, p),
      sleep: () => global.renderSleepRecordDetail?.(host, p)
    };
    renderMap[type]?.();
    return true;
  }

  function closeRecordEntrySubPage(type) {
    const id = RECORD_ID_BY_TYPE[type];
    if (id) closeRecordSubPageIfTop(id);
    refreshRecordManagementSubPage(type);
    if (typeof global.renderOpenRecordDetail === 'function') global.renderOpenRecordDetail();
  }

  function openRecordManagementSubPage(type) {
    const id = MGMT_ID_BY_TYPE[type];
    const title = MGMT_TITLE_BY_TYPE[type];
    if (!id || !title) return null;
    return openRecordSubPage(id, title, {
      render(shell) {
        shell.innerHTML = `<div class="record-management-sub" id="${type}RecordDetailHost"></div>`;
        const host = shell.querySelector(`#${type}RecordDetailHost`);
        const p = typeof global.getActiveProfile === 'function' ? global.getActiveProfile() : null;
        const renderMap = {
          water: () => global.renderWaterRecordDetail?.(host, p),
          weight: () => global.renderWeightRecordDetail?.(host, p),
          exercise: () => global.renderExerciseRecordDetail?.(host, p),
          steps: () => global.renderStepsRecordDetail?.(host, p),
          sleep: () => global.renderSleepRecordDetail?.(host, p)
        };
        renderMap[type]?.();
      },
      onClose() {
        if (typeof global.activeRecordDetailType !== 'undefined') global.activeRecordDetailType = '';
      }
    });
  }

  const api = {
    IDS,
    MGMT_TYPES,
    isRecordSubPageId,
    isRecordSubPageActive,
    getRecordFlowContent,
    getOrderRecognitionContent,
    openRecordSubPage,
    closeRecordSubPageAll,
    closeRecordSubPageIfTop,
    isRecordManagementOpen,
    refreshRecordManagementSubPage,
    closeRecordEntrySubPage,
    openRecordManagementSubPage
  };

  global.RECORD_SUBPAGE_IDS = IDS;
  global.isRecordSubPageActive = isRecordSubPageActive;
  global.getRecordFlowContent = getRecordFlowContent;
  global.getOrderRecognitionContent = getOrderRecognitionContent;
  global.openRecordSubPage = openRecordSubPage;
  global.closeRecordSubPageAll = closeRecordSubPageAll;
  global.closeRecordSubPageIfTop = closeRecordSubPageIfTop;
  global.isRecordManagementOpen = isRecordManagementOpen;
  global.refreshRecordManagementSubPage = refreshRecordManagementSubPage;
  global.closeRecordEntrySubPage = closeRecordEntrySubPage;
  global.openRecordManagementSubPage = openRecordManagementSubPage;
  global.RecordSubPage = api;
})(typeof window !== 'undefined' ? window : globalThis);
