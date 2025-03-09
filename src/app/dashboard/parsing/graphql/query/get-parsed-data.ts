import { gql } from 'apollo-angular';

export const GET_PARSED_DATA = gql`
  query {
    parsedData {
      id
      siteName
      isSendToDb
      parsedXPaths
      parsedData
    }
  }
`;
