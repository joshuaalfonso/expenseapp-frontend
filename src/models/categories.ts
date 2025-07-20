


export interface CategoriesList {
    id: number,
    category_name: string,
    category_icon: string,
    description: string,
    is_default: number,
    date_created: string
    total_expense: number,
    total_entries: number,
    last_updated: string
}


export interface CategoriesPost {
    id: number | null,
    category_name: string,
    category_icon: string,
    description: string | null,
    date_created: string | null
}

export interface PaginatedCategory {
  data: CategoriesList[]
  currentPage: number
  perPage: number
  total: number
  totalPages: number
}

