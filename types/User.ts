import { Timestamp } from 'firebase/firestore';
import { ItemBlueprint } from 'screens/camera/AddItemsScreen';
import { Replace } from 'utils/types';

export type FirestoreUserDTO = {
  email: string;
  uid: string;
  items: string[];
};

export type FirestoreUser = {
  name?: string;
  lastName?: string;
  email: string;
  uid: string;
  items: string[];
  createdAt: Timestamp;
};

export type ConvertedFirestoreUser = Replace<FirestoreUser, { items: Item[] }>;

export type Item = {
  ownerId: string;
  receiptDate: Timestamp;
  sku: number;
  brandName: string;
  blueprintId: string;
  blueprint: ItemBlueprint;
  createdAt: Timestamp;
  price: number | null;
};

export type Event = {
  ownerId: string;
  createdAt: Timestamp;
  name: string;
  date: Timestamp;
  description: string;
  location: string;
  imageUrl: string | null;
  groups: string[];
  users: string[];
  confirmedUsers: string[];
  restrictions: {
    maxPeople: number;
  };
};

export type Group = {
  ownerId: string;
  createdAt: Timestamp;
  name: string;
  description: string;
  imageUrl: string | null;
  public?: boolean;
  members: string[];
  invitedUsers: string[];
  inviteLink: string;
};
