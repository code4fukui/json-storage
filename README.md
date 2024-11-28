# json-storage

json-storage service based on [wsutil](https://github.com/code4fukui/wsutil/)

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
deno serve --port 8888 --hostname "[::]" -A json-storage.js
```

open http://localhost:8888/
