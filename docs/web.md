# Web Components

If you want to change the content/structure of the home page:
`web/src/components/pages/home/home.tsx`

But if you are fine with the structure but would like to change the text:
`web/locales/git/messages.ftl`

Do disable the warning about not been on production server, it was disabled here:
`web/src/components/layout/layout.tsx`
`{false && <NonProductionBanner />}`

# Font
[BC Sans Typeface](https://www2.gov.bc.ca/gov/content/governments/services-for-government/policies-procedures/bc-visual-identity/bc-sans)
```bash
wget 'https://www2.gov.bc.ca/assets/gov/british-columbians-our-governments/services-policies-for-government/policies-procedures-standards/web-content-development-guides/corporate-identity-assets/visid-files/bc-sans-font-woff.zip?forcedownload=true' \
-O bc-sans-font-woff.zip
```
