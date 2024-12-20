import "./chunk-CLC6CPQL.js";

// node_modules/uuid4/browser.mjs
var uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function valid(uuid) {
  return uuidPattern.test(uuid);
}
function uuid4() {
  var temp_url = URL.createObjectURL(new Blob());
  var uuid = temp_url.toString();
  URL.revokeObjectURL(temp_url);
  return uuid.split(/[:\/]/g).pop().toLowerCase();
}
uuid4.valid = valid;
var browser_default = uuid4;
export {
  browser_default as default,
  uuid4,
  valid
};
//# sourceMappingURL=uuid4.js.map
