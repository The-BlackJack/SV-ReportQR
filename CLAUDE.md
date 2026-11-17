# CLAUDE.md – SV-ReportQR (Web-App)

Die Web-App zu **SV-ReportAssist**. Alle Regeln, die Schnittstelle zum Windows-Programm und der Ablauf beim
Veröffentlichen stehen im Haupt-Repository `The-BlackJack/SV-ReportAssist` in `CLAUDE.md` und
`docs/Entwicklerhandbuch.md` (Abschnitt „Aufbau der Web-App“). Kurz:

- Immer auf Deutsch antworten, auch in Commits und Kommentaren.
- **Nur nach ausdrücklichem OK des Auftraggebers pushen** – die App läuft über GitHub Pages direkt auf den
  Handys im Einsatz.
- Bei jeder neuen Version `VERSION` in `index.html` **und** `CACHE` in `sw.js` erhöhen.
- Dieselben Dateien liegen als Kopie in `SV-ReportAssist/webapp/`; beide gleich halten.
- Codes und `clean()` müssen zu `sortierer.py` im Windows-Programm passen (`ORDNER:`, `CMD:…`,
  `CMD:KEINZUTRITT:<Wohnung>;<Grund>`, `CMD:PROJEKT:<Akte>`).
- Testen: Playwright in Handygröße (390 × 844), Bibliotheken von cdnjs per `page.route` durch Attrappen ersetzen.

Copyright © 2026 Alexandre Bhar. Alle Rechte vorbehalten.
