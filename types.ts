/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Page = 'home' | 'about' | 'histbench' | 'impact' | 'authors' | 'submit';
export type Language = 'en' | 'zh';

// Generic key type for page titles or other page-specific translations
export type PageKey = Page | 'site';