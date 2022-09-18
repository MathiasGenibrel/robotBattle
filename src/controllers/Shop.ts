// Import interfaces
import { IResponse } from "./User.types";

class Shop {
  public static render: IResponse = (_req, res) => {
    // TODO Connect to DB
    const items = [
      {
        name: "Wooden Sword",
        gain: "1 strenght",
        price: "100 gold",
      },
      {
        name: "Stone Sword",
        gain: "4 strenght",
        price: "321 gold",
      },
      {
        name: "Iron Sword",
        gain: "7 strenght",
        price: "546 gold",
      },
      {
        name: "Gold Sword",
        gain: "11 strenght",
        price: "687 gold",
      },
      {
        name: "Diamond Sword",
        gain: "15 strenght",
        price: "1000 gold",
      },
    ];

    res.render(`shop.ejs`, { items });
  };
}

export default Shop;
