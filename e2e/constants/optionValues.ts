export enum SortOptionValues {
    AtoZ = 'Name (A to Z)',
    ZtoA = 'Name (Z to A)',
    lowToHight = 'Price (low to high)',
    highToLow = 'Price (high to low)'
}

export type SortDirection = 'asc' | 'desc';

export type MenuOptionValues = 'All Items' | 'About' | 'Logout' | 'Reset App State'