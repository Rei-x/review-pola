export interface Cocktail{
    "id": string,
    "name": string,
    "category": string,
    "glass": string,
    "instructions": string,
    "imageUrl": string,
    "alcoholic": string,
    "createdAt": string,
    "updatedAt": string
    "ingredients"?: Ingredient[],
}

export interface Ingredient {
    "id": string,
    "name": string,
    "description": string,
    "alcohol": string,
    "type": string,
    "percentage": string,
    "imageUrl": string,
    "createdAt": string,
    "updatedAt": string,
    "measure": string
}