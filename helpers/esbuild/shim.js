import { Buffer } from 'buffer';
import process from 'process';

const _global = typeof window !== 'undefined' ? window : global;

export { Buffer, process, _global as global };
