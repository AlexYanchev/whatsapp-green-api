export interface I_IncomingTextMessage {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  idMessage: string;
  senderData: {
    chatId: string;
    sender: string;
    senderName: string;
    senderContactName: string;
  };
  messageData: {
    typeMessage: string;
    textMessageData: {
      textMessage: string;
    };
  };
}
