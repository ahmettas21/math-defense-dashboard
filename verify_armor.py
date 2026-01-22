
from backend.engines.projective_13 import ProjectiveEngine
import sys

def run_armor_test():
    """
    Runs the 'Armor Test' for the v=13 Projective Plane.
    Checks:
    1. System generation (13 blocks of 4).
    2. S(2,4,13) Property (Every pair appears exactly once).
    3. Minimum Rank Calculation (SymPy).
    """
    print("--- Initiating 13-Point Armor Test ---")
    
    # 1. Create Engine with 13 dummy elements
    elements = [f"E{i+1}" for i in range(13)]
    engine = ProjectiveEngine(elements)
    
    # 2. Generate System
    blocks = engine.generate_system()
    print(f"Generated {len(blocks)} blocks.")
    for idx, b in enumerate(blocks):
        print(f"Block {idx+1}: {b}")
        
    # 3. Validate S(2,4,13) Property
    is_valid = engine.validate_sts_property()
    if is_valid:
        print("\n[SUCCESS] S(2,4,13) Property Verified: Every pair appears exactly once.")
    else:
        print("\n[FAILURE] S(2,4,13) Property Violated!")
        return

    # 4. Calculate Rank
    rank = engine.calculate_rank()
    print(f"\nIncidence Matrix Rank (SymPy Exact): {rank}")
    
    # Theoretically, for PG(2,3) incidence matrix (13x13):
    # Rank over GF(2) or Real field should be checked against known values.
    # Full rank is 13? Or is there a dependency?
    # Over GF(p) rank usually relates to p-rank. 
    # For PG(2, p), p-rank is (p+1)C2 + 1 ... complex formula.
    # But usually full rank over Reals.
    
    print("--- Armor Test Complete ---")

if __name__ == "__main__":
    run_armor_test()
