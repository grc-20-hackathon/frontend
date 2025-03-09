import { gql } from '@apollo/client/core';

export const GET_ENTITY_BY_ID = gql`
  query GetEntityById(
    $spaceId: String!
    $entityId: String!
    $coverTypeId: String!
    $avatarTypeId: String!
    $webUrlTypeId: String!
    $websiteTypeId: String!
  ) {
    entity(id: $entityId) {
      id
      currentVersion {
        version {
          relationsByFromVersionId(
            filter: {
              spaceId: { equalTo: $spaceId }
              typeOf: {
                currentVersion: {
                  version: { entityId: { in: [$coverTypeId, $avatarTypeId] } }
                }
              }
            }
          ) {
            nodes {
              typeOf {
                currentVersion {
                  version {
                    entityId
                    name
                  }
                }
              }
              toEntity {
                currentVersion {
                  version {
                    entityId
                  }
                }
              }
            }
          }
          triples(
            filter: {
              spaceId: { equalTo: $spaceId }
              attributeVersion: {
                entityId: { in: [$webUrlTypeId, $websiteTypeId] }
              }
            }
          ) {
            nodes {
              attributeVersion {
                entityId
                name
              }
              textValue
            }
          }
        }
      }
    }
  }
`;

const a = `
 query GetEntityById(
    $spaceId: String!
    $entityId: String!
    $coverTypeId: String!
    $avatarTypeId: String!
    $webUrlTypeId: String!
    $websiteTypeId: String!
  ) {
    entities(filter: { id: { equalTo: $entityId } }) {
      id
      currentVersion {
        version {
          description
          relationsByFromVersionId(
            filter: {
              spaceId: { equalTo: $spaceId }
              typeOf: {
                currentVersion: {
                  version: { entityId: { in: [$coverTypeId, $avatarTypeId] } }
                }
              }
            }
          ) {
            nodes {
              typeOf {
                currentVersion {
                  version {
                    entityId
                    name
                  }
                }
              }
              toEntity {
                currentVersion {
                  version {
                    entityId
                  }
                }
              }
            }
          }
          triples(
            filter: {
              spaceId: { equalTo: $spaceId }
              attributeVersion: {
                entityId: { in: [$webUrlTypeId, $websiteTypeId] }
              }
            }
          ) {
            nodes {
              attributeVersion {
                entityId
                name
              }
              textValue
            }
          }
        }
      }
    }
  }`;
