/**
 * Initializaion
 */

// KV Support
KV = bulletboard;

// KEY name pattern
const KEY_PATTERN = /^[a-zA-Z0-9_]{1,20}$/i

/**
 * Listen
 */
addEventListener("fetch", (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500, headers: headers })
    )
  );
});

let headers = new Headers();
headers.set("Access-Control-Allow-Origin", "*");

/**
 * Function
 */

async function handleRequest(request) {
  const { pathname }  = new URL(request.url);
  const data = request.body;
  const kvname = "bb_" + pathname.substring(5);

  // key name validate
  key_validation = KEY_PATTERN.test(kvname);
  if (key_validation == false) {
    return new Response("Invalid key!", { status: 403, headers: headers });
  }

  // put key
  if (pathname.startsWith("/put/")) {
    if (data != "" && data != null) {
      await KV.put(kvname, data);
      return new Response("Success!", {headers: headers});
    }
  }

  // get value of a key
  if (pathname.startsWith("/get/")) {
    const data = await KV.get(kvname);
    if (data === null){
      return new Response("Key not found", { status: 404, headers: headers });
    }else{
      return new Response(data, {headers: headers});
    }
  }

  // delete a key
  if (pathname.startsWith("/del/")) {
    const res = await KV.delete(kvname);
    return new Response("We have received your delete request, it will take up to 60 seconds to be invisible.", {headers: headers});
  }
  
  // get all values of keys
  if (pathname.startsWith("/allkeys")) {
    const kvlist = await KV.list({ prefix:"bb_" });
    d = "---LIST START---\n";
    for(v in kvlist.keys) {
      d += kvlist.keys[v].name + "\n";
    }
    d += "---LIST END---";
    return new Response(d, {headers: headers});
  }

  // delete all keys
  if (pathname.startsWith("/delkeys")) {
    const kvlist = await KV.list({ prefix:"bb_" });
    d = "---LIST START---\n";
    for(v in kvlist.keys) {
      const res = await KV.delete(kvlist.keys[v].name);
      d += kvlist.keys[v].name + "\n";
    }
    d += "---LIST END---\n";
    d += "All these keys above will be deleted in 60 seconds.";
    return new Response(d, {headers: headers});
  }

  return new Response(data, {headers: headers});
}