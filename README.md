# json-storage

## usage

### set

```js
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const res = await fetchJSON("/api/path/file", jsonvalue);
```

### get

```js
import { fetchJSON } from "https://js.sabae.cc/fetchJSON.js";

const res = JSON.stringify(await fetchJSON("/api/path/file"));
```

## how to start

```sh
deno task start 8888
```

open http://localhost:8888/
