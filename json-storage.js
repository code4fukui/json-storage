import { fetchWeb } from "https://code4fukui.github.io/wsutil/fetchWeb.js";

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
    const res = [];
    try {
      for await (const f of Deno.readDir("json/" + fn)) {
        if (f.isDirectory) continue;
        const d = await readJSON(fn + "/" + f.name);
        if (typeof d == "object" && !Array.isArray(d)) {
          d["@id"] = f.name;
        }
        res.push(d);
      }
    } catch (e) {
      //console.log(e)
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

export default fetchWeb(async (param, req, path, conninfo) => {
  const fn = path.substring("/api/".length);
  if (param == null) { // get
    return await getJSON(fn);
  } else { // put
    return await setJSON(fn, param);
  }
});
