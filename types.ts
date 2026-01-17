
export interface User {
  name: string;
  email: string;
  id: string;
  avatar?: string;
  provider?: 'email' | 'google' | 'apple';
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
  image?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: number;
}

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
};

export type Theme = 'dark' | 'light';
export type Language = 'en' | 'ru' | 'uz';
