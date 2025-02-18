// interface ShopItem {
//     id: number;
//     name: string;
//     description: string;
//     price: number;
//     purchased: boolean;
//   }
  
//   export const loadShop = (): ShopItem => {
//     const storedItems = localStorage.getItem("itemShop");
  
//     if (storedItems) {
//       return JSON.parse(storedItems) as ShopItem;
//     }
  
//     // Default stats if none are found in storage
//     return {
//         id: 0,
//         name: "",
//         description: "",
//         price: 0,
//         purchased: false,
//     };
//   };
  
//   // Store character data in localStorage
//   export const storeShop = (shop: ShopItem): void => {
//     localStorage.setItem("itemShop", JSON.stringify(shop));
//   };
  

// Define the ShopItem type
export interface ShopItem {
    id: number;
    name: string;
    description: string;
    price: number;
    purchased: boolean;
  }
  
  // Default shop items
  const defaultShopItems: ShopItem[] = [
    { id: 101, name: "Health Potion", description: "Restores 50% of your health.", price: 100, purchased: false },
    { id: 102, name: "XP Boost", description: "Increases XP gain by 20% for 1 hour.", price: 250, purchased: false },
    { id: 103, name: "Permanent Strength Boost", description: "Increases physical stats permanently by 10%.", price: 500, purchased: false },
  ];
  
  // Load shop items from local storage or use defaults
  export const loadShop = (): ShopItem[] => {
    const storedItems = localStorage.getItem("itemShop");
    return storedItems ? JSON.parse(storedItems) as ShopItem[] : defaultShopItems;
  };
  
  // Store shop items in local storage
  export const storeShop = (shop: ShopItem[]): void => {
    localStorage.setItem("itemShop", JSON.stringify(shop));
  };
  