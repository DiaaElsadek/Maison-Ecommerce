export interface Rating {
  rate: number;
  count: number;
}

export interface FakeProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

export interface CartProduct {
  productId: number;
  quantity: number;
}

export interface FakeCart {
  id: number;
  userId: number;
  date: string;
  products: CartProduct[];
}

export interface FakeUser {
  id: number;
  email: string;
  username: string;
  password?: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface AuthResponse {
  token: string;
}
