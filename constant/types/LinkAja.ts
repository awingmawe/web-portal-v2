export enum LinkAjaTiering {
  Tier1 = 5000, // 0-5.000,000 : Admin fee 5.000
  Tier2 = 10000, // 5.000.001 - 10.000.000 : Admin Fee 10.000
  Tier3 = 15000, // 10.000.001 - 15.000.000 : Admin Fee 15.000
  Tier4 = 20000, // 15.000.001 - 20.000.000 : Admin Fee 20.000
  Tier5 = 25000, // 20.000.001 - 25.000.000 : Admin Fee 25.000
  Tier6 = 30000, // >25.000.000 : Admin Fee 30.000
}

export const getLinkAjaTiering = (amount: number): LinkAjaTiering => {
  if (amount >= 0 && amount <= 5000000) return LinkAjaTiering.Tier1
  if (amount >= 5000001 && amount <= 10000000) return LinkAjaTiering.Tier2
  if (amount >= 10000001 && amount <= 15000000) return LinkAjaTiering.Tier3
  if (amount >= 15000001 && amount <= 20000000) return LinkAjaTiering.Tier4
  if (amount >= 20000001 && amount <= 25000000) return LinkAjaTiering.Tier5
  return LinkAjaTiering.Tier6
}
