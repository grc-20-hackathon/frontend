import { gql } from '@apollo/client/core';

export const SEND_TO_DB = gql`
  mutation SendToDb($id: Int!) {
    sendToDb(id: $id) {
      id
      siteName
      isSendToDb
      parsedXPaths
      parsedData
    }
  }
`;
