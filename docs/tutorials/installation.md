# Rularea simulatorului:

Exista 3 metode de a rula simulatorul:

1. Folosind [versiunea hostata pe heroku](https://logic-gate-simulator.herokuapp.com/):

Aceasta este cea mai usoara solutie - tot ce trebuie sa faceti este sa deschideti
[acest url](https://logic-gate-simulator.herokuapp.com/)

2. Folosind un server de dezvoltare:

Pentru inceput trebuie sa aveti [node.js & npm](https://nodejs.org/en/download/) si [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) instalate pe dizpozitiv.

Deschideti un terminal, si introduceti urmatoarele comenzi:

```sh
#  Cloeaza repoul
git clone https://github.com/Mateiadrielrafael/logicGateSimulator

# Cd in folder
cd logicGateSimulator

# instaleaza librariile necesare
npm install

# ruleaza serverul de dezvoltare
npm run dev
```

Browserul va fi deschis automat la adresa serverului.

3. Prin compilarea locala a simulatorului

Pentru inceput, clonati repoul si instalati librariile dupa cum este explicat in optiunea 2.

Pentru a compila codul sursa, introduceti urmatoarea comanda:

```sh
npm run build
```

Pentru a rula simulatorul, rulati comanda:

```sh
npm start
```

Proiectul este acum accesibil sub portul `8080`
