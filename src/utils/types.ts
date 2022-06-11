// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RecordType extends Record<string, ObjectType> {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ArrayType extends Array<ObjectType> {}

export type ObjectType = string | number | boolean | RecordType | ArrayType;
