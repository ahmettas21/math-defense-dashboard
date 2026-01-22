
import sys

class FanoOptimizer:
    def __init__(self, elements):
        self.elements = elements
        self.n = len(elements)
        self.triples = []

    def generate_sts(self):
        """Generates Steiner Triple System based on the number of elements."""
        if self.n == 7:
            # Fano Plane (PG(2,2)) Standard Cyclic Generation
            # Base triple (0, 1, 3) shifted mod 7
            base = [0, 1, 3]
            self.triples = []
            for i in range(7):
                triple = [(x + i) % 7 for x in base]
                self.triples.append(triple)
        else:
            print(f"Algorithm for {self.n} elements not yet implemented in this basic version.")
            return []
        
        return self.triples

    def apply_cyclic_shift(self, key="1432756"):
        """
        Applies the '1432756' permutation/key to the system.
        Interpreting key as a mapping priority or column order.
        Key '1432756' implies the order: 1st, 4th, 3rd, 2nd, 7th, 5th, 6th elements.
        """
        # Convert 1-based key string to 0-based indices
        key_indices = [int(k) - 1 for k in str(key)]
        
        print(f"Applying Key Order: {key}")
        
        # We can display the elements in this specific order for 'Vertical Locks'
        # Or re-map the input elements according to this permutation before generation
        
        # Strategy: Re-map input elements based on the key
        # If input is [A, B, C, D, E, F, G] and key is 1432756
        # New order: A, D, C, B, G, E, F
        
        if len(key_indices) != self.n:
            print("Key length does not match number of elements!")
            return

        reordered_elements = [self.elements[i] for i in key_indices]
        
        print("\n--- Vertical Lock Table (Incidence Matrix) ---")
        print(f"Key Sequence (Columns): {'  '.join(map(str, reordered_elements))}")
        print("-" * (len(reordered_elements) * 4 + 10))

        # Create a mapping from element value to its index in the original standard generation
        # so we can check if it exists in a triple.
        # Actually, self.triples contains raw values (if self.elements was used? No, triples has 0,1,3 indices? 
        # Wait, generate_sts stores values?
        # In generate_sts: triple = [(x + i) % 7 for x in base] -> these are 0-based INDICES.
        # display_system prints self.elements[i].
        
        # Let's map back to indices to check presence
        key_indices_map = {val: idx for idx, val in enumerate(key_indices)}
        
        for idx, triple_indices in enumerate(self.triples):
            # triple_indices are indices in self.elements
            # We want to check if the element at key_indices[col] is in the triple
            
            row_str = f"Cpn {idx+1}: "
            for col_idx in range(self.n):
                # The element at this visual column is:
                target_element_idx = key_indices[col_idx]
                
                if target_element_idx in triple_indices:
                    # Mark with the actual element value
                    val = str(self.elements[target_element_idx])
                    row_str += f"{val:<3}"
                else:
                    row_str += ".  "
            print(row_str)

        return reordered_elements

    def display_system(self):
        print(f"\nGenerated System (N={self.n}):")
        for idx, triple in enumerate(self.triples):
            # Map indices back to actual element values
            vals = [str(self.elements[i]) for i in triple]
            print(f"Coupon {idx+1}: {' - '.join(vals)}")

if __name__ == "__main__":
    # Default list for testing
    user_input = sys.argv[1:] if len(sys.argv) > 1 else list(range(1, 8))
    
    if len(user_input) != 7:
        print(f"Currently supporting exactly 7 elements for the demo. You provided {len(user_input)}.")
        print("Using default 1-7 set.")
        user_input = list(range(1, 8))

    optimizer = FanoOptimizer(user_input)
    optimizer.generate_sts()
    
    print("Standard Generation:")
    optimizer.display_system()
    
    optimizer.apply_cyclic_shift("1432756")
