import { Timestamp } from 'firebase/firestore';

export type FirestoreUserDTO = {
  email: string;
  uid: string;
};

export type FirestoreUser = {
  name?: string;
  lastName?: string;
  email: string;
  uid: string;
  createdAt: Timestamp;
};

export type EventDTO = {
  ownerId: string;
  name: string;
  date: Date;
  time: {
    hours: number;
    minutes: number;
  };
  description?: string;
  location: string;
  imageUrl?: string | null;
  groups?: string[];
  users?: string[];
};

export type Event = {
  ownerId: string;
  createdAt: Timestamp;
  name: string;
  date: Timestamp;
  time: {
    hours: number;
    minutes: number;
  };
  description?: string;
  location: string;
  imageUrl: string | null;
  groups?: string[];
  users?: string[];
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
