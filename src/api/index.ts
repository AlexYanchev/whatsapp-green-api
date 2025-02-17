import { I_IncomingTextMessage } from '../types/I_IncomingTextMessage';

const SITE = process.env.REACT_APP_URL;

interface I_InstanceData {
  idInstance: string;
  apiTokenInstance: string;
}

type T_SendMessageParams = I_InstanceData & {
  clientNumber: string;
  message: string;
};

type T_GetMessageParams = I_InstanceData & {
  signal: AbortSignal;
};

type T_DeleteNotificationParams = I_InstanceData & {
  receiptId: number;
};

export const sendMessage = async ({
  idInstance,
  apiTokenInstance,
  clientNumber,
  message,
}: T_SendMessageParams) => {
  return fetch(
    `${SITE}/waInstance${idInstance}/SendMessage/${apiTokenInstance}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatId: `${clientNumber}@c.us`,
        message,
      }),
    }
  );
};

export const getMessage = async ({
  idInstance,
  apiTokenInstance,
  signal,
}: T_GetMessageParams): Promise<{
  receiptId: number;
  body: I_IncomingTextMessage;
}> => {
  return fetch(
    `${SITE}/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
    { signal }
  ).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
};

export const deleteNotification = async ({
  idInstance,
  apiTokenInstance,
  receiptId,
}: T_DeleteNotificationParams): Promise<{
  result: boolean;
}> => {
  return fetch(
    `${SITE}/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
    { method: 'DELETE' }
  ).then((res) => {
    if (!res.ok) {
      throw res;
    }
    return res.json();
  });
};
