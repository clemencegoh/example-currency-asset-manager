export function genAssetUid(
  userid: string,
  assetName: string,
  assetCode: string,
): string {
  return `${userid.toLowerCase()}_${assetName.toLowerCase()}_${assetCode.toLowerCase()}`;
}
