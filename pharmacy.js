const MIN_BENEFIT = 0;
const MAX_BENEFIT = 50;

const DRUG_NAMES = {
  HERBAL_TEA: 'Herbal Tea',
  FERVEX: 'Fervex',
  DAFALGAN: 'Dafalgan',
  MAGIC_PILL: 'Magic Pill'
};

export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }

  updateNormalDrugBenefit() {
    this.benefit = this.expiresIn < 0 ? Math.max(this.benefit - 2, MIN_BENEFIT) : Math.max(this.benefit - 1, MIN_BENEFIT);
  }

  updateHerbalTeaBenefit() {
    this.benefit = this.expiresIn < 0 ? Math.min(this.benefit + 2, MAX_BENEFIT) : Math.min(this.benefit + 1, MAX_BENEFIT);
  }

  updateFervexBenefit() {
    switch (true) {
      case (this.expiresIn < 0):
        this.benefit = MIN_BENEFIT;
        break;
      case (this.expiresIn < 5):
        this.benefit = Math.min(this.benefit + 3, MAX_BENEFIT);
        break;
      case (this.expiresIn < 10):
        this.benefit = Math.min(this.benefit + 2, MAX_BENEFIT);
        break;
      default:
        this.benefit = Math.min(this.benefit + 1, MAX_BENEFIT);
    }
  }

  updateDafalganBenefit() {
    this.benefit = this.expiresIn < 0 ? Math.max(this.benefit - 4, MIN_BENEFIT) : Math.max(this.benefit - 2, MIN_BENEFIT);
  }

  checkMagicPillBenefit() {
    this.benefit = this.benefit < MIN_BENEFIT ? MIN_BENEFIT : Math.min(this.benefit, MAX_BENEFIT);
  }
}

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (let i = 0; i < this.drugs.length; i++) {
      const drug = this.drugs[i];

      if (drug.name !== DRUG_NAMES.MAGIC_PILL) {
        drug.expiresIn -= 1;
        switch (this.drugs[i].name) {
          case "Herbal Tea":
            drug.updateHerbalTeaBenefit(this.drugs[i]);
            break;
          case "Fervex":
            drug.updateFervexBenefit(this.drugs[i]);
            break;
          case "Dafalgan":
            drug.updateDafalganBenefit(this.drugs[i]);
            break;
          default:
            drug.updateNormalDrugBenefit(this.drugs[i]);
        }
      } else {
        drug.checkMagicPillBenefit();
      }
    }
    return this.drugs;
  }
}
