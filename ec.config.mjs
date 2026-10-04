// Copyright © SixtyFPS GmbH <info@slint.dev>
// SPDX-License-Identifier: MIT
//
// Expressive Code configuration. This file MUST live at the project root and be
// picked up by `@astrojs/starlight` automatically — keeping it separate from
// `astro.config.mjs` is required because parts of the configuration (the
// plugin hooks) are non-serializable functions, and Astro's build pipeline
// JSON-stringifies any option it finds in `astro.config.mjs`. Splitting the
// config out lets `astro-expressive-code` read it through its own loader.
// See: <https://docs.astro.build/en/guides/markdown-content/#assigning-a-default-frontmatter>

import starlightExpressiveCode from './packages/common-files/src/utils/starlight-expressive-code.mjs';

/** @type {import("@expressive-code/core").ExpressiveCodeConfig} */
export default starlightExpressiveCode();
