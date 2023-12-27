/**
 * Returns the multiple of five closest to but not more than n.
 * @param n non-negative number
 * @returns m such that 5m <= n < 5(m+1)
 */
export function multOfFive(n: number): number {
  let m: number = 0;
  // Inv: 5*m = n_0 - n and n >= 0
  while (n >= 5) {
    m = m + 1;
    n = n - 5;
  }
  return m;
}

// Version of above that fails for n >= 10
export function multOfFive10(n: number): number {
  let m: number = 0;
  while (n >= 5) {
    m = n >= 10 ? m : m + 1;
    n = n - 5;
  }
  return m;
}

// Version of above that fails for n = 5 but passes 0, 4, 8, and 12
export function multOfFive5(n: number): number {
  let m: number = 0;
  while (n >= (n === 5 ? 6 : 5)) { 
    m = m + 1;
    n = n - 5;
  }
  return m;
}

// Version of above that fails for n = 0 but passes 4, 8, and 12
export function multOfFive0(n: number): number {
  let m: number = n === 0 ? -1 : 0; 
  while (n >= 5) {
    m = m + 1;
    n = n - 5;
  }
  return m;
}
