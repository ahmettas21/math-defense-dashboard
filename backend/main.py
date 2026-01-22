
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict, Any

from engines.fano_7 import FanoEngine
from engines.projective_13 import ProjectiveEngine
from engines.affine_9 import AffineEngine
from engines.steiner_15 import SteinerEngine

app = FastAPI(title="Minimum Rank Optimization Platform", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For dev; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    elements: List[Any]
    key: Optional[str] = None

class SystemResponse(BaseModel):
    system_type: str
    n: int
    rank: int
    triples: List[List[Any]]
    incidence_matrix: List[List[int]]
    elements: List[Any]

@app.get("/")
def read_root():
    return {"message": "System Engine Online. Use /generate/{system_type} to create locks."}

@app.post("/generate/{system_type}", response_model=SystemResponse)
def generate_system(system_type: str, request: GenerateRequest):
    """
    Generates a geometric optimization system based on the requested type.
    Supported types: 'fano_7', 'projective_13', 'affine_9', 'steiner_15'
    """
    elements = request.elements
    key = request.key

    engine = None
    
    try:
        if system_type == "fano_7":
            if len(elements) != 7:
                 raise HTTPException(status_code=400, detail="Fano system requires exactly 7 elements.")
            engine = FanoEngine(elements)
            
        elif system_type == "projective_13":
             if len(elements) != 13:
                 raise HTTPException(status_code=400, detail="Projective system requires exactly 13 elements.")
             engine = ProjectiveEngine(elements)

        elif system_type == "affine_9":
             if len(elements) != 9:
                 raise HTTPException(status_code=400, detail="Affine system requires exactly 9 elements.")
             engine = AffineEngine(elements)

        elif system_type == "steiner_15":
             if len(elements) != 15:
                 raise HTTPException(status_code=400, detail="Steiner system requires exactly 15 elements.")
             engine = SteinerEngine(elements)
        
        else:
            raise HTTPException(status_code=404, detail="System type not supported.")

        # 1. Apply Key (if any)
        if key:
            engine.apply_locking_key(key)
            
        # 2. Generate System
        triples = engine.generate_system()
        
        # 3. Calculate Rank (SymPy based)
        rank = engine.calculate_rank()
        
        # 4. Get Incidence Matrix
        matrix = engine.get_incidence_matrix()
        
        return SystemResponse(
            system_type=system_type,
            n=engine.n,
            rank=rank,
            triples=triples,
            incidence_matrix=matrix,
            elements=engine.elements
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
