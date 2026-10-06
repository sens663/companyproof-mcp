# CompanyProof MCP

Connect AI agents to legal company records and source evidence through the hosted [CompanyProof](https://companyproof.ai) Model Context Protocol server.

**Endpoint:** `https://companyproof.ai/v2/mcp`  
**Transport:** Streamable HTTP  
**Official registry name:** `ai.companyproof/companyproof`

This repository contains the official public integration package, client examples and listing materials for the hosted service.

## Tools

| Tool | Purpose | Scope and metering |
| --- | --- | --- |
| `search_companies` | Resolve candidate legal entities by company name, registration number, VAT number or ticker and country. | `company.read`; one shared credit per accepted live request. |
| `get_company_profile` | Retrieve available company profile modules and provenance using the selected company ID. | `company.read`; one shared credit per accepted live request. |
| `verify_company_claims` | Check supported identity facts, write a proof and optionally monitor eligible facts. | `proof.write`; one shared credit per accepted claim. Eligible scheduled rechecks use the claim allowance. |

Automatic claim verification supports `registered_name`, `registration_number`, `status`, `incorporation_date`, `vat_number` and `legal_form`. Financial and ownership records may be available in profiles, depending on company and jurisdiction coverage.

## Connect

In a client that supports remote MCP, add `https://companyproof.ai/v2/mcp` and complete CompanyProof OAuth 2.1 with PKCE. Compatible custom clients can use a CompanyProof Bearer API key. Store keys in your secret manager.

Public `initialize` and `tools/list` do not require sign-in. Data calls require authentication and an eligible account. Live access uses shared credits; test access uses the documented fixture. See [pricing](https://companyproof.ai/pricing), [coverage](https://companyproof.ai/coverage) and the [MCP authentication guide](https://companyproof.ai/docs/mcp).

For clients using a local stdio bridge, `configs/stdio-bridge.json` is an example using [mcp-remote](https://github.com/punkpeye/mcp-remote). Individual desktop clients have not been certified by this package.

## Examples

Run public discovery with Node.js 22 or later:

```sh
node examples/discover.mjs
```

The REST quickstart is in `examples/rest-quickstart.mjs`. It requires a securely configured `COMPANYPROOF_API_KEY` and performs two potentially credit-consuming live requests. Supply a registration number and two-letter country code as arguments.

The root `plugin.json` and `mcp.json` form a portable Agent Plugins package with CompanyProof's current MCP endpoint and OpenAI listing metadata. The downloadable package is [companyproof-plugin-1.2.1.zip](https://companyproof.ai/downloads/companyproof-plugin-1.2.1.zip). This package is a submission draft, not evidence of marketplace approval.

## Evidence and scope

Select the correct company and jurisdiction before interpreting results. Preserve source provenance, retrieval times and module availability. Registry status does not establish trustworthiness, solvency or authority to act. Ownership records do not automatically establish a calculated UBO determination. These tools do not verify bank-account ownership or perform sanctions screening.

CompanyProof is in public beta. Directory discovery checks and package validation do not constitute authenticated live-data testing or an end-to-end certification of each AI client.

## Publication resources

- [MCP documentation](https://companyproof.ai/docs/mcp)
- [Agent quickstart](https://companyproof.ai/docs/agent-quickstart.md)
- [Directory descriptions and branding](https://companyproof.ai/mcp-listing.md)
- [Machine-readable listing metadata](https://companyproof.ai/mcp-listing.json)
- [Official MCP Registry record](https://registry.modelcontextprotocol.io/v0.1/servers/ai.companyproof%2Fcompanyproof/versions/latest)
- [Privacy policy](https://companyproof.ai/privacy)
- [Terms](https://companyproof.ai/terms)
- [Contact](https://companyproof.ai/contact): sales@companyproof.ai

CompanyProof is a Global Database product operated by Global Data Intelligence Limited. Brand assets and service access remain subject to their applicable terms.
