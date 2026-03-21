# Bootstrap Icons - Guia d'Ús

## 📦 Instal·lació

Bootstrap Icons ja està instal·lat en aquest projecte. Els estils s'importen automàticament a `index.jsx`:

```jsx
import 'bootstrap-icons/font/bootstrap-icons.css';
```

## 🎨 Com utilitzar les icones

### Sintaxi bàsica

Les icones de Bootstrap s'utilitzen amb l'element `<i>` i classes CSS:

```jsx
<i className="bi bi-nom-icona"></i>
```

### Exemples pràctics

```jsx
// Icona simple
<i className="bi bi-heart"></i>

// Icona dins d'un botó
<button className="btn btn-primary">
  <i className="bi bi-plus-circle"></i> Afegir
</button>

// Icona amb marge
<button className="btn btn-danger">
  <i className="bi bi-trash me-2"></i> Esborrar
</button>

// Icona gran
<i className="bi bi-star-fill" style={{ fontSize: '2rem' }}></i>

// Icona amb color
<i className="bi bi-check-circle text-success"></i>
```

## 🔍 Icones més utilitzades per a una aplicació de restaurant

### Navegació i accions
- `bi-house` - Inici
- `bi-plus-circle` - Afegir
- `bi-pencil` - Editar
- `bi-trash` - Esborrar
- `bi-x` - Tancar
- `bi-check` - Confirmar
- `bi-arrow-left` - Tornar

### Restaurant i taules
- `bi-cup-hot` - Restaurant/begudes
- `bi-shop` - Establiment
- `bi-grid` - Graella/taules
- `bi-people` - Persones/capacitat
- `bi-person` - Usuari
- `bi-door-open` - Entrada/sortida

### Estats i feedback
- `bi-check-circle` - Èxit
- `bi-x-circle` - Error
- `bi-exclamation-triangle` - Avís
- `bi-info-circle` - Informació
- `bi-clock` - Temps

### Comandes i menú
- `bi-list` - Llistat
- `bi-menu-button` - Menú
- `bi-cart` - Comanda
- `bi-bag` - Bossa/takeaway
- `bi-receipt` - Factura

### Autenticació
- `bi-lock` - Bloqueig/seguretat
- `bi-unlock` - Desbloqueig
- `bi-key` - Clau
- `bi-box-arrow-right` - Logout
- `bi-person-circle` - Perfil d'usuari

## 🎨 Personalitzar les icones

### Mida

```jsx
// Amb classes de Bootstrap
<i className="bi bi-heart fs-1"></i>  // Molt gran
<i className="bi bi-heart fs-3"></i>  // Gran
<i className="bi bi-heart fs-5"></i>  // Normal

// Amb estils inline
<i className="bi bi-star" style={{ fontSize: '24px' }}></i>
<i className="bi bi-star" style={{ fontSize: '3rem' }}></i>
```

### Color

```jsx
// Amb classes de Bootstrap
<i className="bi bi-check text-success"></i>    // Verd
<i className="bi bi-x text-danger"></i>         // Vermell
<i className="bi bi-info text-primary"></i>     // Blau
<i className="bi bi-exclamation text-warning"></i> // Groc

// Amb estils inline
<i className="bi bi-heart" style={{ color: '#ff6b6b' }}></i>
```

### Rotació i transformació

```jsx
// Rotar 90 graus
<i className="bi bi-arrow-right" style={{ transform: 'rotate(90deg)' }}></i>

// Invertir horitzontalment
<i className="bi bi-arrow-right" style={{ transform: 'scaleX(-1)' }}></i>
```

## 📚 Variants d'icones

Moltes icones tenen variants:

- **Normal**: `bi-heart`
- **Fill (omplerta)**: `bi-heart-fill`
- **Half (mig)**: `bi-heart-half`

Exemples:
```jsx
<i className="bi bi-star"></i>        // Estrella buida
<i className="bi bi-star-fill"></i>   // Estrella omplerta
<i className="bi bi-star-half"></i>   // Mitja estrella
```

## 🔗 Recursos

- **Catàleg complet**: https://icons.getbootstrap.com/
- **Documentació oficial**: https://icons.getbootstrap.com/
- **Total d'icones**: Més de 2.000 icones

## 💡 Consells

1. **Consistència**: Utilitza sempre el mateix estil d'icona (fill o outline) a tota l'aplicació.

2. **Accessibilitat**: Afegeix text alternatiu per a lectors de pantalla:
```jsx
<i className="bi bi-trash" aria-label="Esborrar"></i>
```

3. **Marge**: Utilitza classes de Bootstrap per separar icones del text:
```jsx
<i className="bi bi-plus me-2"></i> Afegir  // Marge dreta
<i className="bi bi-plus ms-2"></i>         // Marge esquerra
```

4. **Loading**: Per indicadors de càrrega, considera usar l'icona:
```jsx
<i className="bi bi-arrow-repeat spinner"></i> // Necessita CSS custom
```

5. **Botó només icona**: Assegura't que tingui mida adequada:
```jsx
<button className="btn btn-primary btn-sm">
  <i className="bi bi-pencil"></i>
</button>
```

## 🎯 Exemple complet per a una aplicació de restaurant

```jsx
export function TableCard({ table }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">
          <i className="bi bi-grid-3x3-gap me-2"></i>
          Taula {table.number}
        </h5>
        
        <p className="card-text">
          <i className="bi bi-people me-2"></i>
          Capacitat: {table.capacity} persones
        </p>
        
        <div className="btn-group" role="group">
          <button className="btn btn-primary btn-sm">
            <i className="bi bi-pencil me-1"></i>
            Editar
          </button>
          <button className="btn btn-danger btn-sm">
            <i className="bi bi-trash me-1"></i>
            Esborrar
          </button>
        </div>
        
        {table.status === 'Free' ? (
          <span className="badge bg-success">
            <i className="bi bi-check-circle me-1"></i>
            Lliure
          </span>
        ) : (
          <span className="badge bg-danger">
            <i className="bi bi-x-circle me-1"></i>
            Ocupada
          </span>
        )}
      </div>
    </div>
  );
}
```

---

**Nota**: Aquest projecte utilitza Bootstrap Icons v1.11.3 amb més de 2.000 icones disponibles.
