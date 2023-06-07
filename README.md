# ImpactBrews

Dette er mit udkast til min code challege. Jeg har brugt angular til at bygge siden op med og som database har jeg brugt Firebase til at gemme billeder og nye øl som der bliver oprettet.
<br />
<br />
Arkitekturen jeg har gået med et en komponent baseret kode, hvor hvert område har sit eget komponent, men kan gøre brug af fælles komponenter. Så som liste viewet til at se forskellige øl når man enten kommer frem på forsiden eller søger en øl frem.
<br />
<br />
Udover det, så gør jeg også brug af en service til at håndtere mine kald mod firestore, som håndtere at hente data og at mappe data rigtigt tilbage mod komponenterne.
<br />
<br />
Jeg har brugt https://punkapi.com/documentation/v2 til at berige min firestore database, men det er også muligt selv at kunne oprette en ny øl.
<br />
<br />
Jeg har bygget min sccs op med en shared fil hvor jeg har gemt globale værdier i, som breakpoints, faver og mixin funktion. Det har jeg gjort så at der bliver brugt de samme værdier rund i hele min scss, så skulle der være ændringer til det, så er det samlet et sted. Udover det så har jeg brugt BEM som min methodology, så navngivningen er ens og det er nemmere at finde en style og ændre den.

## Hvordan skal projektet startes

1. npm install
2. npm run start

Det vil starte siden op i `localhost:4200`.

## Credit til ting jeg har lånt

Beer logo: https://fonts.google.com/icons?icon.query=beer
