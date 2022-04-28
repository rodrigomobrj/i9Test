export interface CreditCard {
  cardNumber: string;
  expirationDate: string;
  cvv: number;
  cardName: string;
  country: string;
  installment: Installment[];
}

export interface Installment {
  amount: string;
  value: number;
  method: string;
}
