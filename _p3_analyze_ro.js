const fs = require('fs');
const path = 'c:/Users/DELL/Desktop/health-main/index.html';
const t = fs.readFileSync(path, 'utf8');

function region(label, start, end) {
  const chunk = t.slice(start, end);
  const bytes = Buffer.byteLength(chunk);
  console.log(label, 'KB', (bytes / 1024).toFixed(1), 'lines', chunk.split('\n').length, 'startLine', t.slice(0, start).split('\n').length);
  return bytes;
}

// Structure landmarks
const styleOpen = t.indexOf('<style');
const styleClose = t.lastIndexOf('</style>'); // may be multiple
const styles = [];
let i = 0;
while (true) {
  const s = t.indexOf('<style', i);
  if (s < 0) break;
  const se = t.indexOf('>', s);
  const e = t.indexOf('</style>', se);
  styles.push([s, e + 8]);
  i = e + 8;
}
console.log('style_blocks', styles.length);
let cssBytes = 0;
styles.forEach(([a, b], n) => { cssBytes += region('css' + n, a, b); });

const bodyOpen = t.indexOf('<body');
const mainScriptOpen = t.indexOf('<script>\n// ====================') >= 0
  ? t.indexOf('<script>', 400000)
  : -1;
// find largest script
let best = null;
i = 0;
while (true) {
  const s = t.indexOf('<script', i);
  if (s < 0) break;
  const se = t.indexOf('>', s);
  const e = t.indexOf('</script>', se);
  const len = e - se;
  if (!best || len > best.len) best = { s, se, e, len };
  i = e + 9;
}
console.log('largest_script_at_line', t.slice(0, best.s).split('\n').length, 'KB', (best.len / 1024).toFixed(1));

const htmlBeforeMain = t.slice(0, best.s);
const htmlAfterMain = t.slice(best.e + 9);
region('before_main_script', 0, best.s);
region('main_script_incl_tags', best.s, best.e + 9);
region('after_main_script', best.e + 9, t.length);

// HTML markup only (body until main script), exclude style
let markupStart = t.indexOf('<body');
let markupEnd = best.s;
let markup = t.slice(markupStart, markupEnd);
// strip styles inside
styles.forEach(([a, b]) => {
  if (a >= markupStart && b <= markupEnd) {
    markup = markup.replace(t.slice(a, b), '');
  }
});
console.log('body_markup_approx_KB', (Buffer.byteLength(markup) / 1024).toFixed(1));

// Main script analysis
const code = t.slice(best.se + 1, best.e);

// Find loadData call position
const loadDataCall = code.indexOf('state = loadData()');
const firstBoot = code.indexOf("console.log('[BOOT]");
console.log('chars_before_loadData_call', loadDataCall);
console.log('chars_before_first_BOOT_log_stmt', firstBoot);
console.log('KB_source_before_loadData_in_script', (loadDataCall / 1024).toFixed(1));

// Count constructs in whole main script
const fnDecl = (code.match(/\bfunction\s+[A-Za-z_$]/g) || []).length;
const arrowTop = (code.match(/\nconst\s+\w+\s*=\s*(async\s*)?\(/g) || []).length;
const templateLiterals = (code.match(/`/g) || []).length / 2;
const regexLiterals = (code.match(/\/(?:\\.|\[(?:\\.|[^\]])*\]|[^\/\n])+\/[gimsuy]*/g) || []).length;
console.log('function_decls_approx', fnDecl);
console.log('template_backticks_half', Math.round(templateLiterals));
console.log('regex_approx', regexLiterals);

// Lazy caches sizes (function bodies still in source)
function measureFnBody(name) {
  const re = new RegExp('function\\s+' + name + '\\s*\\(\\)\\s*\\{');
  const m = re.exec(code);
  if (!m) return console.log(name, 'missing');
  // crude brace match
  let depth = 0, start = m.index + m[0].length - 1;
  for (let j = start; j < code.length; j++) {
    const c = code[j];
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        const kb = ((j - m.index + 1) / 1024).toFixed(1);
        console.log('lazy_' + name + '_KB', kb);
        return;
      }
    }
  }
}
['getFoodDB', 'getIconPaths', 'getSupplementFoodsData', 'getSmartRecipeLibraryData', 'getExerciseDB'].forEach(measureFnBody);

// Top-level statements before loadData (not inside functions) — sample lines
const pre = code.slice(0, loadDataCall);
const topLevelConst = (pre.match(/\n(?:const|let|var)\s+/g) || []).length;
const topLevelFn = (pre.match(/\nfunction\s+/g) || []).length;
console.log('pre_loadData_toplevel_const_let', topLevelConst);
console.log('pre_loadData_function_decls', topLevelFn);
console.log('pre_loadData_KB', (pre.length / 1024).toFixed(1));
