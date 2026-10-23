# jehkis.github.io

Portfolio: **https://jehkis.github.io** (suomeksi) · **https://jehkis.github.io/en/** (in English)

Tehty [Astrolla](https://astro.build). Sisältö on tiedostossa `src/data/sisalto.ts` molemmilla kielillä, ja
`src/components/Portfolio.astro` piirtää sivun. Kuvakaappaukset ovat kansiossa `public/kuvat`.

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # valmis sivu kansioon dist/
```

Julkaisu: push `main`-haaraan, ja GitHub Actions (`.github/workflows/deploy.yml`) päivittää sivun GitHub Pagesiin.
