import { gql } from '@apollo/client/core';

export const GET_DATA = gql`
  query {
    dtos {
      jobOpening {
        name {
          property
          value
        }
        description {
          property
          value
        }
        content {
          property
          value
        }
        roles {
          property
          value {
            property
            value {
              name {
                property
                value
              }
              description {
                property
                value
              }
            }
          }
        }
        skills {
          property
          value {
            property
            value {
              name {
                property
                value
              }
              description {
                property
                value
              }
            }
          }
        }
        employmentTypes {
          property
          value {
            property
            value {
              name {
                property
                value
              }
              description {
                property
                value
              }
            }
          }
        }
        salaryMax {
          property
          value
          currency
        }
        salaryMin {
          property
          value
          currency
        }
        publishDate {
          property
          value
        }
        location {
          property
          value {
            region {
              property
              value {
                name {
                  property
                  value
                }
              }
            }
            city {
              property
              value {
                name {
                  property
                  value
                }
              }
            }
          }
        }
        webURL {
          property
          value
        }
        project {
          property
          value {
            name {
              property
              value
            }
            description {
              property
              value
            }
            website {
              property
              value
            }
            x {
              property
              value
            }
            avatar {
              property
              value
            }
            cover {
              property
              value
            }
          }
        }
      }
    }
  }
`;
