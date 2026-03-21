# EXAMEN PRÀCTIC - Desenvolupament Web amb React

## Aplicació de Gestió de Taules d'un Restaurant

**Durada:** 3 hores  
**Puntuació total:** 10 punts

---

## 📋 Context

Has de desenvolupar una aplicació web per gestionar les taules d'un restaurant. L'aplicació ha de permetre visualitzar l'estat de les taules (lliures o ocupades), gestionar comandes i modificar la configuració de les taules.

---

## 🎯 Funcionalitats Requerides

### 1. Visualització de Taules (2 punts)

Crea un component que mostri un llistat de totes les taules del restaurant amb la següent informació:

- **Número de taula**
- **Capacitat** (número de persones)
- **Estat actual** (Lliure / Ocupada)
  - Indicador visual de color: verd per taules lliures, vermell per taules ocupades
- **Llista de comandes** associades a cada taula

**Requisits tècnics:**
- Utilitza un layout responsive (grid o flexbox)
- Les dades s'han de carregar des d'un servidor JSON (json-server)
- Mostra un indicador de càrrega mentre es recuperen les dades
- Gestiona possibles errors de connexió amb el servidor

---

### 2. Gestió d'Estats de Taules (2 punts)

Implementa la funcionalitat per canviar l'estat d'una taula:

- **Botó "Ocupar Taula"** (quan està lliure)
- **Botó "Alliberar Taula"** (quan està ocupada)

**Comportament esperat:**
- Quan una taula passa a estat "Lliure", totes les seves comandes s'han d'eliminar automàticament
- Les actualitzacions han de ser immediates (UI optimista)
- En cas d'error, revertir l'estat anterior

---

### 3. Gestió de Comandes (2.5 punts)

Per cada taula **ocupada**, implementa:

- **Afegir comandes:** Input i botó per afegir plats/begudes a la comanda
- **Eliminar comandes:** Botó per esborrar elements de la comanda
- **Marcar comanda com a servida:** Checkbox o botó per indicar que un plat ja s'ha servit
  - Els plats servits han de tenir un estil visual diferent (per exemple, text ratllat i color gris)

**Requisits:**
- Les comandes només es poden gestionar si la taula està ocupada
- Cada comanda ha de tenir un identificador únic
- Les operacions han de ser persistents (guardar-se al servidor)

---

### 4. Edició de Capacitat (1.5 punts)

Afegeix la possibilitat d'editar la capacitat de cada taula:

- **Botó d'edició** al costat de la capacitat actual
- **Mode d'edició inline:** Input numèric per modificar la capacitat
- **Botons de confirmació/cancel·lació**
- **Validació:** La capacitat ha de ser un número positiu (mínim 1)

---

### 5. Eliminar Taules (1 punt)

Implementa la funcionalitat per esborrar taules:

- Botó d'eliminar visible a cada targeta de taula
- Confirmació abans d'esborrar (confirm dialog)
- Actualització immediata de la interfície

---

### 6. Afegir Noves Taules (1 punt)

Crea un formulari per afegir noves taules amb els camps:

- **Número de taula** (número únic)
- **Capacitat** (número de persones)

**Validacions:**
- Tots els camps són obligatoris
- La capacitat ha de ser un número positiu
- El número de taula no pot estar duplicat

---

### 7. Sistema d'Autenticació (2 punts)

Implementa un sistema de login amb Context API:

- **Pàgina de Login:** Formulari amb input per introduir un codi d'accés
- **Validació de codis:** Sistema de codis predeterminats (mínim 3 usuaris diferents)
- **Context d'Autenticació:** 
  - Crear `AuthContext` amb React Context API
  - Gestionar estat d'usuari autenticat
  - Funcions `login` i `logout`
  - Persistència amb localStorage
- **Protecció de rutes:** L'aplicació només es mostra si l'usuari està autenticat
- **Header amb usuari:** Mostrar nom de l'usuari i botó de logout
- **Token compartit:** El codi/token s'ha de poder accedir des de qualsevol component mitjançant el Context

**Codis suggerits (poden ser diferents):**
- `ADMIN2024` → Administrador
- `CAMARERO1` → Cambrer 1
- `CAMARERO2` → Cambrer 2

**Requisits tècnics:**
- Utilitzar `createContext`, `useContext` i `useReducer` o `useState`
- Redirecció automàtica a `/login` si no autenticat
- Guardar sessió al localStorage per mantenir-la després de recarregar
- Feedback visual d'errors en login incorrecte

---

## 🛠️ Tecnologies i Eines

### Obligatòries:
- **React** (amb hooks: useState, useEffect, useContext)
- **React Router** (per navegació entre vistes)
- **React Context API** (per gestió d'autenticació)
- **json-server** (servidor REST per dades)
- **Vite** (build tool)

### Llibreries permeses:
- **lucide-react** (icones)
- **Tailwind CSS** o CSS personalitzat per estils

---

## 📁 Estructura de Dades

### Objecte Taula (db.json)

```json
{
  "tables": [
    {
      "id": 1,
      "number": 1,
      "capacity": 4,
      "status": "Free",
      "orders": []
    },
    {
      "id": 2,
      "number": 2,
      "capacity": 6,
      "status": "Occupied",
      "orders": [
        {
          "id": "101",
          "name": "Paella",
          "isDone": false
        },
        {
          "id": "102",
          "name": "Aigua",
          "isDone": true
        }
      ]
    }
  ]
}
```

### Estats possibles:
- `"Free"` - Taula lliure
- `"Occupied"` - Taula ocupada

---

## 🎨 Requisits d'UI/UX

1. **Disseny responsive:** L'aplicació ha de funcionar correctament en diferents mides de pantalla
2. **Feedback visual:** Indicadors de càrrega, estats d'èxit/error
3. **Coherència visual:** Paleta de colors consistent, icones adequades
4. **Experiència d'usuari fluida:** Transicions suaus, estats intermitjos visibles

**Suggeriments de disseny:**
- Utilitza targetes (cards) per a cada taula
- Indicadors de color per diferenciar estats
- Icones per a accions (esborrar, editar, afegir)
- Layout de graella per mostrar múltiples taules

---

## 📋 API Endpoints (json-server)

El servidor s'executa a `http://localhost:3001`

| Mètode | Endpoint | Descripció |
|--------|----------|------------|
| GET | `/tables` | Obtenir totes les taules |
| GET | `/tables/:id` | Obtenir una taula específica |
| POST | `/tables` | Crear una nova taula |
| PATCH | `/tables/:id` | Actualitzar camps d'una taula |
| DELETE | `/tables/:id` | Esborrar una taula |

---

## 🚀 Configuració Inicial

### 1. Instal·lar dependències:
```bash
npm install
```

### 2. Executar el servidor JSON (en un terminal):
```bash
npm run server
```

### 3. Executar l'aplicació (en un altre terminal):
```bash
npm run dev
```

---

## 📝 Criteris d'Avaluació

| Criteri | Puntuació |
|---------|-----------|
| Sistema d'autenticació amb Context | 2.0 |
| Visualització correcta de taules | 1.5 |
| Canvi d'estat (ocupar/alliberar) | 1.5 |
| Gestió completa de comandes | 2.0 |
| Edició de capacitat | 1.5 |
| Eliminació de taules | 0.5 |
| Afegir noves taules | 1.0 |
| **TOTAL** | **10.0** |

### Bonificacions (+1 punt extra):
- Implementació de modo mock (fallback quan el servidor no està disponible)
- Gestió de rols d'usuari (Admin pot esborrar, Cambrer només pot gestionar comandes)
- Animacions i transicions CSS
- Testing amb Jest/React Testing Library
- Gestió d'errors robusta amb missatges personalitzats
- Temps d'ocupació de taula (tracking automàtic)

---

## ⚠️ Normes de l'Examen

1. **Codi propi:** Tot el codi ha de ser escrit durant l'examen
2. **Consulta de documentació:** És permès consultar documentació oficial (React, MDN, etc.)
3. **No està permès:**
   - Copiar codi d'altres projectes
   - Utilitzar IA generativa (ChatGPT, Copilot, etc.)
   - Comunicar-se amb altres estudiants

4. **Lliurament:**
   - Puja tot el projecte (excepte `node_modules`) a la plataforma indicada
   - Inclou un `README.md` amb instruccions per executar el projecte
   - Verifica que el projecte s'executa correctament abans de lliurar

---

## 💡 Consells

- **Comença pel sistema d'autenticació** - És la base per accedir a l'aplicació
- Crea el Context primer, després el LoginPage i finalment protegeix les rutes
- Utilitza `localStorage` per persistir la sessió
- Fes commits regulars al teu repositori Git
- Prova cada funcionalitat abans de continuar amb la següent
- Gestiona correctament els estats asíncrons (loading, error, success)
- Utilitza noms descriptius per components, funcions i variables
- El hook `useAuth()` ha de ser accessible des de qualsevol component

---

## 🎓 Bones pràctiques a valorar

- **Context API correcte:** Provider a nivell d'App, hook personalitzat `useAuth()`
- **Protecció de rutes:** ProtectedRoute component o lògica de redirecció
- **Componentització adequada:** Separació de responsabilitats
- **Gestió d'estat eficient:** Ús correcte de hooks (useState, useEffect, useContext)
- **Codi net i llegible:** Indentació, nomenclatura consistent
- **Maneig d'errors:** Try-catch, gestió de promeses
- **Validacions:** Inputs controlats, verificacions abans d'enviar dades
- **Accessibilitat:** Etiquetes ARIA, navegació per teclat
- **Persistència de sessió:** localStorage per mantenir l'usuari autenticat

---

**Bona sort! 🍀**
