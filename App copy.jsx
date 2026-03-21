import React from 'react';

export default function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-4 p-md-5">
              <h1 className="h3 mb-3">Starter de l'Examen</h1>
              <p className="text-muted">
                Projecte mínim amb React + Vite i Bootstrap instal·lat. Pots començar a construir la teva aplicació aquí.
              </p>

              <hr className="my-4" />

              <div className="alert alert-info" role="alert">
                <strong>Consell:</strong> Crea els teus components a <code>src/</code> o a l'arrel i importa'ls aquí. Afegeix rutes, context i la resta segons l'enunciat.
              </div>

              <div className="mt-4">
                <button type="button" className="btn btn-primary me-2">
                  <i className="bi bi-check-circle me-1"></i>
                  Botó Bootstrap
                </button>
                <button type="button" className="btn btn-outline-secondary">
                  <i className="bi bi-gear me-1"></i>
                  Acció secundària
                </button>
              </div>

              <div className="mt-4">
                <h5 className="mb-3">Exemples d'ús:</h5>
                <pre className="bg-light p-3 rounded small">
{`// Exemple amb components i Bootstrap Icons
export function Exemple() {
  return (
    <div>
      <h3>
        <i className="bi bi-cup-hot"></i> Restaurant
      </h3>
      <button className="btn btn-success">
        <i className="bi bi-plus-circle"></i> Afegir
      </button>
      <button className="btn btn-danger">
        <i className="bi bi-trash"></i> Esborrar
      </button>
    </div>
  );
}

// Icones disponibles: bi-heart, bi-star-fill,
// bi-pencil, bi-check, bi-x, bi-gear, etc.
// Veure totes a: https://icons.getbootstrap.com/
`}
                </pre>
              </div>

              <div className="mt-4">
                <h5 className="mb-3">Formulari de Login (Exemple):</h5>
                <div className="card" style={{maxWidth: '480px'}}>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Codi d'accés</label>
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bi bi-key"></i>
                          </span>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Introdueix el codi (p.ex. ADMIN2024)"
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary w-100">
                        <i className="bi bi-box-arrow-in-right me-1"></i>
                        Entrar
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <h5 className="mb-3">Spinner de Loading (Exemple):</h5>
                <div className="card">
                  <div className="card-body text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Carregant...</span>
                    </div>
                    <p className="mt-3 text-muted">Carregant dades...</p>
                    
                    <hr className="my-4" />
                    
                    <div>
                      <p className="small text-muted mb-2">Variants disponibles:</p>
                      <div className="d-flex justify-content-center gap-3">
                        <div className="spinner-border spinner-border-sm text-primary" role="status">
                          <span className="visually-hidden">Carregant...</span>
                        </div>
                        <div className="spinner-border text-success" role="status">
                          <span className="visually-hidden">Carregant...</span>
                        </div>
                        <div className="spinner-grow text-danger" role="status">
                          <span className="visually-hidden">Carregant...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}