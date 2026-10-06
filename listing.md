# CompanyProof MCP listing kit

Reviewed 6 October 2026. Public beta. Maintained by CompanyProof, a product of Global Database operated by Global Data Intelligence Limited.

## Short description

Find legal companies, retrieve registry profiles and verify company facts with source evidence.

## Full description

CompanyProof connects AI agents to company registry data and source evidence. Search for a legal company by name, registration number, VAT number or ticker and country; retrieve its available profile modules; and verify supported company identity claims.

The three tools are `search_companies`, `get_company_profile` and `verify_company_claims`. Automatic claim verification covers registered name, registration number, status, incorporation date, VAT number and legal form. Financial and ownership records are available in profiles where coverage permits.

The remote endpoint uses Streamable HTTP, with public tool discovery and authenticated data calls through OAuth 2.1/PKCE or a CompanyProof Bearer API key. Live data requires an eligible account and uses shared credits. Accepted live searches and profiles each use one credit; verification uses one per accepted claim, writes a proof and can enable eligible monitoring. Test access uses the documented fixture. Availability varies by entity and jurisdiction.

## Connection

- MCP URL: https://companyproof.ai/v2/mcp
- Transport: Streamable HTTP
- Registry name: `ai.companyproof/companyproof`
- Server metadata: https://companyproof.ai/server.json
- Documentation: https://companyproof.ai/docs/mcp
- Markdown quickstart: https://companyproof.ai/docs/agent-quickstart.md
- Pricing: https://companyproof.ai/pricing
- Coverage: https://companyproof.ai/coverage
- Public contact: sales@companyproof.ai

In Claude or ChatGPT's custom remote connector settings, add the MCP URL and complete CompanyProof OAuth. Use an eligible CompanyProof account for live data. A directory listing does not install or authorize a connector for a user.

For stdio-only clients, the third-party `mcp-remote` bridge documents this configuration. Node.js and `npx` are required. Review the bridge's package and permissions before installing: https://github.com/punkpeye/mcp-remote. This is an integration example, not a claim of a completed client certification.

```json
{
  "mcpServers": {
    "companyproof": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://companyproof.ai/v2/mcp", "--transport", "http-only"]
    }
  }
}
```

Prefer native remote MCP configuration where the client supports it. Keep API keys in the client's protected credential store or a backend secret store; never place real keys in a directory submission.

## Tools and example use cases

| Tool | Scope | Example use |
| --- | --- | --- |
| `search_companies` | `company.read` | Resolve the correct legal company and jurisdiction before using a record. |
| `get_company_profile` | `company.read` | Retrieve available registry, financial or ownership modules and retain their provenance. |
| `verify_company_claims` | `proof.write` | Check an AI-generated company identity claim, save its evidence and optionally monitor an eligible field. |

Registry status does not establish trustworthiness, solvency or authority to act. Ownership records do not automatically establish a calculated UBO determination. The six identity fields above define the automatic REST/MCP claim-verification contract.

## Brand assets

- Square icon (512px PNG): https://companyproof.ai/app-icon-512.png
- Logo (PNG): https://companyproof.ai/companyproof-logo-primary.png
- Social image: https://companyproof.ai/og.png
- Machine-readable listing kit: https://companyproof.ai/mcp-listing.json

The `/.well-known/mcp.json` alias serves CompanyProof's own capability manifest for mcpub discovery. It is not a universal MCP configuration standard; the official registry descriptor remains `/server.json`.
