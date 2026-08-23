/**
 * Mobile SubPage shell — Phase 1 foundation.
 * Full-screen overlay sub-pages with lightweight stack + Android back integration.
 */
(function (global) {
  'use strict';

  const HOST_ID = 'appSubPageHost';
  const LOCK_TOKEN = 'app-subpage';
  const ENTER_MS = 220;

  /** @type {Array<{id:string,el:HTMLElement,options:object}>} */
  const stack = [];
  let originAppPage = null;
  let viewportBound = false;

  function getHost() {
    return document.getElementById(HOST_ID);
  }

  function getActiveAppPageId() {
    if (typeof global.activeAppPage === 'string') return global.activeAppPage;
    const el = document.querySelector('.app-page.active');
    return el?.dataset?.appPage || null;
  }

  function ensureHost() {
    let host = getHost();
    if (host) return host;
    host = document.createElement('div');
    host.id = HOST_ID;
    host.className = 'app-subpage-host';
    host.hidden = true;
    host.setAttribute('aria-hidden', 'true');
    document.body.appendChild(host);
    return host;
  }

  function isOpen() {
    return stack.length > 0;
  }

  function getCurrentSubPage() {
    const top = stack[stack.length - 1];
    if (!top) return null;
    return { id: top.id, el: top.el, options: top.options };
  }

  function setBodyActive(active) {
    document.body.classList.toggle('app-subpage-active', active);
  }

  function lockScroll() {
    if (global.GlassScrollLock && typeof global.GlassScrollLock.lock === 'function') {
      global.GlassScrollLock.lock(LOCK_TOKEN);
    } else {
      document.documentElement.classList.add('glass-scroll-locked');
      document.body.classList.add('glass-scroll-locked');
    }
  }

  function unlockScroll() {
    if (global.GlassScrollLock && typeof global.GlassScrollLock.unlock === 'function') {
      global.GlassScrollLock.unlock(LOCK_TOKEN);
    } else {
      document.documentElement.classList.remove('glass-scroll-locked');
      document.body.classList.remove('glass-scroll-locked');
    }
  }

  function mountNode(target, value) {
    if (value == null) return;
    if (typeof value === 'string') {
      target.innerHTML = value;
      return;
    }
    if (value instanceof Node) {
      target.appendChild(value);
    }
  }

  function bindViewport(host) {
    if (viewportBound || !window.visualViewport) return;
    viewportBound = true;
    const sync = () => {
      if (!isOpen()) return;
      const vv = window.visualViewport;
      host.style.top = `${vv.offsetTop}px`;
      host.style.left = `${vv.offsetLeft}px`;
      host.style.width = `${vv.width}px`;
      host.style.height = `${vv.height}px`;
    };
    window.visualViewport.addEventListener('resize', sync);
    window.visualViewport.addEventListener('scroll', sync);
    sync();
  }

  function resetViewport(host) {
    host.style.top = '';
    host.style.left = '';
    host.style.width = '';
    host.style.height = '';
  }

  function hydrate(el) {
    if (typeof global.hydrateIconsIn === 'function') {
      try { global.hydrateIconsIn(el); } catch (_) { /* noop */ }
    }
  }

  function buildSubPageEl(options) {
    const el = document.createElement('div');
    el.className = 'app-subpage';
    el.dataset.subpageId = options.id;
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-modal', 'true');
    el.setAttribute('aria-labelledby', `subpageTitle_${options.id}`);

    const header = document.createElement('header');
    header.className = 'app-subpage__header';

    const backBtn = document.createElement('button');
    backBtn.type = 'button';
    backBtn.className = 'app-subpage__back';
    backBtn.setAttribute('aria-label', '返回');
    backBtn.textContent = '‹ 返回';
    backBtn.addEventListener('click', () => closeSubPage());

    const title = document.createElement('h1');
    title.className = 'app-subpage__title';
    title.id = `subpageTitle_${options.id}`;
    title.textContent = options.title || '';

    header.appendChild(backBtn);
    header.appendChild(title);

    if (options.rightAction) {
      const action = document.createElement('button');
      action.type = 'button';
      action.className = 'app-subpage__action';
      action.setAttribute('aria-label', options.rightAction.ariaLabel || '操作');
      if (typeof options.rightAction.html === 'string') {
        action.innerHTML = options.rightAction.html;
      } else {
        action.textContent = options.rightAction.label || '';
      }
      if (typeof options.rightAction.onClick === 'function') {
        action.addEventListener('click', (e) => options.rightAction.onClick(e, el));
      }
      header.appendChild(action);
    } else {
      const spacer = document.createElement('div');
      spacer.className = 'app-subpage__action-spacer';
      spacer.setAttribute('aria-hidden', 'true');
      header.appendChild(spacer);
    }

    const content = document.createElement('div');
    content.className = 'app-subpage__content';
    content.dataset.subpageContent = options.id;

    if (typeof options.render === 'function') {
      options.render(content, el);
    } else if (options.content != null) {
      mountNode(content, options.content);
    }

    el.appendChild(header);
    el.appendChild(content);

    if (options.footer != null) {
      const footer = document.createElement('footer');
      footer.className = 'app-subpage__footer';
      mountNode(footer, options.footer);
      el.appendChild(footer);
    }

    content.addEventListener('focusin', (e) => {
      const target = e.target;
      if (!target || !(target instanceof HTMLElement)) return;
      if (target.matches('input,textarea,select,[contenteditable="true"]')) {
        requestAnimationFrame(() => {
          try { target.scrollIntoView({ block: 'center', behavior: 'smooth' }); } catch (_) { /* noop */ }
        });
      }
    });

    return el;
  }

  function showSubPage(el) {
    stack.forEach((entry) => {
      if (entry.el !== el) entry.el.hidden = true;
    });
    el.hidden = false;
    requestAnimationFrame(() => {
      el.classList.add('is-visible');
    });
  }

  function openSubPage(options = {}) {
    const id = String(options.id || `subpage_${Date.now()}`);
    const host = ensureHost();

    if (stack.length === 0) {
      originAppPage = getActiveAppPageId();
      host.hidden = false;
      host.setAttribute('aria-hidden', 'false');
      setBodyActive(true);
      lockScroll();
      bindViewport(host);
    } else {
      const prev = stack[stack.length - 1];
      if (prev) prev.el.hidden = true;
    }

    const el = buildSubPageEl({ ...options, id });
    host.appendChild(el);
    stack.push({ id, el, options });

    hydrate(el);
    showSubPage(el);

    if (typeof options.onOpen === 'function') {
      try { options.onOpen(el); } catch (err) { console.error('[SubPage] onOpen failed:', err); }
    }

    return el;
  }

  function removeSubPageEl(entry, { animate = true } = {}) {
    return new Promise((resolve) => {
      const el = entry.el;
      if (!animate || global.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        el.remove();
        resolve();
        return;
      }
      el.classList.remove('is-visible');
      el.classList.add('is-leaving');
      const done = () => {
        el.removeEventListener('transitionend', done);
        el.remove();
        resolve();
      };
      el.addEventListener('transitionend', done);
      global.setTimeout(done, ENTER_MS + 40);
    });
  }

  function closeSubPage() {
    if (!stack.length) return false;
    const entry = stack.pop();
    const host = getHost();

    if (typeof entry.options.onClose === 'function') {
      try { entry.options.onClose(entry.el); } catch (err) { console.error('[SubPage] onClose failed:', err); }
    }

    const hasRemaining = stack.length > 0;

    if (!hasRemaining) {
      setBodyActive(false);
      unlockScroll();
    }

    removeSubPageEl(entry).then(() => {
      if (!hasRemaining) {
        if (host) {
          host.hidden = true;
          host.setAttribute('aria-hidden', 'true');
          resetViewport(host);
        }
        originAppPage = null;
      }
    });

    if (hasRemaining) {
      const prev = stack[stack.length - 1];
      prev.el.hidden = false;
      showSubPage(prev.el);
    }

    return true;
  }

  function closeAllSubPages() {
    while (stack.length) {
      const entry = stack.pop();
      if (typeof entry.options.onClose === 'function') {
        try { entry.options.onClose(entry.el); } catch (_) { /* noop */ }
      }
      entry.el.remove();
    }
    const host = getHost();
    if (host) {
      host.hidden = true;
      host.setAttribute('aria-hidden', 'true');
      resetViewport(host);
    }
    setBodyActive(false);
    unlockScroll();
    originAppPage = null;
  }

  function getOriginAppPage() {
    return originAppPage;
  }

  /** Android WebView back — SubPage layer (chained after AppDialog / AppSheet via installNativeBack). */
  function handleNativeBack() {
    if (isOpen()) {
      closeSubPage();
      return 'closed';
    }
    return 'none';
  }

  function handleLegacyOverlayBack() {
    const quickPanel = document.getElementById('quickAddPanel');
    if (quickPanel && quickPanel.classList.contains('active')) {
      if (typeof global.closeQuickAddPanel === 'function') global.closeQuickAddPanel();
      return 'closed';
    }

    if (global.GlassUI && typeof global.GlassUI.closeAll === 'function') {
      const hadPicker = !!document.querySelector('.glass-menu.open,.glass-date-panel,.glass-date-field.open');
      if (hadPicker) {
        global.GlassUI.closeAll();
        return 'closed';
      }
    }

    const editPopover = document.getElementById('editPopover');
    if (editPopover && editPopover.classList.contains('show')) {
      if (typeof global.closeEditPopover === 'function') global.closeEditPopover();
      else editPopover.classList.remove('show');
      return 'closed';
    }

    const modal = document.querySelector('.modal-overlay.show,.ledger-dt-overlay.show');
    if (modal) {
      if (modal.id && typeof global.closeModal === 'function') {
        global.closeModal(modal.id);
      } else {
        modal.classList.remove('show');
        if (global.GlassScrollLock) global.GlassScrollLock.unlock(`modal:${modal.id}`);
      }
      return 'closed';
    }

    if (document.body.classList.contains('child-page-active')) {
      const backBtn = document.querySelector('.app-page.active .sub-page-back');
      if (backBtn) {
        backBtn.click();
        return 'closed';
      }
    }

    return 'none';
  }

  function installNativeBack() {
    const prior = global.__nativeBack;
    function chained() {
      const r = handleNativeBack();
      if (r === 'closed') return r;
      if (typeof prior === 'function' && prior !== chained) {
        const pr = prior();
        if (pr === 'closed') return pr;
      }
      return handleLegacyOverlayBack();
    }
    global.__nativeBack = chained;
  }

  function openSubPageLayoutTest() {
    const blocks = Array.from({ length: 24 }, (_, i) =>
      `<p class="app-subpage-test-line">滚动测试段落 ${i + 1}：用于验证 Content 区域独立滚动，Header 与 Footer 保持固定。</p>`
    ).join('');

    openSubPage({
      id: '__layout_test__',
      title: '页面测试',
      content: `
        <div class="app-subpage-test">
          <p class="app-subpage-test-lead">SubPage Layout Test</p>
          <label class="form-group">
            <span class="form-group label-like">输入框（键盘测试）</span>
            <input class="form-input" type="text" placeholder="点击唤起输入法" autocomplete="off">
          </label>
          ${blocks}
        </div>`,
      footer: `
        <button type="button" class="btn btn-ghost app-subpage-test-cancel">取消</button>
        <button type="button" class="btn btn-gold app-subpage-test-save">保存</button>`,
      onOpen(el) {
        el.querySelector('.app-subpage-test-cancel')?.addEventListener('click', () => closeSubPage());
        el.querySelector('.app-subpage-test-save')?.addEventListener('click', () => {
          if (typeof global.showToast === 'function') global.showToast('测试保存', 'success');
          else console.info('[SubPageTest] save');
        });
      }
    });
  }

  const api = {
    openSubPage,
    closeSubPage,
    closeAllSubPages,
    getCurrentSubPage,
    getOriginAppPage,
    isOpen,
    handleNativeBack,
    openSubPageLayoutTest
  };

  global.openSubPage = openSubPage;
  global.closeSubPage = closeSubPage;
  global.closeAllSubPages = closeAllSubPages;
  global.getCurrentSubPage = getCurrentSubPage;
  global.getOriginAppPage = getOriginAppPage;
  global.AppSubPage = api;

  installNativeBack();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installNativeBack);
  }
  global.addEventListener('load', installNativeBack);

  const isDevContext = /(?:^|[?&])dev=1(?:&|$)/.test(global.location.search)
    || global.location.hostname === 'localhost'
    || global.location.hostname === '127.0.0.1'
    || global.location.protocol === 'file:';

  if (isDevContext) {
    global.__devOpenSubPageTest = openSubPageLayoutTest;
    global.__devOpenSubPageStackTest = function __devOpenSubPageStackTest() {
      openSubPage({
        id: '__stack_a__',
        title: '栈测试 A',
        content: '<p class="app-subpage-test-lead">第一层 SubPage。点击下方进入 B。</p>',
        footer: '<button type="button" class="btn btn-gold" id="stackOpenB">打开 B</button>',
        onOpen(el) {
          el.querySelector('#stackOpenB')?.addEventListener('click', () => {
            openSubPage({
              id: '__stack_b__',
              title: '栈测试 B',
              content: '<p class="app-subpage-test-lead">第二层 SubPage。返回应回到 A。</p>'
            });
          });
        }
      });
    };
  }
})(typeof window !== 'undefined' ? window : globalThis);
