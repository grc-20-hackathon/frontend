export interface IGetEntityData {
  entity: IEntity;
}

export interface IEntity {
  id: string;
  currentVersion: ICurrentVersion;
}

export interface ICurrentVersion {
  version: IVersion;
}

export interface IVersion {
  entityId?: string;
  name?: string;
  relationsByFromVersionId?: IRelationsByFromVersionId;
  triples?: {
    nodes: INodes[];
  };
}

export interface IRelationsByFromVersionId {
  nodes: INodes[];
}

export interface INodes {
  typeOf?: ITypeOf;
  toEntity?: IToEntity;
  attributeVersion?: IAttributeVersion;
  textValue?: string;
}

export interface ITypeOf {
  currentVersion: ICurrentVersion;
}

export interface IToEntity {
  currentVersion: ICurrentVersion;
}

export interface IAttributeVersion {
  entityId: string;
  name?: string;
}
