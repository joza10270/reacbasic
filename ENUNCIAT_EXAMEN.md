# EXAMEN PRÀCTIC - Desenvolupament Web amb React

## Aplicació de Gestió de Taules d'un Restaurant

**Durada:** 3 hores  
**Puntuació total:** 10 punts

---

## Context

Has de desenvolupar una aplicació web per gestionar les taules d'un restaurant. L'aplicació ha de permetre visualitzar l'estat de les taules (lliures o ocupades), gestionar comandes i modificar la configuració de les taules.

---

## Funcionalitats Requerides

### 1. Visualització de Taules (1.5 punts)

Crea un component que mostri un llistat de totes les taules del restaurant amb la següent informació:

- **Número de taula**
- **Capacitat** (número de persones)
- **Estat actual** (Lliure / Ocupada)
  - Indicador visual de color: verd per taules lliures, vermell per taules ocupades
- **Llista de comandes** associades a cada taula

**Requisits tècnics:**
- Utilitza un layout responsive (grid o flexbox)
- Les dades s'han de carregar des d'un servidor JSON (json-server). Compte cal definir en cada component:
    const apiUrl = "http://127.0.0.1:3001" (no funciona el .env, ni localhost)
- Mostra un indicador de càrrega mentre es recuperen les dades
- Gestiona possibles errors de connexió amb el servidor

---

### 2. Gestió d'Estats de Taules (1.5 punts)

Implementa la funcionalitat per canviar l'estat d'una taula:

- **Botó "Ocupar Taula"** (quan està lliure)
- **Botó "Alliberar Taula"** (quan està ocupada)

**Comportament esperat:**
- Quan una taula passa a estat "Lliure", totes les seves comandes s'han d'eliminar automàticament
- Les actualitzacions han de ser immediates (UI optimista)
- En cas d'error, revertir l'estat anterior

---

### 3. Gestió de Comandes (2 punts)

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

##  Sistema d'Autenticació (1.5 punts)

Evitar l'accés a l'aplicació sense fer un login previ. Aquest login consistirà en un formulari que demanarà un codi a l'entrada

- Codi: `ADMIN2024` → Usuari: "Administrador"
- Codi: `CAMBRER2024` → Usuari: "Cambrer"

- Aquests codis no consten en BD, estan en el propi codi.
- Quan es valida el codi, l'aplicació permet la visualització de la resta de l'aplicació
- El codi es pot utilitzar a mode de token.
- Cal modificar App.jsx per a incorporar la nova ruta /login i establir la condicionalitat de la resta segons el token
- Cal modificar Header.jsx per a mostrar el nom de l'usuari, i un botó de logout
- Quan es fa logout, s'elimina el token, havent de provocar la tornada a /login
- Obligatori:  Utilitzar useContext per a transferir el que calgui als components que ho necessitin
- Obligatori:  Utilitzar localAStorage per a mantenir la sessió oberta en cas de recàrrega


## Tecnologies i Eines

### Obligatòries:
- **React 19** (amb hooks: useState, useEffect)
- **React Router** (per navegació entre vistes)
- **json-server** (servidor REST per dades)
- **Vite** (build tool)
- **Bootstrap 5.3.8** (framework CSS)

### Llibreries incloses:
- **bootstrap-icons** (icones - veure guia a `BOOTSTRAP_ICONS.md`)

---

## Guia d'Estructura de Components

Aquesta és l'estructura recomanada de components per completar l'aplicació. Pots adaptar-la segons les teves necessitats.

### Estructura suggerida:

```
src/
├── App.jsx                 # Component principal amb rutes
├── context/
│   └── AuthContext.jsx     # Context per autenticació
├── components/
│   ├── LoginPage.jsx       # Pàgina de login
│   ├── Header.jsx          # Capçalera i navegació
│   ├── TableList.jsx       # Llista de totes les taules
│   ├── TableItem.jsx       # Targeta individual de taula
│   └── AddTableForm.jsx    # Formulari per crear taules

```

---


## Flux d'autenticació recomanat

1. **Usuari** accedeix a l'aplicació → redirigit a `/login`
2. **LoginPage** valida el codi d'accés i crida `login(code)` del context
3. **AuthContext** comprova el codi i actualitza l'estat amb les dades de l'usuari
4. **App** detecta que està autenticat i permet l'accés a rutes protegides
5. **Header** mostra el nom de l'usuari i botó de logout
6. **Logout** esborra l'estat i redirigeix a `/login`

---

## Criteris d'avaluació per autenticació

| Criteri | Puntuació |
|---------|-----------|
| Context creat correctament amb Provider | 0.3 |
| LoginPage funcional amb validació | 0.4 |
| Rutes protegides implementades | 0.4 |
| Header mostra usuari i logout | 0.2 |
| Gestió d'estat persistent (localStorage) | 0.2 |
| **TOTAL BONIFICACIÓ** | **+1.5** |

---

### **App.jsx** - Component principal

**Responsabilitat:**
- Configurar React Router amb les rutes de l'aplicació
- Incloure el Header a totes les pàgines

**Rutes necessàries:**
- `/` - Pàgina principal amb TableList
- `/add` - Pàgina del formulari AddTableForm
- `/login` - Login
- Incloure un component per a rutes inexsitents (notfound) 

**Elements clau:**
- BrowserRouter o HashRouter
- Routes i Route per cada pàgina
- Component Header fora de Routes (visible a totes les pàgines)

---

### **Header.jsx** - Capçalera i navegació

**Responsabilitat:**
- Mostrar el títol de l'aplicació
- Proporcionar navegació entre les pàgines principals

**Contingut recomanat:**
- Títol amb icona (ex: "Gestió de Taules")
- Links de navegació: "Taules" i "Nova Taula"
- Utilitzar la navbar de Bootstrap
- Icons de bootstrap-icons per cada link

**Classes Bootstrap útils:**
- `navbar`, `navbar-dark`, `bg-dark`
- `container-fluid`
- `btn`, `btn-outline-light`

---

### **TableList.jsx** - Llista de taules

**Responsabilitat:**
- Carregar totes les taules des del servidor
- Mostrar indicadors de càrrega i errors
- Renderitzar un TableItem per cada taula
- Gestionar totes les operacions (esborrar, canviar estat, etc.)

**Estat necessari (useState):**
- `tables` - Array amb les taules
- `loading` - Boolean per indicador de càrrega
- `error` - String amb missatge d'error o null

**Funcions callback per passar a TableItem:**
- `handleDelete(id)` - Esborrar una taula
- `handleToggleStatus(id, currentStatus)` - Canviar estat Free/Occupied
- `handleAddOrder(tableId, orderName)` - Afegir comanda
- `handleRemoveOrder(tableId, orderId)` - Esborrar comanda
- `handleToggleOrderDone(tableId, orderId)` - Marcar servida
- `handleUpdateCapacity(tableId, newCapacity)` - Actualitzar capacitat

**useEffect:**
- Carregar dades quan el component es munta

**Layout recomanat:**
- Container de Bootstrap
- Grid responsive (row + col-md-6 col-lg-4)
- Spinner mentre carrega
- Alert per errors

---

### **TableItem.jsx** - Targeta de taula

**Responsabilitat:**
- Mostrar informació d'una taula individual
- Permetre totes les operacions sobre la taula
- Gestionar el mode d'edició de capacitat
- Gestionar l'input per afegir comandes

**Props rebudes:**
- `table` - Objecte amb les dades de la taula
- `onDelete`, `onToggleStatus`, `onAddOrder`, `onRemoveOrder`, `onToggleOrderDone`, `onUpdateCapacity` - Callbacks

**Estat local (useState):**
- `isEditingCapacity` - Boolean per mode d'edició
- `editCapacity` - Valor temporal durant l'edició
- `newOrderName` - Text de l'input per afegir comanda

**Estructura visual recomanada:**
- Badge per indicar estat (Free/Occupied)
- Número de taula i botó esborrar
- Capacitat amb botó editar (inline edit quan actiu)
- Llista de comandes amb checkbox/botó per marcar servida
- Input per afegir comanda (només si ocupada)
- Botó principal (Ocupar/Alliberar)

**Classes Bootstrap útils:**
- `card`, `card-body`
- `badge`, `bg-success`, `bg-danger`
- `btn`, `btn-sm`, `btn-primary`, `btn-danger`
- `form-control`, `form-check`
- `list-group`, `list-group-item`
- `text-decoration-line-through` per comandes servides

---

### **AddTableForm.jsx** - Formulari per a crear taules

**Responsabilitat:**
- Mostrar formulari amb camps número i capacitat
- Validar les dades abans d'enviar
- Crear la nova taula al servidor
- Redirigir a la llista després de crear

**Estat local (useState):**
- `number` - Número de la taula
- `capacity` - Capacitat
- `errors` - Objecte amb errors de validació
- `isSubmitting` - Boolean per deshabilitar botó durant enviament

**Funcions necessàries:**
- `handleSubmit(e)` - Processar l'enviament del formulari
- `handleChange(e)` - Actualitzar estat quan canvien els inputs
- `validateForm()` - Comprovar que les dades són vàlides

**Validacions:**
- Camps no buits
- Números positius
- Capacitat mínima 1

**Hook de React Router:**
- `useNavigate` per redirigir a "/" després de crear

**Classes Bootstrap útils:**
- `container`, `mt-4`
- `card`, `card-body`
- `form-label`, `form-control`
- `mb-3` per separar camps
- `btn`, `btn-primary`
- `alert`, `alert-danger` per errors

---

### **services/api.js** - Capa de serveis

Podeu incloure-les en cada component, enlloc d'aquí

**Responsabilitat:**
- Centralitzar totes les crides a l'API
- Facilitar el manteniment i reutilització

**Funcions recomanades:**
- `fetchTables()` - GET totes les taules
- `createTable(tableData)` - POST nova taula
- `updateTable(id, data)` - PATCH actualitzar taula
- `deleteTable(id)` - DELETE esborrar taula

**Recorda:**
- URL base: `http://127.0.0.1:3001/tables`
- Utilitzar fetch amb async/await
- Gestionar errors amb throw
- Retornar les dades en format JSON

---

## Flux de dades recomanat

1. **TableList** carrega les dades i manté l'estat global
2. **TableList** passa dades i callbacks a cada **TableItem**
3. **TableItem** crida els callbacks quan l'usuari fa accions
4. **TableList** actualitza l'estat i fa la crida API


---

## Consideracions de disseny

- Utilitza colors Bootstrap: success (verd), danger (vermell), primary (blau)
- Afegeix icons de bootstrap-icons a botons i títols
- Usa `disabled` als inputs/botons quan sigui necessari
- Mostra feedback visual per totes les accions
- Layout responsive amb classes col-* de Bootstrap

---

## Estructura de Dades

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

## Requisits d'UI/UX

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

## API Endpoints (json-server)

El servidor s'executa a `http://127.0.0.1:3001`

| Mètode | Endpoint | Descripció |
|--------|----------|------------|
| GET | `/tables` | Obtenir totes les taules |
| GET | `/tables/:id` | Obtenir una taula específica |
| POST | `/tables` | Crear una nova taula |
| PATCH | `/tables/:id` | Actualitzar camps d'una taula |
| DELETE | `/tables/:id` | Esborrar una taula |

---

## Configuració Inicial

**IMPORTANT: Configuració sense Internet**

Aquest projecte està configurat per funcionar completament offline des del moment en el qual el desacarregues del Moodle. Tots els recursos (React, Bootstrap, Bootstrap Icons) s'instal·len localment a `node_modules/`.

En cas de no poder iniciar el projecte, avisa al professor per a que t'ho resolgui


### Durant l'examen (sense connexió a Internet):

**1. Executar el servidor JSON (en un terminal):**
```bash
npm run server
```

**2. Executar l'aplicació (en un altre terminal):**
```bash
npm run dev
```

**3. Accedir a l'aplicació:**
- Aplicació React: `http://localhost:5173` (o el port que mostri Vite)
- API json-server: `http://127.0.0.1:3001`

### Verificació que tot funciona offline:

- ✓ React 19 i React DOM → instal·lats localment
- ✓ Bootstrap 5.3.8 CSS → `node_modules/bootstrap/`
- ✓ Bootstrap Icons → `node_modules/bootstrap-icons/`
- ✓ Vite → executa des de node_modules
- ✓ json-server → executa des de node_modules
- ✓ **NO hi ha cap CDN extern** a l'HTML

---

## Criteris d'Avaluació

| Criteri | Puntuació |
|---------|-----------|
| Visualització correcta de taules | 2.0 |
| Canvi d'estat (ocupar/alliberar) | 2.0 |
| Gestió completa de comandes | 2.5 |
| Edició de capacitat | 1.5 |
| Eliminació de taules | 1.0 |
| Afegir noves taules | 1.0 |
| **TOTAL** | **10.0** |



---

## Normes de l'Examen

1. **Codi propi:** Tot el codi ha de ser escrit durant l'examen
3. **No està permès:**
   - Copiar codi d'altres projectes
   - Utilitzar IA generativa (ChatGPT, Copilot, etc.)
   - Comunicar-se amb altres estudiants (Recorda que el Moodle té Logs!)

4. **Lliurament:**
   - Puja tot el projecte al **Moodle** en format ZIP o carpeta comprimida
   - **NO incloure la carpeta `node_modules`** (és massa gran i innecessària)
   - Inclou un `README.md` amb instruccions per executar el projecte, si fas algun canvi en aquest aspecte
   - Verifica que el projecte s'executa correctament abans de lliurar
   - Estructura esperada del ZIP:
     ```
     nom-cognom-examen-react.zip
     ├── src/ o components/
     ├── db.json
     ├── package.json
     ├── index.html
     ├── vite.config.js
     └── README.md
     ```

---

## Consells

- Comença per les funcionalitats bàsiques abans de les avançades
- Prova cada funcionalitat abans de continuar amb la següent
- Gestiona correctament els estats asíncrons (loading, error, success)
- Utilitza noms descriptius per a funcions i variables
- Comenta el codi on sigui necessari per explicar lògica complexa

---

## Bones pràctiques a valorar

- **Componentització adequada:** Separació de responsabilitats
- **Gestió d'estat eficient:** Ús correcte de hooks
- **Codi net i llegible:** Indentació, nomenclatura consistent
- **Maneig d'errors:** Try-catch, gestió de promeses
- **Validacions:** Inputs controlats, verificacions abans d'enviar dades
- **Accessibilitat:** Etiquetes ARIA, navegació per teclat

---

**Bona sort! **
