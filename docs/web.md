# Web Components

If you want to change the content/structure of the home page:
`web/src/components/pages/home/home.tsx`

But if you are fine with the structure but would like to change the text:
`web/locales/git/messages.ftl`

Do disable the warning about not been on production server, it was disabled here:
`web/src/components/layout/layout.tsx`
`{false && <NonProductionBanner />}`
