
from typing import List, Any
from .base import BaseGeometry

class FanoEngine(BaseGeometry):
    """
    Engine for Fano Plane (v=7, b=7, r=3, k=3, lambda=1).
    Implements the specific '1432756' cyclic shift logic.
    """
    def __init__(self, elements: List[Any]):
        super().__init__(elements, system_type="fano_7")
        if len(elements) != 7:
             # Basic validation, though real app might handle padding/trimming
             raise ValueError("FanoEngine requires exactly 7 elements.")

    def generate_system(self) -> List[List[Any]]:
        """
        Generates the standard cyclic Fano Plane triples.
        Base block (0, 1, 3) mod 7.
        """
        # We work with 0-based indices internally for generation
        base = [0, 1, 3]
        self.triples = []
        
        # Determine the order of elements currently stored
        # If headers are locked, we generate based on that locked order?
        # Typically, Fano is generated on the canonical indices 0..6, 
        # then mapped to whatever values are in those slots.
        
        for i in range(7):
            # Generate indices
            triple_idx = [(x + i) % 7 for x in base]
            # Map to actual element values
            triple_vals = [self.elements[idx] for idx in triple_idx]
            self.triples.append(triple_vals)
            
        return self.triples

    def apply_locking_key(self, key: str = "1432756") -> List[Any]:
        """
        Reorders self.elements based on the key, effectively 'locking' the columns.
        Key '1432756' implies the 1st element stays 1st, 2nd becomes 4th, etc?
        
        Interpretation from previous script:
        Key '1432756' implies the order: 1st, 4th, 3rd, 2nd, 7th, 5th, 6th elements of the INPUT.
        """
        if len(key) != 7:
            raise ValueError("Key must be length 7 for Fano Engine.")

        # Convert 1-based key string to 0-based indices
        key_indices = [int(k) - 1 for k in str(key)]
        
        # Reorder the master elements list
        locked_elements = [self.elements[i] for i in key_indices]
        
        # Update internal state
        self.elements = locked_elements
        
        # Regenerate triples based on new Element Order?
        # OR just re-generate the incidence matrix based on new column order?
        # Usually, 'locking' implies we view the SAME triples through a NEW column permutation.
        # But if we change self.elements, generate_system usage of indices will map to new values.
        # The user's prompt implies the columns (visual) are locked.
        # So we keep the triples as is (semantically), but the Incidence Matrix 
        # will show them under the new column header order.
        
        # Actually, let's strictly follow the 'visual lock' concept:
        # The 'System' (Triples) remains invariant. The 'View' (Columns) changes.
        # So we update self.elements to reflect the Column Headers of the Table.
        # get_incidence_matrix uses self.elements as the column order.
        
        return self.elements
