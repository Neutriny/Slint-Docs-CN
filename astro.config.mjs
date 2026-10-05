// @ts-check
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

import {
  BASE_PATH,
  CPP_BASE_URL,
  NODEJS_BASE_URL,
  PYTHON_BASE_URL,
  //RUST_SLINT_CRATE_URL,
} from './src/utils/site-config';

// Expressive Code configuration lives in the project-root `ec.config.mjs`
// (see that file for the rationale). `starlight-expressive-code.mjs` is part
// of the local vendored copy of upstream `@slint/common-files` under
// `packages/common-files/src/`; it ships the Slint TextMate grammar plus
// four custom hooks (side border, language label, hidden `# ` lines,
// SlintPad run button).

const projectRoot = path.dirname(fileURLToPath(import.meta.url));
// The local @slint/common-files package is shipped as `packages/common-files`.
// Map `@slint/common-files/src/...` to that folder so MDX imports of the SC,
// Link, SlintProperty, etc. components resolve without a pnpm workspace.
const commonFilesSrc = path.resolve(projectRoot, 'packages/common-files/src');

const sidebarHref = (/** @type {string} */ url) =>
  url.startsWith(BASE_PATH) ? url.slice(BASE_PATH.length) : url;

// https://astro.build/config
export default defineConfig({
  site: 'https://neutriny.github.io/',
  base: 'Slint-Docs-CN',
  integrations: [
    starlight({
      title: 'Slint Docs',
      logo: {
        src: './src/assets/slint-logo-small-light.svg',
      },
      customCss: [
        './src/styles/starlight-slint-custom.css',
        './src/styles/starlight-slint-theme.css',
        './src/styles/sls-ids.css',
      ],
      components: {
        Footer: './src/components/Footer.astro',
        Header: './src/components/HeaderSlintDocs.astro',
        Banner: './src/components/Banner.astro',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Neutriny/Slint-Docs-CN',
        },
        {
          icon: 'open-book',
          label: 'Slint',
          href: 'https://docs.slint.dev/latest/docs/slint/',
        },
      ],
      plugins: [],
      sidebar: [
        {
          label: '指南',
          link: '',
          items: [
            { label: '总览', slug: 'index' },
            'guide/getting-started',
            {
              label: '开发',
              collapsed: true,
              items: [{ autogenerate: { directory: 'guide/development' } }],
            },
            {
              label: '平台',
              collapsed: true,
              items: [{ autogenerate: { directory: 'guide/platforms' } }],
            },
            {
              label: '工具',
              collapsed: true,
              items: [
                'guide/tooling/vscode',
                'guide/tooling/manual-setup',
                {
                  label: '其他编辑器',
                  collapsed: true,
                  items: [
                    'guide/tooling/kate',
                    'guide/tooling/qt-creator',
                    'guide/tooling/helix',
                    'guide/tooling/neo-vim',
                    'guide/tooling/sublime-text',
                    'guide/tooling/jetbrains-ide',
                    'guide/tooling/zed',
                  ],
                },
                'guide/tooling/live-preview',
                'guide/tooling/slint-viewer',
                'guide/tooling/figma-inspector',
                'guide/tooling/ai-coding-assistants',
              ],
            },
            {
              label: '语言概念',
              collapsed: true,
              items: [
                {
                  autogenerate: {
                    directory: 'guide/language/concepts',
                  },
                },
                {
                  autogenerate: {
                    directory: 'guide/language/coding',
                  },
                ],
              },
            },
            {
              label: '实验性功能',
              collapsed: true,
              items: [{ autogenerate: { directory: 'guide/experimental' } }],
            },
            {
              label: '后端与渲染器',
              collapsed: true,
              items: [
                {
                  autogenerate: { directory: 'guide/backends-and-renderers' },
                ],
              },
            },
          ],
        },
        {
          label: '参考',
          link: 'reference/overview',
          items: [
            'reference/overview',
            {
              label: '语言规范',
              collapsed: true,
              items: [
                'reference/language',
                'reference/language/source-files',
                'reference/language/lexical-structure',
                'reference/language/file-structure',
                'reference/language/name-resolution',
                'reference/language/imports',
                'reference/language/exports',
                'reference/language/properties',
                'reference/language/bindings',
                'reference/language/two-way-bindings',
                'reference/language/expressions',
                'reference/language/operators',
                'reference/language/type-conversions',
                'reference/language/statements',
                'reference/language/functions',
                'reference/language/callbacks',
                'reference/language/deprecation',
                'reference/language/evaluation-and-purity',
                'reference/language/structs-and-enums',
                'reference/language/globals',
                'reference/language/repetition-and-conditional-elements',
                'reference/language/container-components',
                'reference/language/animations',
                'reference/language/states-and-transitions',
                'reference/language/geometry',
              ],
            },
            {
              label: '类型',
              collapsed: true,
              items: [
                'reference/property-types',
                'reference/property-types/numeric-types',
                'reference/property-types/strings',
                'reference/property-types/colors-and-brushes',
                'reference/property-types/images',
                'reference/property-types/builtin-structs',
                'reference/property-types/builtin-enums',
                'reference/property-types/arrays-and-models',
                'reference/property-types/other-types',
              ],
            },
            {
              label: '元素',
              collapsed: true,
              items: [
                'reference/common',
                {
                  label: '基础可视化元素',
                  items: [
                    {
                      autogenerate: {
                        directory: 'generated/reference/elements',
                      },
                    },
                  ],
                },
              },
              {
                label: '手势',
                items: [
                  {
                    autogenerate: {
                      directory: 'generated/reference/gestures',
                    },
                  },
                ],
              },
              {
                label: '拖放',
                items: [
                  {
                    autogenerate: {
                      directory: 'generated/reference/drag-and-drop',
                    },
                  },
                ],
              },
              {
                label: '键盘输入',
                items: [
                  'reference/keyboard-input/overview',
                  'reference/keyboard-input/focusscope',
                  'reference/keyboard-input/textinput',
                  'reference/keyboard-input/textinputinterface',
                ],
              },
              {
                label: '基础布局',
                items: [
                  'reference/layouts/overview',
                  'reference/layouts/gridlayout',
                  'reference/layouts/horizontallayout',
                  'reference/layouts/verticallayout',
                  'reference/layouts/flexboxlayout',
                ],
              },
              {
                label: 'Window',
                items: [
                  {
                    autogenerate: {
                      directory: 'generated/reference/window',
                    },
                  },
                ],
              },
              {
                label: '非可视化元素',
                items: [{ label: 'Timer', slug: 'reference/timer' }],
              },
              {
                label: '命名空间',
                collapsed: true,
                items: [
                  'reference/global-functions/math',
                  'reference/platform',
                  'reference/global-namespaces/font-weight',
                ],
              },
              {
                label: '全局函数',
                slug: 'reference/global-functions/builtinfunctions',
              },
              {
                label: '标准组件',
                collapsed: true,
                items: [
                  'reference/std-widgets/overview',
                  'reference/std-widgets/style',
                  {
                    label: '全局',
                    items: [
                      {
                        autogenerate: {
                          directory: 'reference/std-widgets/globals',
                        },
                      },
                    ],
                  },
                  {
                    label: '基础组件',
                    items: [
                      {
                        autogenerate: {
                          directory: 'reference/std-widgets/basic-widgets',
                        },
                      },
                    ],
                  },
                  {
                    label: '视图',
                    items: [
                      {
                        autogenerate: {
                          directory: 'reference/std-widgets/views',
                        },
                      },
                    ],
                  },
                  {
                    label: '组件布局',
                    items: [
                      {
                        autogenerate: {
                          directory: 'reference/std-widgets/layouts',
                        },
                      },
                    ],
                  },
                  {
                    label: '杂项',
                    items: [
                      {
                        autogenerate: {
                          directory: 'reference/std-widgets/misc',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          ],
        },
        {
          label: '教程',
          link: 'tutorial/quickstart',
          items: [
            'tutorial/quickstart',
            'tutorial/getting_started',
            'tutorial/memory_tile',
            'tutorial/polishing_the_tile',
            'tutorial/from_one_to_multiple_tiles',
            'tutorial/creating_the_tiles',
            'tutorial/game_logic',
            'tutorial/running_in_a_browser',
            'tutorial/ideas_for_the_reader',
            'tutorial/conclusion',
          ],
        },
        {
          label: '语言集成',
          link: 'language-integrations',
          items: [
            {
              label: 'C++ ↗',
              link: sidebarHref(CPP_BASE_URL),
              attrs: { target: '_blank' },
            },
            {
              label: 'Rust ↗',
              link: sidebarHref(
                'https://docs.slint.dev/latest/docs/rust/slint/',
              ),
              attrs: { target: '_blank' },
            },
            {
              label: 'TypeScript ↗',
              badge: { text: 'beta', variant: 'caution' },
              link: sidebarHref(NODEJS_BASE_URL),
              attrs: { target: '_blank' },
            },
            {
              label: 'Python ↗',
              badge: { text: 'beta', variant: 'caution' },
              link: sidebarHref(PYTHON_BASE_URL),
              attrs: { target: '_blank' },
            },
          ],
        },
      ],
    }),
  ],
  vite: {
    resolve: {
      alias: {
        '@slint/common-files/src': commonFilesSrc,
      },
    },
  },
});