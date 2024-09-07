import { serveAPI } from "https://js.sabae.cc/wsutil.js";

const readJSON = async (fn) => {
  try {
    return JSON.parse(await Deno.readTextFile("json/" + fn));
  } catch (e) {
    //console.log(e);
  }
  return null;
};

const writeJSON = async (fn, obj) => {
  try {
    await Deno.mkdir("json/" + fn.substring(0, fn.lastIndexOf("/")), { recursive: true });
    await Deno.writeTextFile("json/" + fn, JSON.stringify(obj, 2, null));
    return true;
  } catch (e) {
    //console.log(e);
  }
  return false;
};

const getJSON = async (fn) => {
  if (fn.indexOf("..") >= 0) return null; // err
  if (fn.endsWith("/")) { // all get
    const res = {};
    try {
      for await (const f of Deno.readDir("json/" + fn)) {
        if (f.isDirectory) continue;
        const d = await readJSON(fn + "/" + f.name);
        res[f.name] = d;
      }
    } catch (e) {
    }
    return res;
  }
  return await readJSON(fn);
};

const setJSON = async (fn, obj) => {
  if (fn.indexOf("..") >= 0) return null; // err
  if (fn.endsWith("/")) return null; // err
  return await writeJSON(fn, obj);
};

serveAPI("/api/", async (param, req, path, conninfo) => {
  const fn = path.substring("/api/".length);
  if (param == null) { // get
    return await getJSON(fn);
  } else { // put
    return await setJSON(fn, param);
  }
});
