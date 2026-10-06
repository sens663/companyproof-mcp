// Backend-only example. Two accepted live requests normally consume two credits.
// COMPANYPROOF_API_KEY must be provided through your environment's secret store.
const origin = "https://companyproof.ai";
const key = process.env.COMPANYPROOF_API_KEY;
const [identifier, country] = process.argv.slice(2);
if (!key || !identifier || !/^[A-Za-z]{2}$/.test(country || "")) {
  console.error("Set COMPANYPROOF_API_KEY securely, then run: node quickstart.mjs <registration-number> <country-code>");
  process.exit(1);
}
async function request(path, body) {
  const response = await fetch(origin + path, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${key}`, Accept: "application/json", ...(body ? { "Content-Type": "application/json" } : {}) },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(30000), redirect: "error",
  });
  if (!response.ok) throw new Error(`CompanyProof returned HTTP ${response.status}; inspect /docs/errors. Credentials are never printed.`);
  return response.json();
}
try {
  const matches = await request("/v2/companies/search", { identifier_type: "registration_number", identifier, country: country.toUpperCase(), limit: 10 });
  const exact = matches.companies?.filter(company => company.registration_number === identifier && company.country === country.toUpperCase()) || [];
  if (exact.length !== 1) throw new Error("No unique exact entity match. Review the returned candidates before retrieving a profile.");
  const profile = await request(`/v2/companies/${encodeURIComponent(exact[0].id)}/profile`);
  console.log(JSON.stringify({ company: exact[0], section_status: profile.section_status, profile }, null, 2));
} catch (error) {
  console.error(error instanceof Error ? error.message : "The request failed.");
  process.exitCode = 1;
}
