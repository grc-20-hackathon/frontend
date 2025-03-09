import { gql } from '@apollo/client/core';

export const GET_CONFIGURATION = gql`
  query {
    configuration {
      settingsAi {
        id
        aiModelId
        aiTypeId
        apiKey
        maxTokens
        temperature
        promptForXPath
        promptForXPathData
        aiModels {
          id
          name
        }
        aiTypes {
          id
          name
        }
      }
      settingsSite {
        id
        siteId
        isGenerateAutomatically
        titleUrlXPath {
          jobTitleXPath
          jobDescriptionXPath
          requiredSkillsXPath
          workFormatXPath
          locationXPath
          salaryXPath
          publicationDateXPath
        }
        sites {
          id
          name
        }
      }
    }
  }
`;
