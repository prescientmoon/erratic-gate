# Simulator de porti logice

Programul este un simulator de porti logice care permite experimentarea, testarea si cunoasterea ansamblelor de porti logice. Simulatorul suporta circuite integrate, mai multi biti pe acelasi pin, salvarea simulatiilor si suport pentru mai multe limbii.

## Arhitectura:

### Aspecte generale:

-   Proiectul este scris folosing stilul de programare reactiva (bazata be streamuri asincron)

### Structora fisierelor:

In folderul [src](../src) se afla urmatoarele fisiere si foldere:

-   [assets](../src/assets) - aici este stocata toata arta folosita in simulator. Totul in afara de fisierul [favicon.ico](../src/assets/favicon.ico) a fost desenat de mine folosind [Figma](https://www.figma.com/)
-   [public](../src/public) - contine toate fisierele ce trebuie copiate in folderul dist atunci cand aplicatia e compilata
-   [index.html](../src/index.html) - fisierul de intrare al intregii aplicatii
-   [index.ts](../src/index.ts) - fisierul care initializeaza animatia de incarcare
-   [main.tsx](../src/main.tsx) - fisierul care se ocupa de pornirea aplicatiei. Acest fisier va fi descris mai amanuntit in sectiune `Performanta`
-   [server.ts](../src/server.ts) - fisierul care servest asseturile static in productie
-   [modules](../src/modules) & [common](../src/common) - Aceste foldere contin aplicatia propriuzisa

### Folderele modules si common

Am ales sa folosesc structura folosita de [wavedistrict](https://gitlab.com/wavedistrict/web-client/tree/master/src). Aceasta consta in 2 foldere: `common` si `modules` continand subfoldere numite dupa functionalitatea pe care o implementeaza, la randul lor continand foldere care sunt numte dupa tipul de fisiere continute si un fisier numit `constants.ts` continand constante relevante pentru acel modul.

Exemplu (aceste fisiere nu sunt reale, ci sunt aici doar ca sa arate intr-un mod intuitiv structura de fisiere):

```
/modules
    /simulation
        /helpers
            foo.ts
        /components
            Simulation.scss
            Simulation.tsx
        constants.ts
    /simulationRenderer
        /subjects
            mySubject.ts
        /stores
            myLocalStore.ts
        /classes
            SimulationRenderer.ts
        /styles
            /mixins
                someMixin.scss
        /types
            myInterface.ts
/common
    /lang
        /arrays
            /helpers
                removeElement.ts
                setToArray.ts
```

Reprezentare grafica a fisierelor (fiecare cerc reprezinta un fisier):
![files](./assets/files.png)

### Module:

Proiectul este impartit in 18 de module distincte:

1. `Activation`: se ocupa cu transformarea functiilor de `activare` in cod javascript
2. `Colors`: se ocupa de manipularea culorilor
3. `Core`: contine componentele vizuale de baza ale apl`icatiei`
4. `Create`-simulation: implementeaza procesul de cre`ere` a unei simulatii
5. `Erros`: se ocupa de prinsul si afisatul erorilor
6. `Input`: se ocupa de utilizarea textului ca input
7. `Integrated`-circuits: se ocupa de compilarea cir`cuitelor` integrate
8. `Internalisation`: se ocupa de afisarea textului in dif`erite` limbii
9. `Keybindings`: se ocupa de utilizarea tastaturii ca input
10. `Logic`-gate-info: implementeaza pagina cu informatii despre porti logice
11. `Logic`-gates: implementeaza pagina de unde se pot adauga porti logice
12. `Modals`: implementeaza caracteristicile generale folosite de toate dialogurile
13. `Saving`: se ocupa de salvarea simulatiilor
14. `Screen`: se oucpua de adaptarea aplicatiei la orice rezolutie
15. `Simulation`: se ocupa de simularea circuitelor
16. `Storage`: se ocupa de salvarea datelor in `localStorage`
17. `Toasts`: se ocupa de stilizarea notificarilor oferite de `react-toastify`.
18. `Vector2`: functii de baza care permit folosirea arrayurilor pentru geometria vectoriala

### Performanta

-   Programarea reactiva este bine cunoscuta pentru ca poate creia memory leaks foarte usor. Pentru a ma asigura ca asa ceva nu se poate intampla, am folosit urmatoarele 2 tehnici:
    1. Folosirea operatorului `take()` pentru a astepta doar un anumit numar de valori
    2. Fiecare clasa care foloseste streamuri are o metoda `.dispose()` care curata toate subscriptile la toate streamurile folosite de instanta respectiva si cheama metoda cu acelasi nume pe toate proprietatile care la randul lor folosesc streamuri.
-   Pentru ca userul sa nu vada un ecran gol nici macar o secunda, am urmat urmatorii pasi:
    1. Userului ii este trimis fisierul `index.html` ,`index.js` si `splash.css` cu o marime totala de doar 18kb. Aceste fisiere au doar rolul de a afisa o animatie de loading pe ecran.
    2. Dupa ce animatia porneste, restul fisierelor sunt cerute de la server.
    3. Cand fisierul `main.js` este primit, acesta este rulat. El este responsabil pentru:
        - rendarea aplicatiei
        - initializarea hotkeyurilor
        - prinderea erorilor si aratarea acestora intr-un format usor de inteles
        - creerea `subiectelor` (streamuri care au o metoda numita `next`) necesare intregii aplicatii
        - actualizarea portilor logice salvate in eventualitatea unor noi aparitii
    4. Fisierul `main.js` expune o functie asincron numita `main` care este responsabila pentru functionalitatile enumerate mai sus. Aceasta functie este finalizata doar atunci cand toate aceste actiuni au fost realizate.
    5. Cand functia `main` din fisierul `main.js` este terminata, fisierul `index.js` isi termina munca prin scaderea opacitatii animatiei de incarcare si in final scoaterea acesteia din `DOM`.

### Librarii, limbaje si unelte folosite:

Mentionez ca o mare parte din elementele acestei liste sunt libarii folosite in timpul developmentului, doar o mica parte ajungand in buildul final.

-   [Sass](https://sass-lang.com/) pentru styling. Am ales sa foloses sass in special pentru ca ofera variabile si mixinuri care sunt rezolvate la compilare, acestea ajutand la refolosirea stiurilor. De exemplu, nu toate modalele au titluri, si la unele layoutul este putin diferit, asa ca am hotarat sa scriu 2 mixinuri: [@modal-title()](../src/modules/modals/styles/mixins/modal-title.scss) si [@modal-container()](../src/modules/modals/styles/mixins/modal-container.scss), astfel respectand principiul compozitiei. Un alt exemplu sunt mixinurile [@flex()](../src/modules/core/styles/mixins/flex.scss) si [@full-screen()](../src/modules/core/styles/mixins/full-screen.scss) pe care le-am scris deoarece incorporeaza functionalitati pe care urma sa le folosesc in mai multe parti ale aplicatiei.
-   [Typescript](https://www.typescriptlang.org/) - De aproximativ un an am facut trecerea de la javascript la typescript, si avantajele sunt enorme. Pot spune ca in acest proiect typescript m-a salvat de multe buguri deoarece ma anunta de existenta lor la compile-time.
-   [Webpack](https://webpack.js.org/) & plugins & loaders pentru bundlingul asseturilor + code splitting.
-   [Babel](https://babeljs.io/) pentru a compila jsx, typescript si pentru compatibilitatea cu browsere mai vechi.
-   [React](https://reactjs.org/) & [React-dom](https://reactjs.org/docs/react-dom.html) & [React-router-dom](https://www.npmjs.com/package/react-router-dom) & [React-helmet](https://github.com/nfl/react-helmet) & [Material-ui](https://material-ui.com/) & [react-toastify](https://github.com/fkhadra/react-toastify) pentru ui. Aceste tehnologii au fost folosite pentru a creia bara laterala de pe partea dreapta, pagina /gates si pagina /info/:name. Mentionez ca rendarea, interactiunile (drag & drop, hotkeys, selection etc) intregii si simulatii sunt facute de la 0 fara a folosii nici una din aceste libarii.
-   [Github](https://github.com/) & [Git](https://git-scm.com/) - Git si github sunt niste unelte indispensabile pentru orice programator, si pot spune ca acest proiect a beneficiat mult deoarece am folosit aceste tehnologii. In primul rand, cu putin setup pot upolada pe heroku automat mereu cand rulez comanda `push` pe ramura `master`. In al doilea rand, la un moment dat laptopul meu a ramas fara baterie si inchizanduse cateva fisiere au fost corupte. Daca nu as fi folosit git acel incident mi-ar fi distru cateva ore de munca
-   [Visual studio code](https://code.visualstudio.com/) Am ales acest editor deoarece are cel mai bun suport pentru typescript existent la momentul actual.
-   [Eix-js](https://eix-js.github.io/core/) este un mic game engine pe care l-am scris impreuna cu un baiat de 13 ani din Rusia in timpul ludum-dare 44. In acest proiect am folosit modulul [utils](https://github.com/eix-js/utils) care ofera diferiti decoratori utili cum ar fi: [@Singleton](https://github.com/eix-js/utils/blob/master/src/modules/decorators/Singleton.ts) care imi permite sa modific automat constructorul unei clase in asa fel incat sa returneze mereu aceiasi instanta si [@CacheInstanceByKey](https://github.com/eix-js/utils/blob/master/src/modules/decorators/CacheInstancesByKey.ts) care imi permite sa ma asigur ca pentru fiecare cheie exista o singura instants existenta. Am extins si o implementare a unui [nod dintr-un cache LRU](https://github.com/eix-js/utils/blob/master/src/modules/classes/LruCache.ts) care mi-a permis sa ma asigur ca atunci cand mouseul este apasat interactiunea se va produce asupra componentului care este cel mai `aproape de utilizator` (sau care are pozitia pe axa Z cea mai mare).
-   [Rxjs](https://rxjs-dev.firebaseapp.com/) - Am folosit rxjs deoarece proiectul este construit folosind `programarea reactiva` (sau bazata pe streamuri). Programarea reactiva este bine cunoscuta deoarece face creerea de `memory leaks` foarte usoara, asa ca proiectul este scris cu mare grija pentru a prevenii orice posibil incident de acest tip.
-   [Rxjs-hooks](https://github.com/LeetCode-OpenSource/rxjs-hooks) imi permite sa folosesc functia `useObservable()` cu ajutorul careia pot renda valorile streamurilor direct cu ajutorul React.
-   [express](https://expressjs.com/) pentru servirea asseturilor statice
-   [keycode](https://www.npmjs.com/package/keycode) pentru a transforma numele unei taste in codul potrivit (utilizat in rendarea combinatilor de taste sub butoane)
-   [mainloop.js](https://github.com/IceCreamYou/MainLoop.js?utm_source=recordnotfound.com) pentru a a rula cod de 60 ori pe secunda intr-o maniera eficienta. Mentionez ca singurul lucru care este rulat in acest mod este cel responsabil pentru rendarea simulatiei. Simularea portilor logice este facuta doar atunci cand ceva se schima si doar acolo unde ceva s-a schimbat folosing `programarea reactiva`.
