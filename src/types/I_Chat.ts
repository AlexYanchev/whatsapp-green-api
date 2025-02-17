export interface I_Chat {
  chatId: number;
  clientNumber: string;
  clientName: string;
  lastMessage: { lastTimeMessage: string | null; text: string };
}
