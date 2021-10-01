import immediate from 'immediate';
// @ts-ignore
import * as _process from 'process/browser.js';

export default { ..._process, nextTick: immediate };
