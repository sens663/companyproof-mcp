// Public MCP discovery only; no API key or credit-consuming tools/call.
const endpoint = "https://companyproof.ai/v2/mcp";
async function rpc(id, method, params) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
    body: JSON.stringify({ jsonrpc: "2.0", id, method, ...(params ? { params } : {}) }),
    redirect: "error", signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) throw new Error(`MCP discovery returned HTTP ${response.status}`);
  const text = await response.text();
  const payload = response.headers.get("content-type")?.includes("text/event-stream")
    ? text.split(/\r?\n\r?\n/).map(event => event.split(/\r?\n/)
      .filter(line => line.startsWith("data:")).map(line => line.slice(5).trimStart()).join("\n"))
      .filter(Boolean).map(data => JSON.parse(data)).find(message => message.id === id)
    : JSON.parse(text);
  if (!payload) throw new Error("MCP discovery returned no matching JSON-RPC response");
  if (payload.error) throw new Error(`MCP discovery returned ${payload.error.code}: ${payload.error.message}`);
  return payload.result;
}
const initialized = await rpc(1, "initialize", {
  protocolVersion: "2025-11-25", capabilities: {},
  clientInfo: { name: "companyproof-public-discovery", version: "1.2.1" },
});
const tools = await rpc(2, "tools/list");
console.log(JSON.stringify({ server: initialized.serverInfo, protocolVersion: initialized.protocolVersion, tools: tools.tools }, null, 2));
