# Roaster Teaser Status

## CDN URLs for cutout bags
- tala_nobg: https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/tala_nobg_35789949.png
- chromatic_nobg: https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/chromatic_nobg_13e96922.png
- ruby_nobg: https://d2xsxph8kpxj0f.cloudfront.net/310519663508607354/Cx8qam2TtnBMUm8oHF4fuf/ruby_nobg_db5de1f0.png

## Current state
- RoasterTeaser component created and added to Home.tsx between ConceptSection and VisionSection
- The component uses transparent cutout bag images with hover lift effect
- Each bag links to /roasters page
- "View all roasters" link in header also goes to /roasters

## Nav behavior
- "Our Roasters" nav link currently goes to /roasters page (isRoute: true)
- This is fine since the teaser on homepage has its own "View all roasters" link
- The nav link should probably stay as /roasters since that's the dedicated page
