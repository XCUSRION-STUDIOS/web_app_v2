// interface Character {
//     username: string;
//     age: string;
//     height: string;
//     ethnicity: string;
//     occupation: string;
//     createdAt: number;
//   }
  
  
//   export const loadStats = (): Character => {
//     const storedCharacter = localStorage.getItem("characters");
  
//     if (storedCharacter) {
//       return JSON.parse(storedCharacter) as Character;
//     }
  
//     // Default stats if none are found in storage
//     return {
//         username: "John",
//         age: "30",
//         height: "180",
//         ethnicity: "White",
//         occupation: "Office Worker",
//         createdAt: Date.now(),
//     };
//   };
  

interface Character {
    username: string;
    age: string;
    height: string;
    ethnicity: string;
    occupation: string;
    createdAt: number;
  }
  
  export const loadCharacter = (): Character => {
    const storedCharacter = localStorage.getItem("characters");
  
    if (storedCharacter) {
      return JSON.parse(storedCharacter) as Character;
    }
  
    // Default stats if none are found in storage
    return {
      username: "John",
      age: "30",
      height: "180",
      ethnicity: "White",
      occupation: "Office Worker",
      createdAt: Date.now(),
    };
  };
  
  // Store character data in localStorage
  export const storeCharacter = (character: Character): void => {
    localStorage.setItem("characters", JSON.stringify(character));
  };
  