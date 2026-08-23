/**
 * Mobile Dialog shell — Phase 1 foundation.
 * Confirm / alert only — not food edit, AI results, recipes, or long forms.
 */
(function (global) {
  'use strict';

  const LOCK_TOKEN = 'app-dialog';

  /** @type {Array<{id:string,overlay:HTMLElement,dialog:HTMLElement,options:object}>} */
  const stack = [];

  function mountNode(target, value) {
    if (value == null) return;
    if (typeof value === 'string') {
      target.innerHTML = value;
      return;
    }
    if (value instanceof Node) target.appendChild(value);
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

  function getCurrentDialog() {
    const top = stack[stack.length - 1];
    if (!top) return null;
    return { id: top.id, overlay: top.overlay, dialog: top.dialog, options: top.options };
  }

  function buildDialog(options) {
    const overlay = document.createElement('div');
    overlay.className = 'app-dialog-overlay';
    overlay.dataset.dialogOverlay = options.id;

    const dialog = document.createElement('div');
    dialog.className = 'app-dialog';
    dialog.dataset.dialogId = options.id;
    dialog.setAttribute('role', 'alertdialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', `dialogTitle_${options.id}`);

    const title = document.createElement('h2');
    title.className = 'app-dialog__title';
    title.id = `dialogTitle_${options.id}`;
    title.textContent = options.title || '';

    const body = document.createElement('div');
    body.className = 'app-dialog__body';
    if (typeof options.render === 'function') {
      options.render(body, dialog);
    } else if (options.message != null) {
      mountNode(body, options.message);
    } else if (options.content != null) {
      mountNode(body, options.content);
    }

    const actions = document.createElement('div');
    actions.className = 'app-dialog__actions';

    const cancelLabel = options.cancelLabel || '取消';
    const confirmLabel = options.confirmLabel || '确定';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'btn btn-ghost';
    cancelBtn.textContent = cancelLabel;
    cancelBtn.addEventListener('click', () => {
      if (typeof options.onCancel === 'function') options.onCancel(dialog);
      closeAppDialog();
    });

    const confirmBtn = document.createElement('button');
    confirmBtn.type = 'button';
    confirmBtn.className = options.danger ? 'btn btn-danger' : 'btn btn-gold';
    confirmBtn.textContent = confirmLabel;
    confirmBtn.addEventListener('click', () => {
      if (typeof options.onConfirm === 'function') options.onConfirm(dialog);
      closeAppDialog();
    });

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);

    dialog.appendChild(title);
    dialog.appendChild(body);
    dialog.appendChild(actions);
    overlay.appendChild(dialog);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay && options.dismissOnOverlay !== false) {
        if (typeof options.onCancel === 'function') options.onCancel(dialog);
        closeAppDialog();
      }
    });

    return { overlay, dialog };
  }

  function openDialog(entry) {
    document.body.appendChild(entry.overlay);
    requestAnimationFrame(() => entry.overlay.classList.add('is-open'));
  }

  function openAppDialog(options = {}) {
    const id = String(options.id || `dialog_${Date.now()}`);

    if (stack.length === 0) lockScroll();
    else {
      const prev = stack[stack.length - 1];
      prev.overlay.classList.remove('is-open');
      prev.overlay.hidden = true;
    }

    const built = buildDialog({ ...options, id });
    const entry = { id, overlay: built.overlay, dialog: built.dialog, options };
    stack.push(entry);

    openDialog(entry);

    if (typeof options.onOpen === 'function') {
      try { options.onOpen(built.dialog); } catch (err) { console.error('[AppDialog] onOpen failed:', err); }
    }

    return built.dialog;
  }

  function removeDialogEl(entry) {
    entry.overlay.remove();
  }

  function closeAppDialog() {
    if (!stack.length) return false;
    const entry = stack.pop();

    if (typeof entry.options.onClose === 'function') {
      try { entry.options.onClose(entry.dialog); } catch (err) { console.error('[AppDialog] onClose failed:', err); }
    }

    const hasRemaining = stack.length > 0;
    removeDialogEl(entry);

    if (!hasRemaining) unlockScroll();
    else {
      const prev = stack[stack.length - 1];
      prev.overlay.hidden = false;
      openDialog(prev);
    }

    return true;
  }

  function closeAllAppDialogs() {
    while (stack.length) {
      const entry = stack.pop();
      if (typeof entry.options.onClose === 'function') {
        try { entry.options.onClose(entry.dialog); } catch (_) { /* noop */ }
      }
      entry.overlay.remove();
    }
    unlockScroll();
  }

  function handleNativeBack() {
    if (isOpen()) {
      const top = stack[stack.length - 1];
      if (typeof top.options.onCancel === 'function') top.options.onCancel(top.dialog);
      closeAppDialog();
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
    openAppDialog,
    closeAppDialog,
    closeAllAppDialogs,
    getCurrentDialog,
    isOpen,
    handleNativeBack
  };

  global.openAppDialog = openAppDialog;
  global.closeAppDialog = closeAppDialog;
  global.closeAllAppDialogs = closeAllAppDialogs;
  global.getCurrentDialog = getCurrentDialog;
  global.AppDialog = api;

  installNativeBack();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installNativeBack);
  }
  global.addEventListener('load', installNativeBack);
})(typeof window !== 'undefined' ? window : globalThis);
