import { Service } from "@/types";

export const services: Service[] = [
  {
    id: "kompletna-rekonstrukcia",
    number: "01",
    title: "Kompletná rekonštrukcia bytov",
    shortDescription: "Kompletnú rekonštrukciu bytov na kľúč – od prvého návrhu až po finálne upratovanie. Vytvoríme vám nový domov bez stresu a starostí.",
    fullDescription: [
      "Zabezpečujeme kompletnú rekonštrukciu bytov na kľúč – od prvého návrhu až po finálne upratovanie. Či už ide o starý panelákový byt alebo tehlový byt v pôvodnom stave, dokážeme ho premeniť na moderný a funkčný priestor na bývanie.",
      "V rámci kompletnej prerábky bytu realizujeme nové rozvody vody, elektriny a plynu, výmenu podláh, omietok, dverí aj kúpeľne a kuchyne. Spolupracujeme len s overenými dodávateľmi materiálov a dbáme na precízne remeselné spracovanie.",
      "Naším cieľom je vytvoriť vám nový domov bez stresu a starostí – rýchlo, kvalitne a za férovú cenu.",
    ],
    icon: "home",
    image: "/sources/services/rekonstrukcia.jpeg",
  },
  {
    id: "kupelne-jadra",
    number: "02",
    title: "Rekonštrukcia kúpeľní a bytových jadier",
    shortDescription: "Špecializujeme sa na rekonštrukcie kúpeľní a bytových jadier. Pracujeme rýchlo a čisto, s dôrazom na detail a dlhodobú životnosť.",
    fullDescription: [
      "Špecializujeme sa na rekonštrukcie kúpeľní a bytových jadier. Či už máte pôvodné umakartové jadro alebo murovanú kúpeľňu, dokážeme ho premeniť na moderný priestor s dlhou životnosťou.",
      "V rámci rekonštrukcie kúpeľne realizujeme: demontáž starého jadra, murárske práce, vodoinštaláciu, elektroinštaláciu, pokládku obkladov a dlažieb, sadrokartónové práce, montáž sanity a spotrebičov.",
      "Pracujeme rýchlo a čisto, s dôrazom na detail. Používame kvalitné materiály od overených dodávateľov.",
    ],
    icon: "bath",
    image: "/sources/services/rekonstrukcia-kupelni.jpeg",
  },
  {
    id: "elektro-vodo-plyn",
    number: "03",
    title: "Elektrina, voda a plyn",
    shortDescription: "Kompletné rozvody elektriny, vody a plynu podľa platných noriem. Zabezpečujeme revízne správy a doklady pre kolaudáciu.",
    fullDescription: [
      "Zabezpečujeme kompletné rozvody elektriny, vody a plynu podľa platných noriem a predpisov. Všetky práce vykonávajú kvalifikovaní odborníci s potrebnými oprávneniami.",
      "Elektroinštalácie: nové rozvody, rozvádzače, zásuvky, osvetlenie, príprava pre spotrebiče.",
      "Vodoinštalácie: prípojky, rozvody studenej a teplej vody, odpad, príprava pre zariadenia.",
      "Plynoinštalácie: prípojky, rozvody, montáž spotrebičov, revízie.",
      "Po dokončení prác zabezpečíme všetky potrebné revízne správy a doklady pre kolaudáciu.",
    ],
    icon: "lightning",
    image: "/sources/services/elektro-voda-plyn.jpeg",
  },
  {
    id: "murarske-stavebne",
    number: "04",
    title: "Murárske a stavebné práce",
    shortDescription: "Základom kvalitnej rekonštrukcie. Vybúranie, murovanie nových priečok, úprava stien a podláh. Vytvárame pevný základ.",
    fullDescription: [
      "Murárske a stavebné práce sú základom každej kvalitnej rekonštrukcie. Bez pevných základov nemôže stáť kvalitná stavba.",
      "Realizujeme: búracie práce, vybúranie priečok a otvorov, murovanie nových priečok, úpravy stien a podláh, betonárske práce, omietky a stierky, zateplenie.",
      "Pracujeme s materiálmi od overených výrobcov ako Porotherm, Ytong, Porfix a ďalší. Dbáme na precízne spracovanie a dodržiavanie technologických postupov.",
    ],
    icon: "bricks",
    image: "/sources/services/murarske-stavebne.jpeg",
  },
  {
    id: "malovanie-obklady-podlahy",
    number: "05",
    title: "Maľovanie, obklady a podlahy",
    shortDescription: "Finálne povrchové úpravy. Profesionálne maľovanie, keramické obklady, dlažby a podlahy. Finálna úprava je rovnako dôležitá.",
    fullDescription: [
      "Finálne povrchové úpravy dotvárajú celkový vzhľad priestoru. Kvalitné spracovanie je vidieť na prvý pohľad.",
      "Maľovanie: príprava podkladu, penetrácia, maľovanie stien a stropov, dekoratívne techniky.",
      "Obklady a dlažby: pokládka keramických obkladov a dlažieb, mozaiky, veľkoformátové obklady.",
      "Podlahy: laminátové podlahy, vinylové podlahy, drevené podlahy, nivelačné hmoty.",
      "Používame kvalitné materiály a dodržiavame technologické postupy pre dlhú životnosť.",
    ],
    icon: "brush",
    image: "/sources/services/malovanie.jpeg",
  },
  {
    id: "montaz-dveri-zariadeni",
    number: "06",
    title: "Montáž dverí a zariadení",
    shortDescription: "Kompletnú montáž dverí, sanity, kuchyne a zariadení. Každý prvok starostlivo usadený a skontrolovaný.",
    fullDescription: [
      "Zabezpečujeme kompletnú montáž dverí, sanity, kuchyne a ďalších zariadení. Každý prvok je starostlivo usadený a skontrolovaný.",
      "Dvere: montáž interiérových dverí, obložkových zárubní, posuvných dverí, bezpečnostných dverí.",
      "Sanita: montáž umývadiel, WC, vaní, sprchovacích kútov, batérií.",
      "Kuchyne: montáž kuchynských liniek, spotrebičov, digestorov.",
      "Všetky zariadenia montujeme podľa pokynov výrobcu s dôrazom na správnu funkčnosť.",
    ],
    icon: "door",
    image: "/sources/services/montaz-dveri-zariadeni.jpeg",
  },
  {
    id: "upratovanie-odvoz",
    number: "07",
    title: "Upratovanie a odvoz odpadu",
    shortDescription: "Po rekonštrukcii zanechávame poriadok. Odvoz odpadu a dôkladné vyčistenie. Dostanete byt pripravený na nasťahovanie.",
    fullDescription: [
      "Po rekonštrukcii zanechávame poriadok. Zabezpečíme odvoz stavebného odpadu a dôkladné vyčistenie priestorov.",
      "Odvoz odpadu: stavebná suť, stará sanita, podlahy, dvere a ďalší odpad. Spolupracujeme s certifikovanými spoločnosťami na likvidáciu odpadu.",
      "Upratovanie: hrubé upratovanie počas prác, finálne upratovanie po dokončení, umytie okien a dverí.",
      "Váš nový byt odovzdávame pripravený na okamžité nasťahovanie.",
    ],
    icon: "trash",
    image: "/sources/services/upratovanie-odvoz-odpadu.jpeg",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getAllServices(): Service[] {
  return services;
}