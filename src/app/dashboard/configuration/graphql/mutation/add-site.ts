import { gql } from '@apollo/client/core';

export const ADD_SITE = gql`
  mutation AddSite($url: String!) {
    addSite(url: $url) {
      settingsAi {
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
