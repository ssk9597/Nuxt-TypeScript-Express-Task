## DEV

### Frontend

・Nuxt.js

・Composition-API

・TypeScript

### Backend

・Node.js(Express)

・TypeScript

## 手順

### ① クローンする

```
git clone git@github.com:ssk9597/Docker-Nuxt-TypeScript-Express-Prisma.git
```

### ② ディレクトリに移動する

```
cd Docker-Nuxt-TypeScript-Express-Prisma
```

### ③ 作成するテーブルを決める

`api/prisma/schema.prisma`に作成したいテーブルを記載する

```
model User {
  id    Int    @id @default(autoincrement())
  name  String
  email String @unique
}
```

### ④`make nuxt`を実行して、Nuxt.js の作成と Docker の起動を行う

```
make nuxt
```

### ⑤`nuxt.config.js`と`.env`を修正する

#### nuxt.config.js

```javascript:frontend/nuxt.config.js
require('dotenv').config();
const { API_URL, API_URL_BROWSER } = process.env;

export default {
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build'],

  watchers: {
    webpack: {
      poll: true,
    },
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/proxy', '@nuxtjs/dotenv'],

  env: {
    API_URL,
    API_URL_BROWSER,
  },

  proxy: {
    '/api': process.env.API_URL,
  },

  axios: {
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.API_URL_BROWSER,
  },

  build: {},
};
```

#### .env

```env:frontend/.env
API_URL = "http://app:18080"
API_URL_BROWSER = "http://localhost:18080"
```

### ⑥`make migrate`で Prisma のマイグレーションを行う

```
make migrate
```

### ⑦`make typescript`で typescript を導入する

```
make typescript
```

#### shims-vue.d.ts

```typescript:frontend/shims-vue.d.ts
declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}
```

#### tsconfig.json

```json:frontend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2018",
    "module": "ESNext",
    "moduleResolution": "Node",
    "lib": ["ESNext", "ESNext.AsyncIterable", "DOM"],
    "esModuleInterop": true,
    "allowJs": true,
    "sourceMap": true,
    "strict": true,
    "noEmit": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"]
    },
    "types": ["@nuxt/types", "@types/node"]
  },
  "files": ["shims-vue.d.ts"],
  "include": [
    "components/**/*.ts",
    "components/**/*.vue",
    "layouts/**/*.ts",
    "layouts/**/*.vue",
    "pages/**/*.ts",
    "pages/**/*.vue"
  ],
  "exclude": ["node_modules", ".nuxt", "dist"]
}
```

### ⑧`make composition-api`で Composition-API を導入する

```
make composition-api
```

#### nuxt.config.js

```javascript:frontend/nuxt.config.js
require('dotenv').config();
const { API_URL, API_URL_BROWSER } = process.env;

export default {
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'ja',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  css: [],

  plugins: [],

  components: true,

  buildModules: ['@nuxt/typescript-build', '@nuxtjs/composition-api/module'],

  generate: {
    interval: 2000,
  },

  watchers: {
    webpack: {
      poll: true,
    },
  },

  modules: ['@nuxtjs/axios', '@nuxtjs/proxy', '@nuxtjs/dotenv'],

  env: {
    API_URL,
    API_URL_BROWSER,
  },

  proxy: {
    '/api': process.env.API_URL,
  },

  axios: {
    baseURL: process.env.API_URL,
    browserBaseURL: process.env.API_URL_BROWSER,
  },

  build: {},
};
```

### ⑨`pages/index.vue`を修正してバックエンドとの通信を図る

```vue:frontend/pages/index.vue
<template>
  <div>
    <h1>
      {{ data }}
    </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useContext } from '@nuxtjs/composition-api';
import axios from '@nuxtjs/axios';

export default defineComponent({
  setup() {
    const data = ref({});
    const { $axios } = useContext();
    useAsync(async () => {
      const result = await $axios.$get('/api');
      data.value = result;
    });
    return { data };
  },
});
</script>
```
