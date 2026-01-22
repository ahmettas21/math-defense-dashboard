
from abc import ABC, abstractmethod
from typing import List, Dict, Any
import numpy as np

class BaseGeometry(ABC):
    """
    Abstract Base Class for all geometric optimization engines.
    Enforces the 'System Factory' pattern for v=7, 9, 13, 15 etc.
    """
    def __init__(self, elements: List[Any], system_type: str):
        self.elements = elements
        self.system_type = system_type
        self.n = len(elements)
        self.triples = []
        self.incidence_matrix = None

    @abstractmethod
    def generate_system(self) -> List[List[Any]]:
        """Generates the blocks/triples for the specific geometry."""
        pass

    @abstractmethod
    def apply_locking_key(self, key: str) -> List[Any]:
        """Applies a specific permutation key to the system columns."""
        pass

    def get_incidence_matrix(self) -> List[List[int]]:
        """
        Generates the 0-1 Incidence Matrix for the generated system.
        Rows: Blocks/Coupons
        Cols: Elements (in key-locked order)
        """
        if not self.triples:
            return []

        # Map elements to their current indices (assumes elements are unique)
        # Note: If apply_locking_key changed self.elements order, this reflects that.
        elem_to_idx = {el: i for i, el in enumerate(self.elements)}
        
        matrix = []
        for block in self.triples:
            row = [0] * self.n
            for item in block:
                if item in elem_to_idx:
                    row[elem_to_idx[item]] = 1
            matrix.append(row)
        
        self.incidence_matrix = matrix
        return matrix

    def calculate_rank(self) -> int:
        """
        Calculates the generic rank of the incidence matrix over GF(2) or Rationals using SymPy.
        Using SymPy avoids floating point errors (Golden Lock #5).
        """
        if not self.incidence_matrix:
            self.get_incidence_matrix()
        
        try:
            from sympy import Matrix
            # Create a SymPy Matrix
            sym_matrix = Matrix(self.incidence_matrix)
            # Calculate rank (exact)
            return sym_matrix.rank()
        except ImportError:
            print("SymPy not found, falling back to NumPy (Potential Float Error!)")
            np_matrix = np.array(self.incidence_matrix)
            return int(np.linalg.matrix_rank(np_matrix))

    def validate_sts_property(self) -> bool:
        """
        Validates if every pair of elements appears exactly once together.
        (S(2,3,v) property)
        """
        from itertools import combinations
        pair_counts = {}
        
        for block in self.triples:
            for pair in combinations(block, 2):
                # Sort pair to ensure (A,B) is same as (B,A)
                sorted_pair = tuple(sorted(str(x) for x in pair))
                pair_counts[sorted_pair] = pair_counts.get(sorted_pair, 0) + 1
        
        # Check if all counts are 1
        return all(count == 1 for count in pair_counts.values())
