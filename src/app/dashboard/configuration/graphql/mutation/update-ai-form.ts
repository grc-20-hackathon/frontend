import { gql } from '@apollo/client/core';

export const UPDATE_AI_FORM = gql`
  mutation UpdateSettingsAi($form: IAiFormData!) {
    updateSettingsAi(form: $form) {
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
